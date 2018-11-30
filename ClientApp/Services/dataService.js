import { LogLevel } from "../Enums/logLevel";
import { LogService } from "../Services/logService";
import axios from "axios";
import { JL } from "jsnlog";
var DataService = (function () {
    function DataService() {
    }
    DataService.getAntiforgeryToken = function () {
        JL().debug("Looking for antiforgery token ...");
        var token = document.getElementsByName("__RequestVerificationToken")[0];
        if (token) {
            return token.value;
        }
        JL().debug("not found - antiforgery token ...");
        return "";
    };
    ;
    DataService.http = function () {
        var instance = axios.create({
            baseURL: window.BaseUrl + "api/",
            headers: {
                "X-XSRF-TOKEN": this.getAntiforgeryToken(),
                "X-Requested-With": "XMLHttpRequest",
            }
        });
        return instance;
    };
    ;
    DataService.logError = function (err, methodName) {
        LogService.log(LogLevel.Error, "ERROR=========> in " + methodName + " =========>", true);
        if (err) {
            if (err.message) {
                LogService.log(LogLevel.Error, "Message:  " + err.message, true);
            }
            if (err.errors) {
                LogService.log(LogLevel.Error, "Errors:   " + err.errors, true);
            }
            if (err.response) {
                LogService.log(LogLevel.Error, "Response: " + err.reponse, true);
            }
            if (err.request) {
                LogService.log(LogLevel.Error, "Request:  " + err.request, true);
            }
        }
        LogService.log(LogLevel.Error, "==========================================>", true);
    };
    return DataService;
}());
export { DataService };
export var dataService = new DataService();
//# sourceMappingURL=dataService.js.map