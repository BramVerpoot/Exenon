const mongoose = require('mongoose');

const WelcomeSchema = new mongoose.Schema({
    Channel: {
        type: String
    },
    GuildID: String
});

const MessageModel = module.exports = mongoose.model('welcomeChannels', WelcomeSchema);