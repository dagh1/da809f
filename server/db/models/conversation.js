const { Op } = require("sequelize");
const db = require("../db");
const Message = require("./message");
const User = require("./user");

const Conversation = db.define("conversation", {});

// find conversation given two user Ids

Conversation.findConversation = async function (usersIds) {
  const conversation = await Conversation.findOne({
    where: {
      "$User.id$": {
        [Op.in]: usersIds,
      },
    },
    include: [
      {
        model: User,
        required: false,
      },
    ],
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
