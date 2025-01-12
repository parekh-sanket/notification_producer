const anlyticsService = require('../service/anlytics.service')

async function getAnlytics(req,res){
    try{
        let response = await anlyticsService.getAnlytics()

        return res.status(200).json({ message : response })
    }catch(err){
        console.log("Error in controller -> getAnlytics >>> error in catch " , err)
        return res.status(500).json({ message : err.message })
    }
}

module.exports = {
    getAnlytics
}