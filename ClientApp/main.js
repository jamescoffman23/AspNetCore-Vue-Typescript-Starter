import Vue from "vue";
import Vuetify from "vuetify";
import VeeValidate from "vee-validate";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import { JL } from "jsnlog";
import moment from "moment";
var VueInputMask = require("vue-inputmask").default;
import { LogLevel } from "./Enums/logLevel";
import { LogService } from "./Services/logService";
Vue.use(Vuetify);
Vue.use(VeeValidate, { inject: false });
Vue.use(VueChartkick, { adapter: Chart });
Vue.use(VueInputMask);
Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
    LogService.log(LogLevel.Error, "*********VUE Error Handler ********", true);
    if (err) {
        LogService.log(LogLevel.Error, "err: " + err, true);
    }
    if (vm) {
        LogService.log(LogLevel.Error, "vm: " + vm, true);
    }
    if (info) {
        LogService.log(LogLevel.Error, "info: " + info, true);
    }
};
JL.setOptions({ "defaultAjaxUrl": window.BaseUrl + "jsnlog.logger" });
import { EventNames } from "./Enums/eventNames";
import HomeIndexPage from "./Pages/home.index";
import MustAcknowledgePage from "./Pages/mustAcknowledge";
import ErrorPage from "./Pages/error";
import NotFoundPage from "./Pages/notfound";
import UnauthorizedPage from "./Pages/unauthorized";
import PageLoading from "./Components/pageLoading";
import EventBus from "./Services/eventBus";
Vue.use(EventBus);
Vue.filter("unknown", function (input) {
    if (input) {
        return input;
    }
    return "Unknown";
});
Vue.filter("moment", function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args = Array.prototype.slice.call(args);
    var date;
    var format;
    var input = args.shift();
    if (!input) {
        return input;
    }
    if (args.length > 1 && (typeof input === "string")) {
        date = moment(input, args[0], true);
        format = args[1];
    }
    else {
        format = args.shift();
        date = moment(input);
    }
    if (!date.isValid()) {
        console.warn("invalid Date");
        return input;
    }
    date = date.format(format);
    return date;
});
var vm = new Vue({
    el: "#app-root",
    components: {
        MustAcknowledgePage: MustAcknowledgePage,
        HomeIndexPage: HomeIndexPage,
        ErrorPage: ErrorPage,
        NotFoundPage: NotFoundPage,
        UnauthorizedPage: UnauthorizedPage,
        PageLoading: PageLoading,
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
            }
        }
    },
    data: {
        navDrawer: null,
        pageAlert: {
            show: false,
            alertTitle: "",
            alertMessage: "",
        },
        snackBar: {
            show: false,
            message: "",
            timeout: 6000,
            y: "bottom",
            x: "center",
            mode: ""
        },
        recentHeaders: [],
        recentLimit: 10,
    },
    created: function () {
        LogService.log(LogLevel.Debug, "App Root Created", true);
        this.recentHeaders = [{ text: "", value: "", sortable: false },
            { text: "Complaint", value: "complaintId", sortable: true },
            { text: "Date Accessed", value: "dateAccessed", sortable: true }];
    },
    mounted: function () {
        LogService.log(LogLevel.Debug, "App Root Mounted", true);
    },
    methods: {
        showSnackBar: function (msg) {
            this.snackBar.message = msg;
            this.snackBar.show = true;
        },
        showPageAlert: function (title, msg) {
            this.pageAlert.alertTitle = title;
            this.pageAlert.alertMessage = msg;
            this.pageAlert.show = true;
        },
        showPageLoading: function (show) {
            this.$eventbus.$emit(EventNames.SetPageLoading, show);
        },
        redirect: function (url, id, newWindow) {
            if (newWindow === void 0) { newWindow = false; }
            if (newWindow) {
                window.open(url + "?id=" + id, "_blank");
            }
            else {
                window.location.assign(url + "?id=" + id);
            }
        },
        copyToClipboard: function (msg) {
            var el = document.createElement("textarea");
            el.value = msg || "";
            el.setAttribute("readonly", "");
            el.style.position = "absolute";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            var selected = document.getSelection().rangeCount > 0
                ? document.getSelection().getRangeAt(0)
                : false;
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            if (selected) {
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(selected);
            }
            this.showSnackBar(msg + " Copied to Clipboard");
        },
        isEmptyObject: function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        }
    },
    computed: {}
});
//# sourceMappingURL=main.js.map