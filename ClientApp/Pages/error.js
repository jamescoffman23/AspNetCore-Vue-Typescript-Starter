var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Vue from "vue";
import Component from "vue-class-component";
import { LogLevel } from "../Enums/logLevel";
import { LogService } from "../Services/logService";
var ErrorPage = (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.working = false;
        _this.photos = [{ src: "/images/errorImages/err_1.jpg" },
            { src: "/images/errorImages/err_2.jpg" },
            { src: "/images/errorImages/err_3.jpg" },
            { src: "/images/errorImages/err_4.jpg" },
            { src: "/images/errorImages/err_5.jpg" },
            { src: "/images/errorImages/err_6.jpg" },
            { src: "/images/errorImages/err_7.jpg" },
            { src: "/images/errorImages/err_8.jpg" },
            { src: "/images/errorImages/err_9.jpg" }];
        return _this;
    }
    ErrorPage.prototype.created = function () {
        LogService.log(LogLevel.Debug, "Error Page Created", true);
    };
    ErrorPage = __decorate([
        Component({
            name: "errorPage",
        })
    ], ErrorPage);
    return ErrorPage;
}(Vue));
export default ErrorPage;
;
//# sourceMappingURL=error.js.map