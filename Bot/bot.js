var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console(), {
  colorize: true
});
logger.level = "debug";

// Initialize Discord Bot
var bot = new Discord.Client({
  token: auth.token,
  autorun: true
});
bot.on("ready", function(evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.username + " - (" + bot.id + ")");
});

const today = new Date();

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saterday"
];

bot.on("message", function(user, userID, channelID, message, evt) {
  if (
    message.toLowerCase() == "is it friday?" ||
    message.toLowerCase() == "friday?"
  ) {
    if (today.getDay() != 5) {
      bot.sendMessage({
        to: channelID,
        message: `No ${user}! its ${days[today.getDay()]}.`
      });
    } else {
      bot.sendMessage({
        to: channelID,
        message: `Yes ${user}! its ${days[today.getDay()]}.`
      });
    }
  }

  if (
    message.toLowerCase() == "when is it friday?" ||
    message.toLowerCase() == "when is it friday then?"
  ) {
    const diff = 5 - today.getDay();

    bot.sendMessage({
      to: channelID,
      message: `${user} you have to sleep ${
        diff <= 0 ? diff + 7 : diff
      } nights!`
    });
  }
});
