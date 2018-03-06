const regedit = require('regedit')

module.exports = function (vorpal) {
  vorpal
    .command('proxy')
    .alias('pr')
    .description('Remove the proxy')
    .action(function (args, callback) {
      const valuesToPut = {
        'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings': {
          'AutoConfigURL': {
            value: '',
            type: 'REG_SZ'
          }
        }
      }

      const deleteValue = () => {
        regedit.putValue(valuesToPut, (err) => {
          if (err) {
            this.log('ERROR', err)
          } else {
            this.log('Proxy removed!')
          }
        })
      }

      deleteValue()
      callback()
    })
}