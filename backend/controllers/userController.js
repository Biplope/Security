const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resetCode, mailConfig } = require("../utils/resetPassword");
const ResetCode = require("../model/resetCodeModel");
const cloudinary = require("cloudinary");

const createUser = async (req, res) => {
  // step 1 : Check if data is coming or not
  console.log(req.body);

  // step 2 : Destructure the data
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // step 3 : validate the incomming data
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.json({
      success: false,
      message: "Please enter all the fields.",
    });
  }

  // step 4 : try catch block
  try {
    // step 5 : Check existing user
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }
    23;
    // password encryption
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    // step 6 : create new user
    const newUser = new Users({
      // fieldname : incomming data name
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      confirmPassword: confirmPassword,
    });

    // step 7 : save user and response
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

const loginUser = async (req, res) => {
  // step 1: Check incomming data
  console.log(req.body);

  // destructuring
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  // try catch block
  try {
    // finding user
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists.",
      });
    }

// Check if account is locked
if (user.accountLocked) {
  const lockoutDurationMillis = Date.now() - user.lastFailedLoginAttempt;
  const lockoutDurationSeconds = lockoutDurationMillis / 1000; // convert to seconds

  if (lockoutDurationSeconds >= 120) { // 2 minutes in seconds
      // Unlock the account
      user.accountLocked = false;
      user.failedLoginAttempts = 0;
      await user.save();
  } else {
      const timeRemainingSeconds = 120 - lockoutDurationSeconds;
      const minutes = Math.floor(timeRemainingSeconds / 60);
      const seconds = Math.floor(timeRemainingSeconds % 60);

      return res.status(400).json({
          success: false,
          message: `Account is locked. Please try again later after ${minutes} minutes and ${seconds} seconds.`
      });
  }
}
  // Check password expiry
  const checkPasswordExpiry = (user) => {
    const passwordExpiryDays = 90; // Set the password expiry duration in days
    const currentDate = new Date();
    const lastPasswordChangeDate = user.passwordChangeDate || user.createdAt;

    const daysSinceLastChange = Math.floor(
        (currentDate - lastPasswordChangeDate) / (1000 * 60 * 60 * 24)
    );

    const daysRemaining = passwordExpiryDays - daysSinceLastChange;

    if (daysRemaining <= 3 && daysRemaining > 0) {
        const message = `Your password will expire in ${daysRemaining} days. Please change your password.`;
        return {
            expired: false,
            daysRemaining: daysRemaining,
            message: message
          };
        }

        return {
            expired: daysSinceLastChange >= passwordExpiryDays,
            daysRemaining: daysRemaining,
            message: null
        };
    };
 // Compare password
 const isPasswordValid = await bcrypt.compare(password, user.password);
 if (!isPasswordValid) {
     // Increment failed login attempts and update last failed login timestamp
     user.failedLoginAttempts += 1;
     user.lastFailedLoginAttempt = Date.now();

     // Check if the maximum allowed failed attempts is reached
     if (user.failedLoginAttempts >= 4) {
         // Lock the account
         user.accountLocked = true;
         await user.save();
         return res.json({
             success: false,
             message: "Account is locked. Please try again later."
         });
     }
     await user.save();
     return res.json({
         success: false,
         message: "Incorrect Password."
     });
 }

 // Reset failed login attempts and last failed login timestamp on successful login
 user.failedLoginAttempts = 0;
 user.lastFailedLoginAttempt = null;
 await user.save();

 // Check if the account is still locked after successful login
 if (user.accountLocked) {
     return res.json({
         success: false,
         message: "Account is locked. Please try again later."
     });
 }



    // user exists:  {FirstName, LastName, Email, Password} user.password
    // Comparing password
    const databasePassword = user.password;
    const isMatched = await bcrypt.compare(password, databasePassword);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    // response
    res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      token: token,
      userData: user,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
      error: error,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // Step 1: Check incoming data
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter both current and new passwords.",
      });
    }

    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Step 3: Compare current password with the one stored in the database
    const isMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }
    // Step 4: Encrypt and update the password
    const newSalt = await bcrypt.genSalt(10);
    const newEncryptedPassword = await bcrypt.hash(newPassword, newSalt);

    user.password = newEncryptedPassword;
    await user.save();

    // Step 5: Response
    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//Profile

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decodedToken.id;
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      userProfile: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
        location: user.location,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

// const updateUserProfile = async (req, res) => {
//   console.log(req.files);
//   try {
//     const user = await Users.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     const { firstName, lastName, email, contact, profileImage } = req.body;

//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (email) user.email = email;
//     if (contact) user.contact = contact;
//     if (req.files) {
//       const uploadedImage = await cloudinary.v2.uploader.upload(
//         req.files.profileImage.path,
//         {
//           folder: "profile_images",
//           crop: "scale",
//         }
//       );
//       user.profileImage = uploadedImage.secure_url;
//     }
//     await user.save();

//     // Return the updated user profile data
//     res.status(200).json({
//       success: true,
//       message: "User profile updated successfully",
//       userProfile: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         contact: user.contact,
//         profileImage: user.profileImage,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

const updateUserProfile = async (req, res) => {
  console.log(req.files);
  try {
    // Check if user object exists in the request
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated.",
      });
    }

    const user = await Users.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { firstName, lastName, email, contact, location, profileImage } =
      req.body;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (contact) user.contact = contact;
    if (location) user.location = location;
    if (req.files) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        req.files.profileImage.path,
        {
          folder: "profile_images",
          crop: "scale",
        }
      );
      user.profileImage = uploadedImage.secure_url;
    }
    await user.save();

    // Return the updated user profile data
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      userProfile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contact: user.contact,
        location: user.location,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//reset password
const resetPassword = async (req, res) => {
  const UserData = req.body;
  console.log(UserData);
  const user = await Users.findOne({ email: UserData?.email });
  const OTP = resetCode;
  console.log(user.id);
  console.log(OTP);
  await ResetCode.findOneAndUpdate(
    {
      userId: user.id,
    },
    {
      resetCode: OTP,
    },
    { upsert: true }
  );
  console.log(user);
  const MailConfig = mailConfig();

  const mailOptions = {
    from: "Food Rush", // Replace with your email
    to: UserData?.email,
    subject: "Password Reset Code",
    text: `Your password reset code is: ${OTP}`,
  };

  try {
    await MailConfig.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Reset code email sent successfully!",
    });
    // console.log('Reset code email sent successfully!');
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error sending reset code email:" + error.message,
    });
  }
};

const verifyResetCode = async (req, res) => {
  const { resetCode, email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found with the provided email.",
      });
    } else {
      const savedResetCode = await ResetCode.findOne({ userId: user._id });
      if (!savedResetCode || savedResetCode.resetCode != resetCode) {
        return res.json({
          success: false,
          message: "Invalid reset code.",
        });
      } else {
        return res.json({
          success: true,
          message: "Reset code verified successfully.",
        });
      }
    }
  } catch (error) {
    console.error("Error in verifyResetCode:", error);
    return res.json({
      success: false,
      message: "Server Error: " + error.message,
    });
  } //set opt code null
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    // Update the user's password
    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);

    await Users.findOneAndUpdate({ email }, { password: encryptedPassword });

    return res.json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  changePassword,
  updateUserProfile,
  getUserProfile,
  resetPassword,
  verifyResetCode,
  updatePassword,
};
