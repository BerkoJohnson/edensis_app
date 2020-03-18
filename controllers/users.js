const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const passport = require('passport');
const sharp = require('sharp');


// Get Users
exports.fetchUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return next(new ErrorResponse(`Fetching users failed`, 400));
  }
};

// Get User
exports.fetchUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.photo.toString("base64")
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Get User
exports.fetchImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user && !user.photo) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    // console.log(user.photo.toString('base64'));

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.photo.toString("base64")
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 404));
  }
};

// Create User
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
      return next(new ErrorResponse('All fields are required', 400));
    }
    const user = new User({ name, email });
    user.hashPassword(password); // Generate salt and hash password
    await user.save();

    const token = user.generateJwt();
    res.status(201).json({
      success: true,
      data: {
        token: token
      },
    });
  } catch (error) {
    return next(error);
  }
};

// Update User
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(new ErrorResponse(`Delete user ${req.params.id} failed`, 400));
  }
};

// Reset user password
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    user.hashPassword(password);
    user.save();
    if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    next(error);
  }
};

// Log in User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if( !email || !password) {
      return next(new ErrorResponse('All fields are required', 400));
    }
    
    // const user = await User.findOne({ email });

    // // If user exists with email  provided
    // if (!user) {
    //   return next(new ErrorResponse(`Invalid Credentials`, 401));
    // }

    // // Check if passwords match
    // if (!user.verifyPassword(password)) {
    //   return next(new ErrorResponse(`Invalid Credentials`, 401));
    // }

    // res.status(200).json({
    //   success: true
    // });

    let token;

    passport.authenticate('local', (err, user, info) => {
      if(err) {
        res.status(404).json(err);
      }

      if(user) {
        token = user.generateJwt();
        return res.status(200).json({token});
      }
      else {
        res.status(401).json(info);
      }
    })(req, res);

  } catch (error) {
    next(new ErrorResponse("Logging user in failed", 401));
  }
};

// Update User's Photo
exports.updatePhoto = async (req, res, next) => {
  try {
    // No image file submitted
    if (!req.file) {
      return next(new ErrorResponse("Please select an image", 400));
    }

    // const imgBuffer = req.file.buffer.toString("base64");
    const image = await sharp(req.file.buffer).resize(200,200).toBuffer();

    // console.log();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { photo: image },
      {
        new: true,
        runValidators: true
      }
    );
    if (!user) {
      return next(new ErrorResponse(`User not found`, 404));
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, 400));
  }
};
