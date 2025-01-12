const sendNotificationService = require('../service/notification.service')
const sendNotificationValidation = require('../validation/sendNotification.validation')
const EXCEPTIONS = require('../config/exception.json')

async function sendNotification(req,res){
    try{
        // validate notification payload
        const { error, value } = sendNotificationValidation.payloadSchema.validate(req.body);
        if (error) {
            console.error('Validation errors:', error.details);
            return res.status(412).json({message : error})
        }

        // send notification kafka message
        sendNotificationService.sendNotification(value)

        return res.status(200).json({message : "notification added in queue."})

    }catch(err){
        console.log("Error in controller -> sendNotification function >>> " , err)
        return res.status(500).json({ "message" : err.message })
    }
} 

async function getNotifications(req,res) {
    try{
        // validate notification payload
        const { error, value } = sendNotificationValidation.getNotifications.validate(req.query);
        if (error) {
            console.error('Validation errors:', error.details);
            return res.status(412).json({message : error})
        }

        // send notification kafka message
        let response = sendNotificationService.getNotifications(value)

        return res.status(200).json({message : response})

    }catch(err){
        console.log("Error in controller -> sendNotification function >>> " , err)
        if(EXCEPTIONS[err.message]){
            let exception = EXCEPTIONS[err.message]
            return res.status(exception.status).json({ message : exception.message })
        }
        return res.status(500).json({ "message" : err.message })
    }
}

async function getNotificationById(req,res) {
    try{
        // validate notification payload
        const { error, value } = sendNotificationValidation.getNotificationById.validate(req.query);
        if (error) {
            console.error('Validation errors:', error.details);
            return res.status(412).json({message : error})
        }

        // send notification kafka message
        let response = sendNotificationService.getNotificationById(value)

        return res.status(200).json({message : response})

    }catch(err){
        console.log("Error in controller -> sendNotification function >>> " , err)
        if(EXCEPTIONS[err.message]){
            let exception = EXCEPTIONS[err.message]
            return res.status(exception.status).json({ message : exception.message })
        }
        return res.status(500).json({ "message" : err.message })
    }
}

module.exports = {
    sendNotification,
    getNotificationById
}