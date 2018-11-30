import Vue             from "vue";
import Component       from "vue-class-component";
import { Prop }        from "vue-property-decorator";
import ServerErrors    from "./serverErrors";

@Component({
    name: "test-component",
    components: { ServerErrors },
    template: `
      <div>
        <h1>{{title}}</h1>
        <p>{{testdefaultprop}}</p>
        <server-errors></server-errors>
      </div>
    `,
})                          
export default class TestComponent extends Vue {

    @Prop({ default: "test" }) testdefaultprop!: string;
    @Prop(String)              title!:        string;

    created() {
    }

    //refs arent available until mounted
    mounted() {
        //console.log(this.$root.$refs);
    }
}