import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import apiResponse from "../utils/apiResponse.js";
import { upload } from "../middleware/multer.middleware.js";



const registerUser = asyncHandler(async (req, res) => {
 
  // get user detail from frontend
  // validation
  // check if user already exist or not
  // check for images : check for avtar
  // upload them to cloudinary
  // create user object - create entry in db
  // remove password and refresh token from response
  // check for user response
  // return response or send error
 

  const { fullname, email, password, username } = req.body;

  if (
    [fullname, email, password, username].some((item) => item.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required");
  } else if (email.include !== `@`) {
    throw new ApiError(400, "Enter correct email");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User Already Exist");
  }
  
  const avtarLocalPath = await res.files?.avatar[0]?.path;
  const coverImageLocalPath = await  req.files?.coverImage[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Upload avtar");
  }

    const avatar = await  uploadOnCloudinary(avtarLocalPath)
    console.log(avatar)
    const coverimage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(coverimage)


console.log('Avatar Path:', avtarLocalPath);
console.log('Cover Image Path:', coverImageLocalPath);

    if(!avatar){
      throw new ApiError(400 , "avatar not ploaded")
    }

    const user = await User.create({
      fullname,
      avatar : avatar.url,
      coverImage : coverimage?.url || "",
      password,
      username : username.toLowerCase(),
      email 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
      throw new ApiError(500 , "something went wrong while registring user")
    }
     
    return res.send(201).res.json(
      new apiResponse(200 , createdUser , "userRegisteredSuccessfully" , )
    )

});

export default registerUser;
