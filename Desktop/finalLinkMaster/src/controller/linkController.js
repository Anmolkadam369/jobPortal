const linkModel = require("../model/linkModel");
const userModel = require("../model/userModel");
const mongoose = require("mongoose")

const { isValidNumber, isvalidLinkedIn,isValidWhatappLink,isValidInstagram,isvalidfacebook,isvalidTwitter,isvalidTelegram } = require("../validator/validator")
const createLink = async (req, res) => {
    try {
        let userId = req.params.userId;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({status:"false", message:"invalid User ID"});
        let linkData = req.body;
        const { officeNumber, whatsapp, linkedIn, Instagram, facebook, twitter, snapChat, telegram } = linkData;
        if (Object.keys(linkData).length == 0) return res.status(400).send({ status: false, message: "please send required data" });

        if (!officeNumber) return res.status(400).send({ status: false, message: "Office number is required" });
        if (officeNumber == undefined) return res.status(400).send({ status: false, message: "Please provide officeNumber" })
        let isOfficeNumberExists = await linkModel.findOne({ officeNumber: officeNumber });
        if (isOfficeNumberExists) return res.status(400).send({ status: false, message: "OfficeNumber already exists" });
        if (!isValidNumber(officeNumber)) return res.status(400).send({ status: false, message: "Office number is invalid" });

        if (whatsapp) {
            if (whatsapp == undefined || typeof (whatsapp) != "string") return res.status(400).send({ status: false, message: "Please provide whatsapp" })
            let isWhatsapp = await linkModel.findOne({ whatsapp: whatsapp });
            if (isWhatsapp) return res.status(400).send({ status: false, message: "whatsapp already exists" });
            if (!isValidWhatappLink(whatsapp)) return res.status(400).send({ status: false, message: "whatsapp is invalid" });
        }

        if (linkedIn) {
            if (linkedIn == undefined || typeof (linkedIn) != "string") return res.status(400).send({ status: false, message: "Please provide linkedIn" })
            let isLinkedInExist = await linkModel.findOne({ linkedIn: linkedIn });
            if (isLinkedInExist) return res.status(400).send({ status: false, message: "linkedIn already exists" });
            if (!isvalidLinkedIn(linkedIn)) return res.status(400).send({ status: false, message: "linkedIn is invalid" });
        }

        if (Instagram) {
            if (Instagram == undefined || typeof (Instagram) != "string") return res.status(400).send({ status: false, message: "Please provide Instagram" });
            let isInstagramExist = await linkModel.findOne({ Instagram: Instagram });
            if (isInstagramExist) return res.status(400).send({ status: false, message: "Instagram already exists" });
            if (!isValidInstagram(Instagram)) return res.status(400).send({ status: false, message: "Instagram is invalid" });
        }
        if (facebook) {
            if (facebook == undefined || typeof (facebook) != "string") return res.status(400).send({ status: false, message: "Please provide facebook" })
            let isFacebookExist = await linkModel.findOne({ facebook: facebook });
            if (isFacebookExist) return res.status(400).send({ status: false, message: "facebook already exists" });
            if (!isvalidfacebook(facebook)) return res.status(400).send({ status: false, message: "facebook is invalid" });
        }
        if (twitter) {
            if (twitter == undefined || typeof (twitter) != "string") return res.status(400).send({ status: false, message: "Please provide twitter" })
            let isTwitterExist = await linkModel.findOne({ twitter: twitter });
            if (isTwitterExist) return res.status(400).send({ status: false, message: "twitter already exists" });
            if (!isvalidTwitter(linkedIn)) return res.status(400).send({ status: false, message: "linkedIn is invalid" });
            
        }
        if (snapChat) {
            if (snapChat == undefined || typeof (snapChat) != "string") return res.status(400).send({ status: false, message: "Please provide snapChat" })
            let isSnapChat = await linkModel.findOne({ snapChat: snapChat });
            if (isSnapChat) return res.status(400).send({ status: false, message: "snapChat already exists" });
        }
        if (telegram) {
            if (telegram == undefined || typeof (telegram) != "string") return res.status(400).send({ status: false, message: "Please provide telegram" })
            let telegram = await linkModel.findOne({ telegram: telegram });
            if (telegram) return res.status(400).send({ status: false, message: "telegram already exists" });
            if (!isvalidTelegram(telegram)) return res.status(400).send({ status: false, message: "telegram is invalid" });
        }
        let createdLink = await linkModel.create(linkData);
        res.status(201).send({ status: true, message: "Link created successfully", messagessss: createdLink });
    }
    catch (err) { res.status(500).send({ status: false, message: err.message }); }
}

const getAllLinks = async (req, res) => {
    try{
        let userId = req.params.userId;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message:"Invalid UserId"});
        let allLinks = await linkModel.find();
        res.status(200).send({status:true, data: allLinks});
    }
    catch(err){res.status(500).send({status:false, msg : err.message})};
}

const getwantedPersonLinks = async (req, res)=>{
    try{
        let userId = req.params.userId;
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message:"Invalid UserId"});
        let data = req.body.linkId;
        console.log("data",data)
        if(!data) return res.status(404).send({status:false, message:"provide valid Information"});
        let gotLink = await linkModel.findById(data);
        console.log(gotLink)
        if(!gotLink) return res.status(404).send({status:false, message:"No match found"});
        return res.status(200).send({status:true, message:"Match Found", data:gotLink})
    }
    catch(err){ res.status(500).send({status:false, message:err.message})};
}

