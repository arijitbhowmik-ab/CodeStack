const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  courseID : {
    type: mongoose.Types.ObjectId,
    ref: "Course"
  }
});

const Purchase = mongoose.model("Purchase", purchaseSchema);
module.exports = Purchase;
