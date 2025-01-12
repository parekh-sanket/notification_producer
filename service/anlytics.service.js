const { Notification } = require('../db/model/notification.model')

async function getAnlytics(req,res){
    try{

        // get total delivered sms
        let totalSent = await getNotificationDocumentCounts({ status : "delivered" }) ?? 0

        // get total failed sms
        let totalFailed = await getNotificationDocumentCounts({ status : "failed" }) ?? 0
        
        // get total reschedule sms
        let totalReschedule = await getNotificationDocumentCounts({ status : "reschedule" }) ?? 0

        return {
            totalSent,
            totalFailed,
            totalReschedule,
            totalDiscarded
        }
    }catch(err){
        console.log("Error in service -> getAnlytics >>> error in catch " , err)
        return res.status(500).json({ message : err.message })
    }
}

function getNotificationDocumentCounts({ status  }){
    return Notification.countDocuments({
        status : status
    }) 
}

module.exports = {
    getAnlytics
}