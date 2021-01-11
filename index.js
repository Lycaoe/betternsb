const Discord = require("discord.js");
const giphy = require("giphy-api")();
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const Minesweeper = require('discord.js-minesweeper');
var prefix = "a!"



const activities_list = [
    "Status1", 
    "Status2",
    "Status3", 
    "with a!help"
    ];

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("ready", () => {
      setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
});

client.on("message", async message => {
if (message.author.bot) return;

if(message.content.startsWith(prefix + 'help')) {
 message.channel.send("Check documentation here: **https://ase-discord.glitch.me/**");
}
if(message.content.startsWith(prefix + 'ping')) {
  const m = await message.channel.send("Ping?");
  m.edit(`Pong! Latency is **${m.createdTimestamp - message.createdTimestamp}ms**! API Latency is **${Math.round(client.ws.ping)}ms**!`);
}
if(message.content.startsWith(prefix + 'servers')) {
  const m = await message.channel.send("Counting...");
  m.edit(`Bot is being used on ${client.guilds.cache.size} servers, with ${client.users.cache.size} people!`);
  }
if(message.content.startsWith(prefix + 'gif')) {
const args = message.content.slice().trim().split(/ +/g);
const command = args.shift().toLowerCase(); 
let converts = args.join(" ");  

if(converts ==""){converts = "random"}  
giphy.search({q: converts,rating: 'g'}, function (err, response) {

if(response.data.length == 0){
let embed2 = new Discord.RichEmbed()
.setColor(0x00ae86)
.setDescription(`Sorry I Can't find a gif related with your words.`)
.setTimestamp()
message.channel.send({embed:embed2})   
return;
}

var totalResponses = response.data.length;
var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;

let embed = new MessageEmbed()
.setColor(0x00ae86)
.setDescription(`**Name:** "${response.data[responseIndex].title}".`)
.setImage(response.data[responseIndex].images.original.url)
.setTimestamp()
message.channel.send(embed);
})
}
if(message.content.startsWith(prefix + 'didyoumean')) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let top = args[0]; // Remember arrays are 0-based!.
  let bottom = args[1];
  let didyoumean = new MessageEmbed()
  .setColor(0x00ae86)
  .setDescription(`**Image:**`)
  .setImage(`https://api.alexflipnote.dev/didyoumean?top=${top}&bottom=${bottom}`)
  .setTimestamp()
  message.channel.send(didyoumean);
}
if(message.content.startsWith(prefix + 'minesweeper')) {
  const content = message.content.split(' ');
  const args = content.slice(1);
  const rows = parseInt(args[0]);
  const columns = parseInt(args[1]);
  const mines = parseInt(args[2]);

  if (!rows) {
    return message.channel.send(':warning: Please provide the number of rows.');
  }

  if (!columns) {
    return message.channel.send(':warning: Please provide the number of columns.');
  }

  if (!mines) {
    return message.channel.send(':warning: Please provide the number of mines.');
  }

  const minesweeper = new Minesweeper({ rows, columns, mines });
  const matrix = minesweeper.start();
  message.channel.send(matrix).catch((err) => {
    console.error(err);
    var x = err.message;
    message.channel.send(`${x}\nInvalid Form Body error? **Try "a!minesweeper 5 5 5"**`)
  });
  }
});

client.login(config.token);
