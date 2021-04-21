const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: { type: Number, min: 18 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
