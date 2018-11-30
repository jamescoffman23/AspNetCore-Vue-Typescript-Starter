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
import { Watch } from "vue-property-decorator";
import { EventNames } from "../Enums/eventNames";
import { LogLevel } from "../Enums/logLevel";
import { LogService } from "../Services/logService";
var PageLoading = (function (_super) {
    __extends(PageLoading, _super);
    function PageLoading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isLoading = false;
        return _this;
    }
    PageLoading.prototype.created = function () {
        var _this = this;
        this.$eventbus.$on(EventNames.SetPageLoading, function (show) { _this.setLoading(show); });
    };
    PageLoading.prototype.mounted = function () {
    };
    PageLoading.prototype.setLoading = function (show) {
        this.isLoading = show;
        LogService.log(LogLevel.Debug, "setloading called " + show, true);
    };
    PageLoading.prototype.onLoadingChanged = function (value, oldValue) {
        var pg = this.$root.$refs.page;
        if (pg) {
            if (value) {
                pg.classList.add("noScroll", "lock");
            }
            else {
                pg.classList.remove("noScroll", "lock");
            }
        }
    };
    __decorate([
        Watch("isLoading")
    ], PageLoading.prototype, "onLoadingChanged", null);
    PageLoading = __decorate([
        Component({
            name: "pageLoading",
            template: "\n            <div v-if=\"isLoading\" class=\"backdrop\" tabindex=\"-1\">\n                <div class=\"sk-wave\" tabindex=\"-1\" style=\"position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);\">\n                    <div class=\"sk-rect sk-rect1\" style=\"background-color: white;\"></div>\n                    <div class=\"sk-rect sk-rect2\" style=\"background-color: white;\"></div>\n                    <div class=\"sk-rect sk-rect3\" style=\"background-color: white;\"></div>\n                    <div class=\"sk-rect sk-rect4\" style=\"background-color: white;\"></div>\n                    <div class=\"sk-rect sk-rect5\" style=\"background-color: white;\"></div>\n                </div>\n            </div>\n    "
        })
    ], PageLoading);
    return PageLoading;
}(Vue));
export default PageLoading;
//# sourceMappingURL=pageLoading.js.map