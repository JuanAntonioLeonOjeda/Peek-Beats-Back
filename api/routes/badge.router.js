const router = require('express').Router()
const {
  authUser,
  authAdmin
} = require ('../utils')

const { 
  createOneBadge,
  getAllBadges,
  getOneBadge,
  updateOneBadge,
  removeOneBadge
} = require ('../controllers/badge.controller')

router
  .post('/', authUser, authAdmin, createOneBadge)
  .get('/', authUser, getAllBadges)
  .get('/:id', getOneBadge)
  .put('/:id', updateOneBadge)
  .delete('/:id', removeOneBadge)

module.exports = router