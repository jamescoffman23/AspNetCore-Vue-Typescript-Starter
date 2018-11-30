import { LogLevel } from "../Enums/logLevel";
import { LogService } from "../Services/logService";
export function logMethod(target, key, descriptor) {
    if (descriptor === undefined) {
        descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var a = args.map(function (a) { return JSON.stringify(a); }).join();
        var result = originalMethod.apply(this, args);
        var r = JSON.stringify(result);
        LogService.log(LogLevel.Info, "Call: " + key + "(" + a + ") => " + r, true);
        return result;
    };
    return descriptor;
}
//# sourceMappingURL=logMethod.js.map