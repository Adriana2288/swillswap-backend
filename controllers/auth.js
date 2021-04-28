const router = require("express").Router()
const User = require("../models/user")
const { schema, loginSchema } = require("./validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// Sign up

router.post("/signup", async (req, res) => {
    
    // Data validation 
    const { error } = schema.validate(req.body)
    
    if (error) {
        return res.status(400).send(error.details[0].message)
    } 

    // Confirm new user is not already registered 
    const emailDuplicate = await User.findOne({email: req.body.email})
    if (emailDuplicate) {
        return res.status(400).send("Email already exists")
    }

    // Hashing passwords
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(req.body.password, salt)
    //  const hashedSecondPass = await bcrypt.hash(req.body.repeat_password, salt)
    // TODO - delete this crap
    

    // New user registration
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      age: req.body.age,
      email: req.body.email,
      password: hashedPassword,
      repeat_password: hashedSecondPass
   })

   try {
      const newUser = await user.save()
      res.status(200).send({user: user._id})
   } 
   catch(err) {
       res.status(400).send(err)
   }
})

// Log in

router.post("/login", async (req, res) => {

    // Data Validation 
    const { error } = loginSchema.validate(req.body)
    
    if (error) {
        return res.status(400).send(error.details[0].message)
    } 

    // Confirm email address is already registered
    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).send("Incorrect email address")
    }

     // Verify password
   const correctPass = await bcrypt.compare(req.body.password, user.password)
   if (!correctPass) {
       return res.status(400).send("Incorrect password")
   } 

   // Assigning a token
   const token = jwt.sign({_id: user._id}, process.env.PRIVATE_TOKEN)
   res.header("token-auth", token).status(200).send(token)
})



module.exports = router