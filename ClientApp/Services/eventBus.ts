
let EventBus: any = {}

EventBus.install = (Vue: any, options: any) => {
    Vue.prototype.$eventbus = new Vue();
};

export default EventBus