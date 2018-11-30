import Vue from "vue";
export var vueUnknown = Vue.filter("unknown", function (input) {
    if (input) {
        return input;
    }
    return "Unknown";
});
//# sourceMappingURL=filters.js.map