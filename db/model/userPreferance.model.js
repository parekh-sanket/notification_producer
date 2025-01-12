const mongoose = require("mongoose")
const Schema = mongoose.Schema
const model = mongoose.model

const userPreferanceSchema = new Schema(
    {
        userId: {
            type: Number,
        },
        channel: {
            type: String,
            default: "sms",
            enum: ["email", "sms", "push"],
        }
    },
    {
        timestamps: true,
    },
)

const UserPreferance = model("userpreferance", userPreferanceSchema)

module.exports = {
    UserPreferance,
}