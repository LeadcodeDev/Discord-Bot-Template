const Discord = require('discord.js')
const Enmap = require("enmap")
const fs = require("fs")
const chalk = require('chalk')
const moment = require('moment')
const dotent = require('dotenv').config()
const env = process.env

const Debug = require('./utils/Debug')

const client = new Discord.Client()
client.commands = new Enmap()

Debug.logs(chalk.cyan('Starting ...'))

fs.readdir("./events/", (err, files) => {
    Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] ${chalk.cyan('Loading events ...')}`)

    if (err) return Debug.logs(err)

    files.forEach(async (file) => {
        if (file.endsWith(".js")) {
            const event = require(`./events/${file}`)
            let eventName = file.split(".")[0]
            try {
                client.on(eventName, event.bind(null, client))
                delete require.cache[require.resolve(`./events/${file}`)]
                Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] ${chalk.green('Loaded')} event ${chalk.cyan(file)}`)
            } catch (error) {
                Debug.logs(error)
            }
        } else {
            return
        }
    })
})

fs.readdir("./commands/", async (err, files) => {
    Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] ${chalk.cyan('Loading commands ...')}`)
    
    if (!err) {
        await files.forEach((file) => {
            if (file.endsWith(".js")) {
                let props = require(`./commands/${file}`)
                let commandName = file.split(".")[0]
                try {
                    client.commands.set(commandName, props)
                    Debug.logs(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] ${chalk.green('Loaded')} command ${chalk.cyan(commandName)}`)
                } catch (error) {
                    Debug.logs(error)
                }                 
            } else {
                return
            }
        })
    } else {
        return Debug.logs(err)
    }
})

client.login(env.BOT_TOKEN)
