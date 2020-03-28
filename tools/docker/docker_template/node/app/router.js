'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.post('/registered', controller.home.registered);
    router.get('/:username', controller.home.getByUsername);
    router.get('/', controller.home.index);
};