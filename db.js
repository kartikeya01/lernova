const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const courseSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  creatorId: { type: Schema.ObjectId, required: true },
});

const purchaseSchema = Schema({
  courseId: { type: Schema.ObjectId, required: true },
  userId: { type: Schema.ObjectId, required: true },
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("user", userSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
