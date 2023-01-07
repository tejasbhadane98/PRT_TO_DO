const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    Activity:{type:String},
    Status:{type:String, enum:['Pending', 'Completed', 'Ongoing']},
    // Time_Taken:{type:String},
    // Action:{type:String, enum:['Start', 'End', 'Pause']}
})

const ToDo = mongoose.model("data", ToDoSchema);

module.exports = ToDo;

