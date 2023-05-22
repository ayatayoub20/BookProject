const winston = require('winston');
const dotenv = require('dotenv')
dotenv.config();

const dataFormat = ()=>{
return new Date(Date.now()).toLocaleString();
}  
class LoggerService{
    constructor(route){
        this.route = route;
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info =>{
            let message = `${dataFormat()} | ${info.level.toUpperCase()} | ${info.message} |`;
             message = info.obj? `data ${JSON.stringify(info.obj)} |` : message;
             return message

            }),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.Console(),
              new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${route}.log` }),
            ],
          });
        this.logger = logger;      

    }

    async info(message){
        this.logger.log('info',message)
    }
    async info(message , obj){
        this.logger.log('info',message, {obj})
    }
    async error(message){
        this.logger.log('error',message)
    }
    async error(message , obj){
        this.logger.log('error',message, {obj})
    }

}

module.exports = LoggerService;