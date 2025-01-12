const express = require('express')
const router = express.Router()
const sendNotificationController = require('../controller/notification.controller')

router.post(
    '/notify',
    sendNotificationController.sendNotification
)

router.get(
    '/notification-by-id',
    sendNotificationController.getNotificationById
)

module.exports = router