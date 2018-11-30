
import Vue              from "vue";
import Component        from "vue-class-component";
import { Prop }         from "vue-property-decorator";
import { IApiResponse } from "../Models/IApiResponse";


@Component({
    name: "server-errors",
    template: `
        <v-flex xs12 class="red lighten-4">
            <table>
                <tbody>
                <tr>
                    <td style="width: 45px; vertical-align: middle;"><v-icon x-large color="red">info</v-icon></td>
                    <td style="vertical-align: middle;"><span class="font-weight-black font-italic headline">{{errors.message}}</span></td>
                </tr>
                <tr v-for="err in errors.errors">
                    <!-- <td>{{err.field}}</td> -->
                    <td colspan="2" >
                        <ul><li v-for="msg in err.messages">{{msg}}</li></ul>
                    </td>     
                </tr>
                </tbody>
            </table>
        </v-flex>
    `
})
export default class ServerErrors extends Vue {
    $refs: any;
    $root: any;

    @Prop(Object) errors!: IApiResponse;
}
