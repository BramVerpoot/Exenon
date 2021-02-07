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
            await welcomeModel.findOneAndRemove({
                GuildID: message.guild.id
            })
        }

        let newData = new welcomeModel({
            Channel: channel,
            GuildID: message.guild.id
        })
        newData.save()

        let embed = new MessageEmbed()
        .setColor(colors.pink)
        .setDescription(`The welcome channel is now ${channel}!`)
        channel.send(embed)
        
    
}

}
