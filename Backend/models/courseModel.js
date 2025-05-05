const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
