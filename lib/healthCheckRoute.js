'use strict';

var healthCheckDependencies = require('./healthCheckDependencies');

module.exports = function healthCheck(req, res) {

    healthCheckDependencies().then((dataDependencies) => {
        dataDependencies.forEach((check) =>{
            if(!check.status){
                res.status(400).json().end();
            }
        });

        res.status(200).json().end();
    });
};
