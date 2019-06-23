const Discord = require('discord.js');
const client = new Discord.Client({
  disableEveryone: true
});

const dotent = require('dotenv').config();
const env = process.env

const logs = require('logs')
const path = require('path')

const chalk = require('chalk');
const moment = require('moment');
const fs = require('fs');

var appRoot = process.cwd();

module.exports = (client, message) => {

    const botPrefix = env.BOT_PREFIX

    // Ignore all bots
    if (message.author.bot) return;

    // Ignore messages not starting with the prefix
    if (!message.content.startsWith(botPrefix)) return

    // Standard argument/command name definition.
    const args = message.content.slice(botPrefix.length).trim().split(/ +/g)
    var command = args.shift().toLowerCase()


    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);

    if (!cmd) return

    // Run the command
    cmd.run(client, message, args)
    console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(message.author.tag)}] used ${chalk.green(command)} ${chalk.cyan(args.join(" "))}`)

    if (env.ALLOW_LOGS) {
        if (!env.LOGS_FOLDER_PATH) throw Error('Please specify the log file path in .env')

        let log_message = `(${moment().subtract(10, 'days').calendar()}) ${moment(Date.now()).format('h:mm:ss')} <${message.guild.name}> : [${message.author.tag}] a utilisé la commande : ${botPrefix}${command} ${args.join(" ")}`
        new logs(path.join(__dirname, `../${env.LOGS_FOLDER_PATH ? env.LOGS_FOLDER_PATH : file_name}`)).addData(log_message)    
    }

}
