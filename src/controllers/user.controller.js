import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user deatils from the froned

  // Validateion - not empty
  // check if user already exists (Check username , email)

  // check for images, check for avatoar

  // upload them to cloudinary , check clodinary
  // create user object - Create entry in db
  // remove password and refresh token field from response
  // Check for user creation
  // return res

  const { username, fullName, email, password } = req.body;
  console.log("user: " + username, email, password);

  if (
    [username, fullName, email, password].some((field) => {
      field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //

  const existedUser = User.findOne({
    $or: [{ username }, { email }], // Checking unique
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists with username or email");
  }

  const avatartLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files.coverImage[0]?.path;

  if (!avatartLocalPath) {
    throw new ApiError(400, "Avatar file is requied");
  }

  const avatar = await uploadOnCloudinary(avatartLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is requied");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    email,
    username,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong, while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
