const { Schema, model } = require("mongoose")

const BlacklistSchema = new Schema({
  username: String,
  userId: { type: String, required: true },
  reason: String,
  reportedBy: String,
  reportedById: String
});

module.exports = model("Blacklist", BlacklistSchema)