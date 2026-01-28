import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  roomId: { type: String, require: true, unique: true },
  actions: { type: Array, require: true },

  expiresAt: {
    type: Date,
    require: true,
    index: { expires: 0 },
  },
});

export const BoardModel = mongoose.model("BoardModel", BoardSchema);