const updateLinkInfo = async (req,res)=>{
    let linkData = req.body;
    let { linkId, officeNumber, whatsapp, linkedIn, Instagram, facebook, twitter, snapChat, telegram } = linkData;
    if(Object.keys(linkData).length == 0) return res.status(400).send({ status: false, message: "please send required data" });
    if(!linkId) return res.status(400).send({ status:false, message: "please send link"});
    let expectedQueries = ["linkId","officeNumber", "whatsapp", "linkedIn", "Instagram", "facebook", "twitter", "snapChat", "telegram"];
    let queries = Object.keys(linkData);
    let count = 0;
    for (let i = 0; i < queries.length; i++) {
      if (!expectedQueries.includes(queries[i])) count++;
    }
    if (count > 0) return res.status(400).send({ status: false, message: "queries can only have officeNumber, whatsapp, linkedIn, Instagram, facebook, twitter, snapChat, telegram"});

    if(officeNumber){
        if(typeof officeNumber !== "string") return res.status(400).send({status:false, messsage:"officeNumber must be a string"});
        officeNumber = linkData.officeNumber = officeNumber.trim();
        if(officeNumber == "") return res.status(400).send({status:false, messsage:"Please enter officeNumber"});
        if(!isValidNumber(officeNumber)) return res.status(400).send({status:false, messsage:"Please enter valid officeNumber"});
    }

    if(whatsapp){
        if(typeof whatsapp !== "string") return res.status(400).send({status:false, messsage:"whatsapp must be a string"});
        whatsapp = linkData.whatsapp = whatsapp.trim();
        if(whatsapp == "") return res.status(400).send({status:false, messsage:"Please enter whatsapp"});
        if (!isValidWhatappLink(whatsapp)) return res.status(400).send({ status: false, message: "whatsapp is invalid" });
    }
    if(linkedIn){
        if(typeof linkedIn !== "string") return res.status(400).send({status:false, messsage:"linkedIn must be a string"});
        linkedIn = linkData.linkedIn = linkedIn.trim();
        if(linkedIn == "") return res.status(400).send({status:false, messsage:"Please enter linkedIn"});
        if (!isvalidLinkedIn(linkedIn)) return res.status(400).send({ status: false, message: "linkedIn is invalid" });
    }
    if(Instagram){
        if(typeof Instagram !== "string") return res.status(400).send({status:false, messsage:"Instagram must be a string"});
        Instagram = linkData.Instagram = Instagram.trim();
        if(Instagram == "") return res.status(400).send({status:false, messsage:"Please enter Instagram"});
        if (!isValidInstagram(Instagram)) return res.status(400).send({ status: false, message: "Instagram is invalid" });
    }
    if(facebook){
        if(typeof facebook !== "string") return res.status(400).send({status:false, messsage:"facebook must be a string"});
        facebook = linkData.facebook = facebook.trim();
        if(facebook == "") return res.status(400).send({status:false, messsage:"Please enter facebook"});
        if (!isvalidfacebook(facebook)) return res.status(400).send({ status: false, message: "facebook is invalid" });
    }
    if(twitter){
        if(typeof twitter !== "string") return res.status(400).send({status:false, messsage:"twitter must be a string"});
        twitter = linkData.twitter = twitter.trim();
        if(twitter == "") return res.status(400).send({status:false, messsage:"Please enter twitter"});
        if (!isvalidTwitter(linkedIn)) return res.status(400).send({ status: false, message: "linkedIn is invalid" });
        
    }
    if(snapChat){
        if(typeof snapChat !== "string") return res.status(400).send({status:false, messsage:"snapChat must be a string"});
        snapChat = linkData.snapChat = snapChat.trim();
        if(snapChat == "") return res.status(400).send({status:false, messsage:"Please enter snapChat"});
    }
    if(telegram){
        if(typeof telegram !== "string") return res.status(400).send({status:false, messsage:"telegram must be a string"});
        telegram = linkData.telegram = telegram.trim();
        if(telegram == "") return res.status(400).send({status:false, messsage:"Please enter telegram"});
        if (!isvalidTelegram(telegram)) return res.status(400).send({ status: false, message: "telegram is invalid" });
    }
    const updateLinks = await linkModel.findByIdAndUpdate({ _id: linkId },
        {
          $set: { officeNumber: officeNumber, whatsapp: whatsapp, linkedIn: linkedIn, Instagram: Instagram, facebook: facebook, twitter: twitter, snapChat: snapChat, telegram : telegram },
        }, { new: true });
  
      return res.status(200).send({ status: true, message: "User profile updated", data: updateLinks })

}

const deleteLink  = async (req, res) =>{
    let linkId = req.params.linkId;
    if(!mongoose.Types.ObjectId.isValid(linkId)) return res.status(400).send({status:false, message:"enter Valid linkId"});
    let link = await linkModel.findById(linkId);
    if(!link) return res.status(404).send({status:false, message:"No match found"});
    if(link.isDeleted == true) return res.status(400).send({status:false, message:"link is already deleted"});
    let gotlink = await linkModel.findByIdAndUpdate({linkId, $set:{isDeleted:true}, new:true});
    return res.status(200).send({status:false, message:"link deleted successfully", data:gotlink});
}
module.exports = { createLink , getAllLinks, getwantedPersonLinks,updateLinkInfo,deleteLink};