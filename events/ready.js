const dotent = require('dotenv').config();
const env = process.env
const chalk = require('chalk')
const moment = require('moment')
const logs = require('logs')
const path = require('path')

let file_name

module.exports = (client) => {
    console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Pret à servir dans ${chalk.cyan(client.channels.size)} channels sur ${chalk.cyan(client.guilds.size)} serveurs, pour un total de ${chalk.cyan(client.users.size)} utilisateurs.`);
    client.user.setActivity(`your activity`, {
        type: 'WATCHING'
    })
    .then(presence => console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Activity set`))
    .catch(console.error)

    if (env.ALLOW_LOGS) {
        if (!env.LOGS_FOLDER_PATH) throw Error('Please specify the log file path in .env')

        let log_message = `(${moment().subtract(10, 'days').calendar()}) ${moment(Date.now()).format('h:mm:ss')} : [${client.user.username}] vient de redémarrer pour ${client.users.size} utilisateurs`
        new logs(path.join(__dirname, `../${env.LOGS_FOLDER_PATH ? env.LOGS_FOLDER_PATH : file_name}`)).addData(log_message)    
    }
}
