import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String, //Cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //Cloudinary url
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//Before we save the data in the database we are using pre method which helps
//  to perform the action like we are doing hash the password

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password ,10)
    next()

})

// This is custom methods where we are checking the password is correct or not.

userSchema.methods.isPasswordCorrect = async function(password){
             return await bcrypt.compare(password , this.password)
}

export const User = mongoose.model("User", userSchema);
