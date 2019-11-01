const chalk = require('chalk')
const moment = require('moment')

let file_name

module.exports = (client) => {
    console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Pret à servir dans ${chalk.cyan(client.channels.size)} channels sur ${chalk.cyan(client.guilds.size)} serveurs, pour un total de ${chalk.cyan(client.users.size)} utilisateurs.`);
    client.user.setActivity(`your activity`, {
        type: 'WATCHING'
    })
    .then(presence => console.log(`[${chalk.cyan(moment(Date.now()).format('h:mm:ss'))}] [${chalk.yellow(client.user.tag)}] Activity set`))
    .catch(console.error)
}
