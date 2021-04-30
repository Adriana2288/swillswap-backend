const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema ({
  country: { type: String, required: true },
  bio: { type: String, required: true },
  skills: {type:[String], required: true } ,
  interests: {type:[String], required: true }  
})


const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;