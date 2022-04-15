const StreamModel = require('../models/stream.model')
const UserModel = require('../models/user.model')
const GenreModel = require('../models/genre.model')

const wrtc = require('wrtc')

let senderStream

async function getAllStreams(req, res) {
  try {
    const streams = await StreamModel.find({}, { currentViewers: 0, quality: 0 }).populate('streamer', 'email')

    res.status(200).json(streams)
  } catch (error) {
    res.status(500).send(`Couldn't get all streams: ${error}`)
  }
}

async function getLiveStreams(req, res) {
  try {
    if(Object.keys(req.query)[0] === 'genre') {
      const genre = await GenreModel.findById(req.query.genre).populate('genre')

      const query = { live: true, genre: genre }
      const streams = await searchStreams(query)

      if(!streams.length) return resultMessage(query, res)

      res.status(200).json(streams)
    } else {
      const query = { live: true }
      const streams = await searchStreams(query)

      if(!streams.length) return resultMessage(query, res)
      res.status(200).json(streams)
    }
  } catch (error) {
    res.status(500).send(`Couldn't get live streams: ${error}`)
  }
}

async function searchStreams(query) {
  return await StreamModel.find(query, { quality: 0 })
    .populate('streamer')
    .populate('genre')
}

async function resultMessage(query, res) {
  if(query.hasOwnProperty('genre')) return res.status(200).send(`No live streams available for ${query.genre.name} genre :(`)
  res.status(200).send('No live streams available :(')
}

async function joinStream(req, res) {
  try {
    const user = res.locals.user
    const stream = await StreamModel.findById(req.params.id)
    .populate('streamer')
    .populate('genre')
    if(!stream.live) return res.status(404).send('This stream has ended')

    addCurrentViewer(stream, user)
    await increaseTotalViews(stream, user)

    await stream.save()

    res.status(200).json({ stream: stream })
  } catch (error) {
    res.status(500).send(`Couldn't join stream: ${error}`)
  }
}

function addCurrentViewer(stream, user) {
  if(stream.currentViewers.indexOf(user.id) === -1) {
    stream.currentViewers.push(user.id)
  }
}

async function increaseTotalViews(stream, user) {
  if(stream.totalViews.indexOf(user.id) === -1) {
    stream.totalViews.push(user.id)
    user.myActivity.push(stream.id)
    await user.save()
  }
}

async function receiveStream (req, res) {
  try {
    const peer = new wrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun.stunprotocol.org'
        }
      ]
    })

    const description = new wrtc.RTCSessionDescription(req.body.sdp)
    await peer.setRemoteDescription(description)

    senderStream.getTracks().forEach(track => {
      peer.addTrack(track, senderStream)
    })

    const answer = await peer.createAnswer()
    await peer.setLocalDescription(answer)

    const payload = {
      sdp: peer.setLocalDescription
    }
    
    res.status(200).json(payload)

  } catch (error) {
    res.status(500).send(`Error fetching stream: ${error}`)
  }
}

async function createStream(req, res) {
  try {
    const streamer = res.locals.user
    if (streamer.live) return res.status(200).send(`Already streaming. Please stop current stream before starting a new one`)
    console.log(req.body)
    const stream = await StreamModel.create(req.body)

    await assignStreamer(stream, streamer)
    await addLiveStreamToGenre(stream)

    res.status(200).json({ message: 'Stream started!', id: stream.id })
  } catch (error) {
    res.status(500).send(`Couldn't start stream: ${error}`)
  }
}

  async function assignStreamer(stream, streamer) {
    stream.streamer = streamer.id
    streamer.myStreams.push(stream.id)
    streamer.live = true

    await stream.save()
    await streamer.save()
  }

  async function addLiveStreamToGenre(stream) {
    const genre = await GenreModel.findById(stream.genre)
    genre.streams.push(stream.id)
    
    await genre.save()
  }

  async function broadcast (req, res) {
    try {
      const peer = new wrtc.RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun.stunprotocol.org'
          }
        ]
      })
  
      peer.ontrack = (e) => handleTrackEvent(e, peer)
      const description = new wrtc.RTCSessionDescription(req.body.sdp)
      await peer.setRemoteDescription(description)
  
      const answer = await peer.createAnswer()
      await peer.setLocalDescription(answer)
  
      const payload = {
        sdp: peer.setLocalDescription
      }
      
      res.status(200).json(payload)
    } catch (error) {
      res.status(500).send(`Error broadcasting: ${error}`)
    }
  }

  function handleTrackEvent(e, peer) {
    senderStream = e.streams[0]
  }

async function updateStream(req, res) {
  try {
    const streamer = res.locals.user
    const stream = await StreamModel.findOneAndUpdate({ streamer: streamer.id, live: true }, req.body, { new: true } )
    
    if(!stream) return res.status(404).send('No active stream available')

    res.status(200).json({ message: 'Stream updated', stream })
  } catch (error) {
    res.status(500).send(`Couldn't update stream: ${error}`)
  }
}

async function stopStream(req, res) {
  try {
    const streamer = res.locals.user
    const stream = await StreamModel.findOneAndUpdate({ streamer: streamer.id, live: true }, { live: false })

    if(!stream) return res.status(200).send(`You don't have any active streams`)

    await removeLiveStreamFromGenre(stream)
    await streamerNotLive(streamer)
    
    res.status(200).send('Stream stopped')
  } catch (error) {
    res.status(500).send(`Couldn't stop stream: ${error}`)
  }
}

async function removeLiveStreamFromGenre(stream) {
  const genre = await GenreModel.findById(stream.genre)
  const index = genre.streams.indexOf(stream.id)

  genre.streams.splice(index,1)
  await genre.save()
}

async function streamerNotLive(streamer) {
  streamer.live = false
  await streamer.save()
}

async function removeStream(req, res) {
  try {
    const stream = await StreamModel.findByIdAndDelete(req.params.id)
    
    await removeStreamFromStreamer(stream)
    await removeStreamFromViewersActivity(stream)
    
    res.status(200).send('Stream removed')
  } catch (error) {
    res.status(500).send(`Couldn't remove stream: ${error}`)
  }
}

async function removeStreamFromStreamer(stream) {
  const streamer = await UserModel.findById(stream.streamer)
  streamer.myStreams.remove(stream.id)

  await checkIfLive(stream, streamer)

  await streamer.save()
}

async function checkIfLive(stream, streamer) {
  if(stream.live) {
    streamer.live = false
    await removeLiveStreamFromGenre(stream)
  }
}

async function removeStreamFromViewersActivity(stream) {
  const viewers = await UserModel.find({ myActivity: stream.id })
  viewers.forEach(async viewer => {
    viewer.myActivity = viewer.myActivity.filter(activity => {
      return activity.toString() !== stream.id
    })
    await viewer.save()
    })
}

module.exports = {
  getAllStreams,
  getLiveStreams,
  joinStream,
  createStream,
  broadcast,
  receiveStream,
  updateStream,
  stopStream,
  removeStream
}