'use strict'

const {
  KpiApiRouter,
  KpiApiController,
} = require('./dist/commonjs/index');

const routerDiscoveryTag = require('@essential-projects/bootstrapper_contracts').routerDiscoveryTag;

function registerInContainer(container) {
  container.register('KpiApiRouter', KpiApiRouter)
    .dependencies('KpiApiController')
    .singleton()
    .tags(routerDiscoveryTag);

  container.register('KpiApiController', KpiApiController)
    .dependencies('KpiApiService')
    .singleton();
}

module.exports.registerInContainer = registerInContainer;
