let URL = require('../../config/server');
let fetch = Focus.network.fetch;
let isLocal = true;
module.exports = {
    identity: {
      get(id) {
        if(isLocal){
          return Promise.resolve({
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@mail.fr',
            birthDate: new Date().toISOString(),
            pseudo: 'jdupont',
            age: 22
          });
        }
        return fetch(URL.domain.identity.get({urlData: {id: id}}));
      },
      save(json){
        if(isLocal){
          return Promise.resolve(json);
        }
        return fetch(URL.domain.identity.save({urlData: {id: json.id}, data: json}));
      }
    }
  };
