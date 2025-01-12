const { Kafka } = require('kafkajs')
const config = require('config')
let producer;

async function connectKafka(){
    const kafka = new Kafka({
        brokers: config.get("kafka.brokers") 
    })
    producer = kafka.producer()
    await producer.connect()
}

async function kafkaProducer({
    topic,
    messages
}){
    await producer.send({
        topic: topic,
        messages: messages
    })

    console.log(`>>> kafka message produced on topic ${topic} payload` , messages)
}

module.exports = {
    connectKafka,
    kafkaProducer
}