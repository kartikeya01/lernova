require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const { Schema } = mongoose;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  creatorId: { type: objectId, required: true },
});

const purchaseSchema = new Schema({
  courseId: { type: objectId, required: true },
  userId: { type: objectId, required: true },
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = { userModel, adminModel, courseModel, purchaseModel };
