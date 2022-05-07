const Message = require("../models/message");

const getMessages = async (req, res) => {
  const { uid } = req;
  const fromMessages = req.params.from;

  const last25 = await Message.find({
    $or: [
      { from: uid, to: fromMessages },
      { from: fromMessages, to: uid },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(25);

  res.json({
    success: true,
    messages: last25,
  });
};

module.exports = { getMessages };
