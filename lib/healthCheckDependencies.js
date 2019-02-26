const fs = require('fs');
const request = require('request');
const yaml = require('js-yaml');

var saida = [];

module.exports = () => {
  let checksDependencies = yaml.safeLoad(fs.readFileSync('healthcheck.config.yml', 'utf8')).checks;

  const promises = [
    new Promise((resolve, reject) => {
      request(checksDependencies[0].endpoint, function (error) {
        let objSai = checksDependencies[0];
        if(!error) {
          objSai.status = 'ok';
          resolve(objSai)
        } else {
          objSai.status = 'fail';
          resolve(objSai)
        }
      });
    }),
    new Promise((resolve, reject) => {
      request(checksDependencies[1].endpoint, function (error) {
        let objSai = checksDependencies[1];
        if(!error) {
          objSai.status = 'ok';
          resolve(objSai)
        } else {
          objSai.status = 'fail';
          resolve(objSai)
        }
      });
    }),
    new Promise((resolve, reject) => {
      request(checksDependencies[2].endpoint, function (error) {
        let objSai = checksDependencies[2];
        if(!error) {
          objSai.status = 'ok';
          resolve(objSai)
        } else {
          objSai.status = 'fail';
          resolve(objSai)
        }
      });
    }),
  ];

  Promise.all(promises).then((data) => {
    console.log(data);
    return data;
  });
};
