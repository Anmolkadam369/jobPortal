
const express  = require('express')
const router = express.Router();
const {signUp,userLogin, getUser, forgetPassword,resetPassword, deleteUser} = require("../controller/userController")
const {createLink, getAllLinks,getwantedPersonLinks,updateLinkInfo,deleteLink} = require("../controller/linkController");
const {authentication, authorization} = require("../middleware/auth");

router.post('/signUp', signUp);
router.post("/login", userLogin);
router.get("/getPerson/:person", authentication, getUser);
router.post ("/forgetPass/:userId",authentication,authorization, forgetPassword);
router.put("/resetPass/:userId",authentication,authorization,resetPassword);
router.delete("/deleteUser/:userId",authentication,authorization, deleteUser);

router.post("/linkcreate/:userId",authentication,authorization, createLink);
router.get("/allLinks/:userId",authentication, getAllLinks);
router.get("/getLink/:userId",authentication, getwantedPersonLinks);
router.put("/changeLinks/:userId", updateLinkInfo);
router.delete("/deleteLink/:userId", deleteLink);

router.all('/*', function (req, res) {
    res.status(400).send({ msg: "invalid Url request" })
})

module.exports = router;
