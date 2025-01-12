const kafka = require('../kafka/index')
const config = require('config')
const {Notification} = require('../db/model/notification.model')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

function sendNotification(notificationPayload){
    try{
        // for produce kafka message
        kafka.kafkaProducer({
            topic : config.get("kafka.sendNotificationsTopic"),
            messages : [
                {
                    value: JSON.stringify(notificationPayload),
                },
            ]
        })
    }catch(err){
        console.log("Error in controller -> sendNotification function >>> " , err)
        throw err
    }
}

async function getNotificationById({
    notificationId
}){
    try{  
        let notification = await Notification.findOne({
            _id : new ObjectId(notificationId)
        })
        if(!notification){
            throw new Error("NotificationNotFound")
        }

        return notification.toJSON()
    }catch(err){
        console.log("Error in controller -> getNotificationById function >>> " , err)
        throw err
    }
}

async function getNotifications({
    status,
    channel,
    startDate,
    endDate,
    page,
    limit
}) {
    try{

        let query = {}

        if(status){
            query["status"] = status
        }
        if(channel){
            query["channel"] = channel
        }
        if(startDate && startDate){
            query["createdAt"] = {
                $gte : startDate,
                $lte : endDate
            }
        }

        let notifications = await Notification.find(query).sort({ createdAt : -1 }).skip((page-1)*limit).limit(limit)

        if(!notifications){
            throw new Error("NotificationNotFound")
        }

        return notifications
    }catch(err){
        console.log("Error in controller -> getNotifications function >>> " , err)
        throw err
    }
}

module.exports = {
    sendNotification,
    getNotificationById,
    getNotifications
}