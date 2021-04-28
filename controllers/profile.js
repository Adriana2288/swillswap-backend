const router = require("express").Router()
const Profile = require("../models/profiledata")
const path = require("path")
const util = require("util")
const fileUpload = require("express-fileupload")
const { profileSchema, loginSchema } = require("./validation")

// Saving profile pictures

router.use(fileUpload())

router.post("/upload", async (req, res) => {

    try {
      const file = req.files.file
      const fileName = file.name
      const size = file.data.length
      const extension = path.extname(fileName)
      const picsExtensions = /png|jpeg|jpg|gif/
  
      if (!picsExtensions.test(extension.toLowerCase())) {
        throw "Invalid extension"
      }

      if (size > 5000000) {
          throw "Exceded size. File must be less than 5MB"
      }

      // Encrypting files' names

      const md5 = file.md5
      const URL = `/uploads/${md5}${extension}`

      await util.promisify(file.mv)(`./${URL}`)

      res.json({
          message: "Photo uploaded"
      })

    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: error,
      });
    }
  });


  // Saving profiles' data

  router.post("/registration", async (req, res) => {


    // Data validation 

    const { error } = profileSchema.validate(req.body)
    console.log(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    } 

    // New profile creation

    const profile = new Profile({
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




module.exports = router