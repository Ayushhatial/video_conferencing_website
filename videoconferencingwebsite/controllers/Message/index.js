const Room = require("../../models/room.model");
const Message = require("./../../models/message.model");
const User = require("./../../models/user.model");


const createMessage = async (user, content, room) => {
  console.log(user, content, room);

  try {
    user = await User.findOne({ email: user.email });
    user = user._id;
  } catch (err) {
    console.error(err);
    return { success: false, message: "User not found" };
  }
  try {
    room = await Room.findOne({ roomID: room });
    room = room._id;
  } catch (err) {
    console.error(err);
    return { success: false, message: "Room not found" };
  }
  try {
    const message = { user, content, room };

    const messageRes = await Message.create(message);
    return { success: true, message: messageRes };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};


const getMessages = async (req, res) => {
  console.log(req.body);

  let { room } = req.body;

  try {
    room = await Room.findOne({ roomID: room });
    room = room._id;
  } catch (err) {
    console.error(err);
    return res.json({ success: false, message: "Room not found" }).status(404);
  }
  try {
    const messages = await Message.find({ room: room._id })
      .populate("user")
      .limit(50)
      .sort("createdAt");

    return res.json({ success: true, messages }).status(200);
  } catch (err) {
    console.error(err);
    return res.json({ success: false }).status(500);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
