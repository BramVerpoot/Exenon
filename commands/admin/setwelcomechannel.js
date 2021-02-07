const { MessageEmbed } = require("discord.js")
const welcomeModel = require("../../models/welcomechannel")
const colors = require("../../colors.json")

module.exports = {
    name : 'setwelcomechannel',
    category : 'admin',
    description : 'Sets the welcome channel for the server!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

        channel = message.channel
        const data = await welcomeModel.findOne({
            GuildID: message.guild.id
        })

        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })
        }

        let newData = new welcomeModel({
            Channel: channel,
            GuildID: message.guild.id
        })
        newData.save()

        message.reply('ok')
    
}

}
