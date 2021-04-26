const jwt = require("jsonwebtoken")

//Middleware function

const verifyTokens = (req, res, next) => {
   const token = req.header("token-auth")
   if (!token) {
       return res.status(401).send("Access denied!")
   }

   try {
       const authorized = jwt.verify(token, process.env.PRIVATE_TOKEN)
       req.user = authorized
   }

   catch (error) {
       res.status(400).send("Incorrect token")
   }
}