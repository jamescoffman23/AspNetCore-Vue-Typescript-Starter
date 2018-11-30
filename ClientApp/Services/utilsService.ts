

export class UtilsService {

    static sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) };

    static parseWithDate(jsonString: string): any {
        var reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
        const resultObject = JSON.parse(jsonString, (key: any, value: any) => {
            if (typeof value === "string" && (reDateDetect.exec(value))) {
                return new Date(value);
            }
            return value;
        });
        return resultObject;
    };
}

export let utilsService = new UtilsService();