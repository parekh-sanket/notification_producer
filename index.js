const express = require('express')
const app = express()
const config = require('config')
const mongoConnection = require('./db/index')
const kafkaConnection = require('./kafka/index')
const routes = require('./routes/index')

app.use(express.json())

async function init(){
    try{  
        // connect mongodb and kafka
        await Promise.all([mongoConnection.connectDb() , kafkaConnection.connectKafka()])

        // add api routes
        app.use(routes)

        // start server
        app.listen(config.get("server.port"), ()=>{
            console.log(`Server started on  : https://localhost:${config.get("server.port")}/`)
        })

    }catch(err){
        console.log("Error in init function " , err)
        process.exit(0)
    }
}

init().then().catch()
