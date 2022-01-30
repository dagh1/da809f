const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

User.hasMany(Conversation);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
User.belongsToMany(Conversation, { through: "Conversation_Users" });
Conversation.belongsToMany(User, { through: "Conversation_Users" });

module.exports = {
  User,
  Conversation,
  Message
};
