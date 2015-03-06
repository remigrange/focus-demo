# The config object
class Config
  appcontainer: 'content'
  approot: '/'
  apiroot: '.'#http://localhost:8080/rodolphe' #Url of the web api
  lang: "fr-FR"
  dateFormat: "JJ/MM/AAAA HH:mm"
  appName: '######################################################'
  log: {level: 'error', max: 10, outputs:['console', 'localStorage']}

module.exports = new Config()