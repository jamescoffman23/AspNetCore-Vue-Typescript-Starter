var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
    ;
    UtilsService.parseWithDate = function (jsonString) {
        var reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
        var resultObject = JSON.parse(jsonString, function (key, value) {
            if (typeof value === "string" && (reDateDetect.exec(value))) {
                return new Date(value);
            }
            return value;
        });
        return resultObject;
    };
    ;
    return UtilsService;
}());
export { UtilsService };
export var utilsService = new UtilsService();
//# sourceMappingURL=utilsService.js.map