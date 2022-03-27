const fs = require("fs")
const exec = require("child_process").exec
const { token } = require("./config.json");
const { Client } = require("discord.js");

const client = new Client({ intents: ["GUILD_MEMBERS", "GUILD_PRESENCES", "GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"], partials: ["CHANNEL"]});

const async = require("async");

const scriptsFolder = "./deployScripts/";

const files = fs.readdirSync(scriptsFolder);
const funcs = files.map(function(file) {
  return exec.bind(null, `node ${scriptsFolder}${file}`);
});

client.login(token);

client.once("ready", () => {
  function getResults(err, data) {
    if (err) {
      return client.channels.fetch("957431154158489670").then((channel) => {
        channel.send(`${err}`)});
    };
    const results = data.map(function(lines) {
      return lines.join("");
    });
    client.channels.fetch("957431154158489670").then((channel) => {
      channel.send(results.toString())});
  }
  async.series(funcs, getResults)
});