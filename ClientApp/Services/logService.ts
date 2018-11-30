import { JL }       from "jsnlog";
import { LogLevel } from "../Enums/logLevel";

export class LogService {

    static log(level: LogLevel, msg: string, toConsole: boolean = false) {

        if (!msg) {
            console.log("No message passed to log.");
            return;
        }

        if (toConsole) {
            switch (level) {
            case LogLevel.Debug:
                console.debug(`${LogLevel[level]}: ${msg}`);
                break;
            case LogLevel.Info:
                console.info(`${LogLevel[level]}: ${msg}`);
                break;
            case LogLevel.Error:
                console.error(`${LogLevel[level]}: ${msg}`);
                break;
            case LogLevel.Warning:
                console.warn(`${LogLevel[level]}: ${msg}`);
                break;
            case LogLevel.Fatal:
                console.error(`${LogLevel[level]}: ${msg}`);
                break;
            default:
                console.log(`${LogLevel[level]}: ${msg}`);
            }
        }

        switch (level) {
        case LogLevel.Debug:
            JL().debug(msg);
            break;
        case LogLevel.Info:
            JL().info(msg);
            break;
        case LogLevel.Warning:
            JL().warn(msg);
            break;
        case LogLevel.Error:
            JL().error(msg);
            break;
        case LogLevel.Fatal:
            JL().fatal(msg);
            break;
        default:
            JL().trace(msg);
            break;
        }
    }
}

export let logService = new LogService();