const { MessageEmbed } = require("discord.js")
const prefixModel = require("../../models/prefix")
const colors = require("../../colors.json")

module.exports = {
    name : 'setprefix',
    category : 'admin',
    description : 'Sets the prefix for the server!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        })

        const noPrefixEmbed = new MessageEmbed()
        .setColor(colors.error)
        .setDescription('You must provide a new prefix!')
        const toLongEmbed = new MessageEmbed()
        .setColor(colors.error)
        .setDescription('Your new prefix must be under \`5\` characters!')
        const updateEmbed = new MessageEmbed()
        .setColor(colors.pink)
        .setDescription(`The new prefix is **\`${args[0]}\`**!`)

        if (!args[0]) return message.channel.send(noPrefixEmbed)
        if (args[0].length > 5) return message.channel.send(toLongEmbed)
        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
            
            message.channel.send(updateEmbed)
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save()
        } else if (!data) {
            message.channel.send(updateEmbed)
    
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save()
        }
    }
}
