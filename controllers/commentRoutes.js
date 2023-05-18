const router = require('express').Router();
const { Event, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// all req from frontend to comments go here


module.exports = router;