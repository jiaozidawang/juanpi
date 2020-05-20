const port = require('../../config').dev.port

const getIPAdress = () => {
     const interfaces = require('os').networkInterfaces();
     for (const devName in interfaces) {
          const iface = interfaces[devName];
          for (let i = 0; i < iface.length; i++) {
               const alias = iface[i];
               if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    console.log(`工作IP为：${alias.address}`)
                    return alias.address;
               }
          }
     }
}

module.exports = 'http://' + getIPAdress() + ':' + port
