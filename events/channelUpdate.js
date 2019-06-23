const dotent = require('dotenv').config()
const env = process.env

const logs = require('logs')
const path = require('path')
const moment = require('moment')

module.exports = (client, oldChannel, newChannel) => {
    // Your code
    
    
    // Log module. To configure from .env
    if (env.ALLOW_LOGS) {
        if (!env.LOGS_FOLDER_PATH) throw Error('Please specify the log file path in .env')

        let log_message = `(${moment().subtract(10, 'days').calendar()}) ${moment(Date.now()).format('h:mm:ss')} <${oldChannel.guild.name}> : Channel modifié "${oldChannel.name}" (${oldChannel.type}) -> "${newChannel.name}" (${newChannel.type})`
        new logs(path.join(__dirname, `../${env.LOGS_FOLDER_PATH ? env.LOGS_FOLDER_PATH : file_name}`)).addData(log_message)    
    }
}