const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require("../models/user.model")

async function signup(req, res) {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hash
    const user = await UserModel.create(req.body)
    const payload = { email: user.email }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({ email: user.email, token: token })
  } catch (error) {
    res.status(500).send(`Sign up error ${error}`)
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) return res.status(401).send('Email or password incorrect')
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) return res.status(500).send(`Found error ${err}`)
      if (!result) return res.status(401).send('Email or password incorrect')
      const payload = { email: user.email }
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
      res.status(200).json({ email: user.email, token: token})
    })
  } catch (error) {
    res.status(401).send(`Log in error ${error}`)
  }
}


module.exports = { signup, login }