const Joi = require('joi')

const payloadSchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().required().max(500),
  scheduleTime: Joi.date(), // for scheduling
  channel: Joi.string().valid('email', 'sms', 'push').required(),
  email : Joi.string().email(),
  mobile : Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
  devicePushToken : Joi.string()
}).custom((value,helper)=>{
  if(value.channel == "email" && !value.email){
    return helper.message("email is mendatory")
  }
  
  if(value.channel == "sms" && !value.mobile){
    return helper.message("mobile is mendatory")
  }
  
  if(value.channel == "push" && !value.devicePushToken){
    return helper.message("devicePushToken is mendatory")
  }

  if(value.mobile) value.mobile = `+91${value.mobile}` // for indian number
  
  return value
});

const getNotificationById = Joi.object({
  notificationId : Joi.string().required()
})

const getNotifications = Joi.object({
  status : Joi.string().valid("pending", "processing", "delivered", "failed"),
  channel : Joi.string().valid('email', 'sms', 'push'),
  startDate : Joi.string(),
  endDate : Joi.string(),
  page : Joi.string(),
  limit : Joi.string()
}).custom((value,helper)=>{
  if(value.startDate && value.endDate ){
    if(new Date(value.startDate) <= new Date(value.endDate)){
      value.startDate = new Date(value.startDate)
      value.endDate = new Date(value.endDate)
    }else{
      return helper.message("invalid startDate and endDate")
    }
  }else{
    value.startDate = undefined
    value.endDate = undefined
  }
  
  if((value.page && !Number(value.page)) || (value.limit && !Number(value.limit))){
    return helper.message("invalid page and limit")
  }

  value.page = Number(value.page) ?? 1 
  value.limit = Number(value.limit) ?? 10
  
  return value
})

module.exports = {
    payloadSchema,
    getNotificationById,
    getNotifications
}