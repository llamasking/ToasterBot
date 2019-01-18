// Load up the discord.js library
let Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
let client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
let config = require("./config.json");

// Get Startup Time
let date = new Date();
let time = date.toLocaleTimeString();

// Set revision.
let rev = '0.1'

client.on("ready", () => {
  console.log("Revision: " + rev + " -- " + time);
  client.user.setActivity(config.activity);
});

client.on("message", async message => {
  // Cut out bots, non-prefix, and group chats/dms.
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(message.guild === null) return;

  // Divide into arguments, command, and expressions.
  let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();
  let expr = args[0];

  // Ignore if command is not !caseclosed 
  if (command != "caseclosed") return;

  // Ignore if sender does not have manage role permission.
  if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Nope.");

  // Find role by name.
  let xrole = message.guild.roles.find(xrole => xrole.name === config.rolename)
  if (!xrole) return message.reply("Something bad happened. Our technitian llamas are not working on it.")

  // Find user to remove role from.
  let xmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!xmember) return message.reply("Something bad happened. Our technitian llamas are not working on it.")

  // Remove user's role.
  xmember.removeRole(xrole.id);

  // Case closed message
  message.channel.send("Case closed proceed with purging the channel.");
  
  /*
  // Purge channel.
  message.channel.bulkDelete(100);
  */
});
client.login(config.token);
