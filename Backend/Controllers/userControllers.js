const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const generateToken = require("../util/generateToken");



const registerUser= asyncHandler(async(req,res)=>{

    const {name,email,password,pic}=req.body;

console.log(name,email);

const userExists=await User.findOne({email});

if(userExists){
    res.status(400);
    throw new Error ("user already exists")
}

const user=await User.create({
    name,
    email,
    password,
    pic,
});


console.log("user::",user)

if(user){
    res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        isAdmin:user.isAdmin,
          token:generateToken(user._id),
    })
}

else{

    res.status(400)

    throw new Error("error occured")
}

})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

console.log("body",req.body);

  const user = await User.findOne({ email });

  console.log("userrrr",user)

  if (user && (await user.matchPassword(password))) {


    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token:generateToken(user._id),
      pic: user.pic,
      
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log("userMan",user)

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});




module.exports={registerUser,authUser,updateUserProfile}





   