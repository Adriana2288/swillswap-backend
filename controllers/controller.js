const User = require("../models/user");
const router = require("express").Router();

// router.route("/new").post()
// router.route("/").get()
// router.route("/delete/:id").delete()
// router.route("/update/:id").put()

// router.route("/api/signup").post((req, res) => {
//   const newUser = new User(req.body);
//   newUser
//     .save()
//     .then((user) => res.json(user))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json({ message: `Error! ${err}` });
//     });
// });

router.route("/api/signup").post((req, res) => {
    console.log(req.body)
    const newUser = new User(req.body)
    newUser.save()
    .then(user => res.json(user))
    .catch(err => {console.log(err); res.status(400).json({message:`Error! ${err}`})})
        
})

router.route("/delete/:id").delete((req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((success) => res.json("Success! User deleted."))
    .catch((err) => res.status(400).json("Error! " + err));
});

router.route("/update/:id").put((req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json("Success! User updated."))
    .catch((err) => res.status(400).json("Error! " + err));
});

module.exports = router;
