const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {isValidEmail,isValidPassword} = require("../validator/validator");
const bcrypt = require("bcrypt")
const signUp = async (req, res) => {
try{
    let data = req.body;
    const { username, email, password,question, answer } = data;
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please send required data" });
    if (username==undefined) return res.status(400).send({ status: false, message: "Please provide userName" })
    if (!username) return res.status(400).send({ status: false, message: "please enter UserName" });

    if (email==undefined) return res.status(400).send({ status: false, message: "Please provide email" })
    if (!email) return res.status(400).send({ status: false, message: "Please provide email" })
    if (isValidEmail(email.trim()) == false) return res.status(400).send({ status: false, message: "Please provide valid email" })

    if (password ==undefined) return res.status(400).send({ status: false, message: "please enter password" })
    if (!password ) return res.status(400).send({ status: false, message: "please enter password" })
    if (!isValidPassword(password.trim())) return res.status(400).send({ status: false, message: "Please provide valid password" })

    let hashing = bcrypt.hashSync(password, 10);
    data.password = hashing;

    if (question==undefined) return res.status(400).send({ status: false, message: "Please write question" })
    if (!question) return res.status(400).send({ status: false, message: "Please write question" })

    if (answer==undefined) return res.status(400).send({ status: false, message: "Please write answer" })
    if (!answer) return res.status(400).send({ status: false, message: "Please write answer" })

    let userDetails = await userModel.create(data);

    return res.status(201).send({ status: true, message: "User created successfully", data: userDetails });
    }
    catch (error) { 
        res.status(500).send({ status: false, error: error.message }) }
}

const userLogin = async (req, res) => {
    try {
        let userData = req.body;
        console.log(userData)
       if (Object.keys(userData).length == 0) return res.status(400).send({ status: false, message: "please enter some data..." })
        let { email, password } = userData;
       if (email==undefined) return res.status(400).send({ status: false, message: "Please provide email" })
        if (!email ) return res.status(400).send({ status: false, message: "Please provide email" })
       if (isValidEmail(email.trim()) == false) return res.status(400).send({ status: false, message: "Please provide valid email" })

        if (password ==undefined) return res.status(400).send({ status: false, message: "please enter password" })
        if (!password ) return res.status(400).send({ status: false, message: "please enter password" })
      if (!isValidPassword(password.trim())) return res.status(400).send({ status: false, message: "Please provide valid password" })
      let isUserExist = await userModel.findOne({ email: userData.email})
        if(!isUserExist) return res.status(404).send({ status: false, message: "user not found"});
        let passwordCompare = await bcrypt.compare(password, isUserExist.password);
        if (!passwordCompare) return res.status(400).send({ status: false, message: "Please enter valid password" })
        if (!isUserExist) return res.status(401).send({ status: false, message: "user Not found" });


        let token = jwt.sign({ userId: isUserExist._id, exp: (Math.floor(Date.now() / 1000)) + 84600 }, "project");
        console.log("date", Date.now())
        const date = new Date();
       console.log(`Token Generated at:- ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);

        res.setHeader("x-api-key", token);
      return  res.status(200).send({ status: true, message: 'Success', data: token })

    }
    catch (error) { 
        res.status(500).send({ status: false, error: error.message }) }
}


const forgetPassword = async (req,res)=>{
    let userId= req.params.userId;
    console.log("userId",userId);
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false, message:"enter Valid UserId"});
    let userData = req.body;
    let {email,question,answer} = userData;
    if(Object.keys(userData).length ==0) return res.status(400).send({status:false, message:"provide valid Information"});
    
    if (email==undefined) return res.status(400).send({ status: false, message: "Please provide email" })
    if (!email) return res.status(400).send({ status: false, message: "Please provide email" })
    if (isValidEmail(email.trim()) == false) return res.status(400).send({ status: false, message: "Please provide valid email" })
    
    if (question==undefined) return res.status(400).send({ status: false, message: "Please write question" })
    if (!question) return res.status(400).send({ status: false, message: "Please write question" })
    
    if (answer==undefined) return res.status(400).send({ status: false, message: "Please write answer" })
    if (!answer) return res.status(400).send({ status: false, message: "Please write answer" })
    
    let user = await userModel.findById(userId);
    if(!user) return res.status(404).send({status:false, message:"No match found"});
    
    if(user.answer != answer) return res.status(400).send({status:false, message:"Invalid answer"});
    return res.status(200).send({status:false, message:"you can Reset Password"});
}

const resetPassword = async (req,res)=>{
    let userId = req.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false, message:"enter Valid UserId"});
    let userData = req.body;
    let {newPassword , confirmPassword} = userData;
    if(Object.keys(userData).length ==0) return res.status(400).send({status:false, message:"provide New Password"});
    
    if (newPassword==undefined) return res.status(400).send({ status: false, message: "Please provide New Password" })
    if (!newPassword) return res.status(400).send({ status: false, message: "Please provide New Password" })
    
    if (confirmPassword==undefined) return res.status(400).send({ status: false, message: "Please provide Confirm Password" })
    if (!confirmPassword) return res.status(400).send({ status: false, message: "Please provide Confirm Password" })

    if(newPassword != confirmPassword) return res.status(400).send({status: false, message:"Both passwords must match"});

    let hashing = bcrypt.hashSync(newPassword, 10);
    userData.newPassword = hashing;
    
    await userModel.findByIdAndUpdate({_id:userId}, {$set:{password:userData.newPassword}},{new:true});
    return res.status(200).send({status: true , message: "password changed successfully"});
}

const getUser = async (req, res)=>{
    try{
        let data = req.params.person;
        if(!mongoose.Types.ObjectId.isValid(data)) return res.status(400).send({status:false, message:"enter Valid UserId"});
        if(!data) return res.status(400).send({status:false, message:"provide valid Information"});
        let gotPerson = await userModel.findById(data);
        console.log(gotPerson)
        if(!gotPerson) return res.status(404).send({status:false, message:"No match found"});
        return res.status(200).send({status:true, message:"Match Found", data:gotPerson})
    }
    catch(err){ res.status(500).send({status:false, message:err.message})};
}

const deleteUser  = async (req, res) =>{
    let userId = req.params.userId;
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:false, message:"enter Valid UserId"});
    let user = await userModel.findById(userId);
    if(!user) return res.status(404).send({status:false, message:"No match found"});
    console.log(user)
    if(user.isDeleted == true) return res.status(400).send({status:false, message:"user is already deleted"});
    let gotUser = await userModel.findOneAndUpdate({_id : userId}, {$set:{isDeleted:true}}, {new:true});
    console.log(gotUser)
    return res.status(200).send({status:false, message:"User deleted successfully", data:gotUser});
}


module.exports = { signUp , userLogin,forgetPassword,resetPassword, getUser,deleteUser}