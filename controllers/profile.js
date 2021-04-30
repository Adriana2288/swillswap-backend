const router = require("express").Router()
const Profile = require("../models/profiledata")
const path = require("path")
const util = require("util")
const fileUpload = require("express-fileupload")
const { profileSchema, loginSchema } = require("./validation")
const fs = require("fs")
const {nanoid} = require("nanoid")

// Saving profile pictures

router.use(fileUpload())



  // Saving profiles' data

  router.post("/registration", async (req, res) => {


    // New profile creation

    // Saving profile picture
   
  //   const fileName = nanoid()
  //   try {
  //     const file = req.body.profileImg
  //     fs.writeFileSync("./uploads/" + fileName, file)
  //   }

  //  catch (error) {
  //   console.log(error)
  //   res.status(500).json({
  //     message: error,
  //   });
  // }

    // Saving profiles' data

    const profile = new Profile({
        // profileImg: fileName,
        // userId: req.body.userId,
        country: req.body.country,
        bio: req.body.bio,
        skills: req.body.skills,
        interests: req.body.interests
    })

    try {
        const newProfile = await profile.save()
        res.status(200).send({profile: profile._id})
    } 

    catch (error) {
        res.status(400).send(error)
    }
  })

  // Calling profile data

  router.get("/userProfile/:userId", async (req, res) => {

  // Requesting user profile

    try {
      const profileData = await Profile.findOne({userId: req._id})
      res.status(200).send(profileData)
    }

    catch(err) {
      console.log(err)
         res.status(400).send({err})
     }


    
 
  })




module.exports = router