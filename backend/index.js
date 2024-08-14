const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");
const cors = require("cors");
const cloudinary = require("cloudinary");
const acceptMultimedia = require("connect-multiparty");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var morgan = require("morgan");
// Making express app
const app = express();
app.use(morgan("combined"));
// dotenv config
dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(acceptMultimedia());

// cors config to accept request from frontend
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());

// creating test route
app.get("/test", (req, res) => {
  res.status(200).json("Hello from server");
});

// user routes
app.use("/api/user", require("./routes/userRoutes"));

//product routes
app.use("/api/product", require("./routes/productRoutes"));

app.use("/api/user", require("./routes/cartRoutes"));
app.use("/api/user", require("./routes/orderRoutes"));
app.use("/api/user", require("./routes/favoriteRoutes"));



// our actual routes
// http://localhost:5000/api/user/create
// http://localhost:5000/api/user/login

// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.post('/forgot-password',(req,res)=>{
//   const{email}=req.body;
//   UserModel.findOne({email:email})
//   .then(users=>{
//     if(!users){
//       return res.send({Status:"Use donot exist"})
//     }
//     const token = jwt.sign({ id: users._id }, process.env.JWT_SECRET,{expiresIn:"1d"})

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     users: "maharjanbiplope16@gmail.com",
//     pass: "Nepali0001",
//   },
// });

// var mailOptions = {
//   from: "maharjanbiplope16@gmail.com",
//   to: "vilecrew9@gmail.com",
//   subject: "Sending Email using Node.js",
//   text: `http://localhost:3000/reset-password/${users._id}/${token}`
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     return res.send({Staus:"Success"})
//   }
// });
//   })
// })

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }
    const token = jwt.sign({ id: user._id }, "jwt_secret_key", {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "youremail@gmail.com",
        pass: "your password",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "user email@gmail.com",
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});
module.exports=app