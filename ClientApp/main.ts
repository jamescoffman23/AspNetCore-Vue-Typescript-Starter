import Vue          from "vue";
import Vuetify      from "vuetify";
import VeeValidate  from "vee-validate";
import VueChartkick from "vue-chartkick";
import Chart        from "chart.js";
import { JL }       from "jsnlog";
import moment       from "moment";
import { List }     from "linqts";

//import VueInputMask from "vue-inputmask";
const VueInputMask = require("vue-inputmask").default;

import { LogLevel }     from "./Enums/logLevel";
import { DataService }  from "./Services/dataService";
import { LogService }   from "./Services/logService";
import { UtilsService } from "./Services/utilsService";

declare var window:   any;
declare var document: any;

Vue.use(Vuetify);
Vue.use(VeeValidate, { inject: false });
Vue.use(VueChartkick, { adapter: Chart });
Vue.use(VueInputMask);

Vue.config.productionTip = false;
Vue.config.errorHandler  = (err, vm, info) => {
    LogService.log(LogLevel.Error, "*********VUE Error Handler ********", true);

    if (err) {
        LogService.log(LogLevel.Error, `err: ${err}`, true);
    }
    if (vm) {
        LogService.log(LogLevel.Error, `vm: ${vm}`, true);
    }
    if (info) {
        LogService.log(LogLevel.Error, `info: ${info}`, true);
    }
}

JL.setOptions({ "defaultAjaxUrl": window.BaseUrl + "jsnlog.logger" });

//const nullable = <T>(a: T) => a as T | null; //todo how to create a nullable object

//utils
import { ISnackbarMessage }    from "./Models/ISnackBarMessage";
import { IPageAlert }          from "./Models/IPageAlert";
import { EventNames }          from "./Enums/eventNames";
import { ITableHeader }        from "./Models/ITableHeader";

//page components
import HomeIndexPage         from "./Pages/home.index";
import MustAcknowledgePage   from "./Pages/mustAcknowledge";
import ErrorPage             from "./Pages/error";
import NotFoundPage          from "./Pages/notfound";
import UnauthorizedPage      from "./Pages/unauthorized";

//custom components
import PageLoading  from "./Components/pageLoading";

import EventBus from "./Services/eventBus";
Vue.use(EventBus);

Vue.filter("unknown", (input: any) => {
    if (input) {
        return input;
    }

    return "Unknown";
});
Vue.filter("moment", (...args: any[]) => {
    //args = [0] input date, [1] dest format
    //     = [0] input date:string, [1] input format, [2] dest format

    args = Array.prototype.slice.call(args);
    let date: any;
    let format: string;

    const input = args.shift();

    if (!input) {
        return input;
    }

    if (args.length > 1 && (typeof input === "string")) {
        //string input, format of input, strict match
        date = moment(input, args[0], true);
        format = args[1];
    } else {
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


const vm = new Vue({
    el: "#app-root",
    components: {
        MustAcknowledgePage,
        HomeIndexPage,
        ErrorPage,
        NotFoundPage,
        UnauthorizedPage,
        PageLoading,
    },
    directives: {
        focus: {
            inserted(el: HTMLElement) {
                el.focus();
            }
        }
    },
    data: {
        navDrawer: null,
        pageAlert: {
            show:         false as boolean,
            alertTitle:   ""    as string,
            alertMessage: ""    as string,
        } as IPageAlert,
        snackBar: {
            show:    false as boolean,
            message: ""    as string,
            timeout: 6000  as number,
            y:       "bottom" as string,
            x:       "center" as string,
            mode:    ""       as string
        } as ISnackbarMessage,
        recentHeaders: [] as ITableHeader[],
        recentLimit: 10 as number,
    },
    created() {
        LogService.log(LogLevel.Debug, "App Root Created", true);
        this.recentHeaders = [{ text: "", value: "", sortable: false },
                              { text: "Complaint", value: "complaintId", sortable: true },
                              { text: "Date Accessed", value: "dateAccessed", sortable: true }];
    },
    mounted() {
        LogService.log(LogLevel.Debug, "App Root Mounted", true);
    },
    methods: {
        showSnackBar(msg: string): void {
            this.snackBar.message = msg;
            this.snackBar.show = true;
        },
        showPageAlert(title: string, msg: string): void {
            this.pageAlert.alertTitle = title;
            this.pageAlert.alertMessage = msg;
            this.pageAlert.show = true;
        },
        showPageLoading(show: boolean): void {
           this.$eventbus.$emit(EventNames.SetPageLoading, show);
        },
        redirect(url: string, id: string, newWindow: boolean = false) {
            if (newWindow) {
                window.open(`${url}?id=${id}`, "_blank");
            } else {
                window.location.assign(`${url}?id=${id}`);
            }
        },
        copyToClipboard(msg: string): void {
            const el = document.createElement("textarea");  // Create a <textarea> element
            el.value = msg || "";                                 // Set its value to the string that you want copied
            el.setAttribute("readonly", "");                // Make it readonly to be tamper-proof
            el.style.position = "absolute";
            el.style.left = "-9999px";                      // Move outside the screen to make it invisible
            document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
            const selected =
                document.getSelection().rangeCount > 0        // Check if there is any content selected previously
                    ? document.getSelection().getRangeAt(0)     // Store selection if found
                    : false;                                    // Mark as false to know no selection existed before
            el.select();                                    // Select the <textarea> content
            document.execCommand("copy");                   // Copy - only works as a result of a user action (e.g. click events)
            document.body.removeChild(el);                  // Remove the <textarea> element
            if (selected) {                                 // If a selection existed before copying
                document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
                document.getSelection().addRange(selected);   // Restore the original selection
            }

            this.showSnackBar(`${msg} Copied to Clipboard`);
        },
        isEmptyObject(obj: object): boolean {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        }
    },
    computed: {
    }
});