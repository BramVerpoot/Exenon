const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose')
const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

mongoose.connect('URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


module.exports = client
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection()
client.aliases = new Collection()
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})
client.login(config.token)
