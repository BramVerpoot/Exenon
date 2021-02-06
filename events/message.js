const client = require('../index')
const config = require('../config.json')
const colors = require("../colors.json")
const mongoose = require('mongoose')
const Discord = require('discord.js')
const prefixModel = require("../models/prefix")


client.on('message', async message =>{

    const data = await prefixModel.findOne({
        GuildID: message.guild.id
    })


    if (data) {
        prefix = data.Prefix
    } else {
        prefix = config.prefix
    }

    if (message.content === 'prefix') {
        const prefixEmbed = new Discord.MessageEmbed()
        .setColor(colors.pink)
        .setDescription(`My prefix for **${message.guild.name}** is **${prefix}**`)

        message.channel.send(prefixEmbed)
    }
    if(message.author.bot) return
    if(!message.content.startsWith(prefix)) return
    if(!message.guild) return
    if(!message.member) message.member = await message.guild.fetchMember(message)
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()
    if(cmd.length == 0 ) return
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd))
    if(command) command.run(client, message, args) 
})
