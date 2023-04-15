// const express = require("express")
// const route = require("./routes/route")
// const app = express()
// const mongoose = require("mongoose")

// app.use(express.json())

// mongoose.connect("mongodb+srv://nehajaiswal:neha123@nehadb.pcorgpc.mongodb.net/linktree")
//     .then(() => { console.log("mongoDb is connected") })
//     .catch((err) => { console.log(err.message) })

// app.use('/', route)

// app.listen(3000, function () {
//     console.log('Express app running on port ' + (3000))
// });

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const port = process.env.PORT || 3001;
const route = require("./routes/route");
mongoose.set("strictQuery", true);
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(multer().any());
mongoose.connect("mongodb+srv://nehajaiswal:neha123@nehadb.pcorgpc.mongodb.net/linktree")
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/", route);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});