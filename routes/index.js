const express = require('express')
const Router = express.Router()
const sendNotificationRoutes = require('./notification.route')
const anlyticsRoutes = require('./anlytics.route')

Router.use('/notification',sendNotificationRoutes)

Router.use('/anlytics',anlyticsRoutes)

module.exports = Router