const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema({
  bookingStartDate: {
    type: Date,
    required: true,
  },
  bookingEndDate: {
    type: Date,
    required: true,
  },
  proofPayment: {
    type: String,
    required: true,
  },
  bankFrom: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: String,
    required: true,
  },
  memberId: {
    type: ObjectId,
    ref: "Member",
  },
  bankId: {
    type: ObjectId,
    ref: "Bank",
  },
  itemId: {
    _id: {
      type: ObjectId,
      ref: "Item",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      required: true,
    },
  },
});

module.exports = mongoose.model("Category", categorySchema);
