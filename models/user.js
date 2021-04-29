const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, },
  age: { type: Number, min: 18 },
  email: { type: String, required: true, },
  password: { type: String, required: true, max: 1000, min: 6 }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
