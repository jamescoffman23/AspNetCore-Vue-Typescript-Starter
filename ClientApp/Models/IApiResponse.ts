import { IApiError }  from "./IApiError";

export interface IApiResponse {
    message?: string;
    errors?: IApiError[];
}