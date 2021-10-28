const mongoose = require("mongoose")
const uri = process.env.uri

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log("Connected to DB"))
.catch(err => console.log(err))
