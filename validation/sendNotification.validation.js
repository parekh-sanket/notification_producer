const Joi = require('joi')

const payloadSchema = Joi.object({
  userId: Joi.number().required(),
  message: Joi.string().required().max(500),
  scheduleTime: Joi.date(), // for scheduling
  channel: Joi.string().valid('email', 'sms', 'push').required(),
});

const getNotificationById = Joi.object({
  notificationId : Joi.string().required()
})

const getNotifications = Joi.object({
  status : Joi.string().valid("pending", "processing","reschedule", "delivered", "failed"),
  channel : Joi.string().valid('email', 'sms', 'push'),
  startDate : Joi.string(),
  endDate : Joi.string(),
  page : Joi.string(),
  limit : Joi.string()
}).custom((value,helper)=>{
  if(value.startDate && value.endDate ){
    if(new Date(value.startDate) <= new Date(value.endDate())){
      value.startDate = new Date(value.startDate)
      value.endDate = new Date(value.endDate)
    }else{
      return helper.message("invalid startDate and endDate")
    }
  }else{
    value.startDate = undefined
    value.endDate = undefined
  }

  value.page = Number(value.page) ?? 1 
  value.limit = Number(value.limit) ?? 10

  if(!value.page || !value.limit){
    return helper.message("invalid page and limit")
  }
  
  return value
})

module.exports = {
    payloadSchema,
    getNotificationById,
    getNotifications
}