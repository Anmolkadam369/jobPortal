const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
  };
  
  //Password
  
  const isValidPassword = (password) => {
    //8-15 characters, one lowercase letter and one number and maybe one UpperCase & special character:
    return /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,15}$/.test(password);
  };

  const isValidName = (name) => {
    return /^([a-zA-Z ]){2,30}$/.test(name);
  };
  const isvalidLinkedIn = (linkedIn)=>{
    return /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(linkedIn);
  }
  const isValidWhatappLink = (whatapp)=>{
    return /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?chat.whatapp.com/.test(whatapp);
  }
  const isValidInstagram = (Instagram)=>{
    return /^\s*(http\:\/\/)?instagram\.com\/[a-z\A-Z\d\-]{1,255}\s*$/.test(Instagram);
  }
  const isvalidfacebook = (facebook)=>{
    return /^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/.test(facebook);
  }
  const isvalidTwitter = (twitter) =>{
    return /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(twitter);
  }
  
  const isvalidTelegram = (telegram) =>{
    return /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/.test(telegram);
  }
  const isValidNumber = (Number) => {
    return /^[6789][0-9]{9}$/g.test(Number);
  }
module.exports = {isValidEmail,isValidPassword,isValidName,isValidNumber,isvalidLinkedIn,isValidWhatappLink,isValidInstagram,isvalidfacebook,isvalidTwitter,isvalidTelegram};

// const AWS = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const s3 = new AWS.S3({ /* AWS S3 configuration */ });

// const upload = multer({
//   limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
//   storage: multerS3({
//     s3: s3,
//     bucket: 'your-bucket-name',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       // generate a unique file name using the original file name
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   })
// });

// // example usage
// app.post('/upload', upload.single('file'), function (req, res, next) {
//   res.send('File uploaded successfully.');
// });

