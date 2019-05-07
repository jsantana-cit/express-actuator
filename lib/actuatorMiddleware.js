'use strict';

var express = require('express');
var infoRoute = require('./infoRoute');
var metricsRoute = require('./metricsRoute');
var healthCheckRoute = require('./healthCheckRoute');

module.exports = function actuatorMiddleware(endpoint) {
    var router = express.Router();

    var infoPath = '/info';
    var metricsPath = '/metrics';
    var healthCheckPath = '/healthCheck';

    if (endpoint) {
        infoPath = endpoint + infoPath;
        metricsPath = endpoint + metricsPath;
        healthCheckPath = endpoint + healthCheckPath;
    }

    router.get(infoPath, infoRoute);
    router.get(metricsPath, metricsRoute);
    router.get(healthCheckPath, healthCheckRoute);

    return router;
};
