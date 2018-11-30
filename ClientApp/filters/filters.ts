import Vue from "vue";

export let vueUnknown = Vue.filter("unknown",
    (input: any) => {
        if (input) {
            return input;
        }

        return "Unknown";
    });