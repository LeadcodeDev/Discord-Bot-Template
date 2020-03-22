const dotent = require('dotenv').config()
const env = process.env
const chalk = require('chalk')
const moment = require('moment')
const Debug = require('../utils/Debug')

module.exports = async (client, message) => {

    if (!message.author.bot) {
        if (message.content.startsWith(env.BOT_PREFIX)) {
            const args = message.content.slice(env.BOT_PREFIX.length).trim().split(/ +/g)
            const command = args.shift().toLowerCase()
            const cmd = client.commands.get(command)
        
            if (cmd) {
                await cmd.run(client, message, args)
                Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(message.author.tag)}] used ${chalk.green(command)} ${chalk.cyan(args.join(" "))}`)
            } else {
                return
            }
        } else {
            return
        }
    } else {
        return
    }

}
