const {Schema, model} = require('mongoose')

const ConversationSchema = new Schema(
  {
    members: {type: Array, max:2}
  },
  { timestamps: true }
);

module.exports = model("Conversation", ConversationSchema);