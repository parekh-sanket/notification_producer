const express = require('express')
const router = express.Router()
const anlyticsController = require('../controller/anlytics.controller')

router.get(
    '/anlytics',
    anlyticsController.getAnlytics
)

module.exports = router