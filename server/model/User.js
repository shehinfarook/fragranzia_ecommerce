const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    dob: { type: String },
    gender: { type: String },
    // googleId: {
    //   type: String,
    //   unique: true,
    //   sparse: true, // Allows multiple users without a googleId
    // },
    loginMethod: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    image: { type: String },
    plan: {
      type: String,
      // enum: ["premium", "standard", "basic"]
    },
    planValidUntil: {
      type: Date,
    },
    // razorpay_account_id: {
    //   type: String,
    //   trim: true,
    //   default: null,
    // },
    // razorpay_bank_details: {
    //   beneficiaryName: { type: String },
    //   businessType: { type: String },
    //   ifscCode: { type: String },
    //   accountNumber: { type: String }
    // },
    status: {
      type: Boolean,
      required: [true, "Status is required"],
      default: true,
    },
    isDelers: {
      type: Boolean,
      required: [true, "Status is required"],
      default: false,
    },
    deler_name: {
      type: String
    },
    delers_priority: {
      type: Boolean
    },
    isActive: { type: Boolean, default: true },
    role: {
      type: String,
      enum: [ "admin", "user"],
      default: "user",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
   
    cart_total: {
      type: Number,
      default: 0
    },
   
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);