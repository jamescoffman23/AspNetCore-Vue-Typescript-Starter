import { IPagedResult }                      from "../Models/IPagedResult";
import { INotification }                     from "../Models/INotification";
import { IApiResponse }                      from "../Models/IApiResponse";

import { logMethod }  from "../Decorators/logMethod";
import { LogLevel }   from "../Enums/logLevel";
import { LogService } from "../Services/logService";

import axios  from "axios";
import moment from "moment";
import { JL } from "jsnlog";

declare var window: any;

export class DataService {

    private static getAntiforgeryToken(): string {

        JL().debug("Looking for antiforgery token ...");

        const token = (document.getElementsByName("__RequestVerificationToken") as NodeListOf<HTMLInputElement>)[0];

        if (token) {
            return token.value;
        }

        JL().debug("not found - antiforgery token ...");
        return "";
    };

    static http(): any {
        const instance = axios.create({
            baseURL: `${window.BaseUrl}api/`,
            //timeout: 10000,
            headers: {
                "X-XSRF-TOKEN": this.getAntiforgeryToken(),
                "X-Requested-With": "XMLHttpRequest",
            }
        });

        return instance;
    };

    private static logError(err: any, methodName: string): void {
        LogService.log(LogLevel.Error, `ERROR=========> in ${methodName} =========>`, true);

        if (err) {
            if (err.message) {
                LogService.log(LogLevel.Error, `Message:  ${err.message}`, true);
            }
            if (err.errors) {
                LogService.log(LogLevel.Error, `Errors:   ${err.errors}`, true);
            }
            if (err.response) {
                LogService.log(LogLevel.Error, `Response: ${err.reponse}`, true);
            }
            if (err.request) {
                LogService.log(LogLevel.Error, `Request:  ${err.request}`, true);
            }
        }

        LogService.log(LogLevel.Error, `==========================================>`, true);
    }

    //=============================================//
    //= examples                                  =//
    //=============================================//
    //basic get example
    //    @logMethod
    //    static getData(): Promise<IDataDto[]> {
    //
    //        const me = `${this.name}.getData`; //for logging
    //
    //        const apiMethodName = "lookup/data/here/"; //api path
    //
    //        return new Promise((resolve, reject) => {
    //
    //            this.http().get(apiMethodName).then((response: any) => {
    //
    //                const data = response.data as IDataDto[];
    //                resolve(data);
    //            },
    //            (err: any) => {
    //                this.logError(err, me);
    //                reject(err);
    //            });
    //        });
    //    }
    //paged data example
    //    @logMethod
    //    static getPagedData(parameters: IParameters): Promise<IPagedResult> {
    //
    //        const me = `${this.name}.getPagedData`; //for logging
    //
    //        const apiMethodName = "lookup/data/here/"; //api path
    //
    //        return new Promise((resolve, reject) => {
    //
    //            this.http().get(apiMethodName,
    //                {
    //                    params: {
    //                        searchValue: parameters.searchValue,
    //                        sortBy: parameters.sortyBy,
    //                        direction: parameters.direction,
    //                        page: parameters.page,
    //                        pageSize: parameters.pageSize
    //                    }
    //                }).then((response: any) => {
    //
    //                    const pagedData = response.data as IPagedResult;
    //                    resolve(pagedData);
    //                },
    //                (err: any) => {
    //                    this.logError(err, me);
    //                    reject(err);
    //                });
    //        });
    //    }
    //post object example
    //        @logMethod
    //        static addData(data: IDto): Promise<IDto> {
    //
    //            const me = `${this.name}.addData`; //for logging
    //
    //            const apiMethodName = "post/data/here/"; //api path
    //
    //            return new Promise((resolve, reject) => {
    //
    //                this.http().post(apiMethodName, data).then((response: any) => {
    //
    //                    const data = response.data as IDto;
    //                    resolve(data);
    //                },
    //                (err: any) => {
    //                    this.logError(err, me);
    //
    //                    let resp: IApiResponse = {};
    //
    //                    if (err.response) {
    //                        resp = err.response.data as IApiResponse;
    //                    }
    //
    //                    reject(resp);
    //                });
    //            });
    //        }
    //post formdata example
    //        @logMethod
    //        static postData(id: number): Promise<void> {
    //
    //            const me = `${this.name}.postData`; //for logging
    //
    //            const apiMethodName = "post/data/here/"; //api path
    //
    //            var formData = new FormData();
    //            formData.append("id", id.toString());
    //
    //            return new Promise((resolve, reject) => {
    //
    //                this.http().post(apiMethodName, formData).then((response: any) => {
    //                    resolve();
    //                },
    //                (err: any) => {
    //                    this.logError(err, me);
    //
    //                    let resp: IApiResponse = {};
    //
    //                    if (err.response) {
    //                        resp = err.response.data as IApiResponse;
    //                    }
    //
    //                    reject(resp);
    //                });
    //            });
    //        }

    }

export let dataService = new DataService();