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
import { Prop } from "vue-property-decorator";
var ServerErrors = (function (_super) {
    __extends(ServerErrors, _super);
    function ServerErrors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Prop(Object)
    ], ServerErrors.prototype, "errors", void 0);
    ServerErrors = __decorate([
        Component({
            name: "server-errors",
            template: "\n        <v-flex xs12 class=\"red lighten-4\">\n            <table>\n                <tbody>\n                <tr>\n                    <td style=\"width: 45px; vertical-align: middle;\"><v-icon x-large color=\"red\">info</v-icon></td>\n                    <td style=\"vertical-align: middle;\"><span class=\"font-weight-black font-italic headline\">{{errors.message}}</span></td>\n                </tr>\n                <tr v-for=\"err in errors.errors\">\n                    <!-- <td>{{err.field}}</td> -->\n                    <td colspan=\"2\" >\n                        <ul><li v-for=\"msg in err.messages\">{{msg}}</li></ul>\n                    </td>     \n                </tr>\n                </tbody>\n            </table>\n        </v-flex>\n    "
        })
    ], ServerErrors);
    return ServerErrors;
}(Vue));
export default ServerErrors;
//# sourceMappingURL=serverErrors.js.map