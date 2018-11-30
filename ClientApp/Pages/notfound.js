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
var NotFoundPage = (function (_super) {
    __extends(NotFoundPage, _super);
    function NotFoundPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frustrationLevel = 0;
        return _this;
    }
    NotFoundPage.prototype.created = function () {
        LogService.log(LogLevel.Debug, "NotFound Page Created", false);
    };
    NotFoundPage.prototype.imFrustrated = function () {
        this.frustrationLevel++;
    };
    Object.defineProperty(NotFoundPage.prototype, "levelColor", {
        get: function () {
            var colorName = "green";
            if (this.frustrationLevel < 50) {
                colorName = "green";
            }
            else {
                if (this.frustrationLevel < 100) {
                    colorName = "blue";
                }
                else {
                    if (this.frustrationLevel < 150) {
                        colorName = "amber";
                    }
                    else {
                        colorName = "red";
                    }
                }
            }
            return colorName;
        },
        enumerable: true,
        configurable: true
    });
    NotFoundPage = __decorate([
        Component({
            name: "notFoundPage",
        })
    ], NotFoundPage);
    return NotFoundPage;
}(Vue));
export default NotFoundPage;
;
//# sourceMappingURL=notfound.js.map