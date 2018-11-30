var EventBus = {};
EventBus.install = function (Vue, options) {
    Vue.prototype.$eventbus = new Vue();
};
export default EventBus;
//# sourceMappingURL=eventBus.js.map