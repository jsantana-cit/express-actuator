const fs = require('fs');
const request = require('request');
const yaml = require('js-yaml');

module.exports = () => {
    try {
        let checksDependencies = yaml.safeLoad(fs.readFileSync('healthcheck.config.yml', 'utf8')).checks;

        const promises = [];
        checksDependencies.forEach((check) => {
            promises.push(
                new Promise((resolve, reject) => {
                    request(check.endpoint, function (error) {
                        if(!error) {
                            check.status = true;
                            resolve(check)
                        } else {
                            check.status = false;
                            resolve(check)
                        }
                    });
                })
            );
        });

        return Promise.all(promises).then((data) => {
          return data;
        });
    } catch(e) {
        return new Promise((resolve) => resolve([]));
    }
};
