const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const app = express();

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "config.env" })
}

app.use(express.json());
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log("Connected to the Database"));

const user = require("./routes/user");
app.use(user);

const todo = require("./routes/todo");
app.use(todo);

app.listen(process.env.PORT || 8000, () => { console.log("Server Runnig on port 8000") })