const express = require('express');
const router = express.Router();
const {requiredSignIn} = require('../middleware/authMiddleware');
const {forgotPasswordController,signUpController,loginController,resetPasswordPost} = require('../controllers/authController');
const userModel = require('../models/userModel');



const JWT = require('jsonwebtoken');
router.post('/signup',signUpController);
router.post('/login',loginController);

router.post('/reset-password',resetPasswordPost);


router.post('/forgot-password',forgotPasswordController);
router.get("/user-auth", requiredSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  
  // router.post("/reset-password/:id/:token", async (req, res) => {
  //   const { id, token } = req.params;
  //   const { password } = req.body;
  
  //   const oldUser = await userModel.findOne({ _id: id });
  //   if (!oldUser) {
  //     return res.json({ status: "User Not Exists!!" });
  //   }
  //   const secret = process.env.JWT_SECRET + oldUser.password;
  //   try {
  //     const verify = jwt.verify(token, secret);
  //     const encryptedPassword = await bcrypt.hash(password, 10);
  //     await User.updateOne(
  //       {
  //         _id: id,
  //       },
  //       {
  //         $set: {
  //           password: encryptedPassword,
  //         },
  //       }
  //     );
  
  //     res.render("index", { email: verify.email, status: "verified" });
  //   } catch (error) {
  //     console.log(error);
  //     res.json({ status: "Something Went Wrong" });
  //   }
  // });


  const passport = require("passport");

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});


module.exports = router;