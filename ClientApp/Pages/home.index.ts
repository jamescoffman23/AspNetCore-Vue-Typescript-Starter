import Vue                     from "vue";
import Component               from "vue-class-component";
import { LogLevel }            from "../Enums/logLevel";
import { LogService }          from "../Services/logService";
import TestComponent           from "../Components/testComponent";


@Component({
    name: "homeIndexPage",
    components: { TestComponent }
})
export default class HomeIndexPage extends Vue {
    $root: any;
    
    loading:         boolean = false;

    created(): void {
        LogService.log(LogLevel.Debug, "Home Page Created", true);
        //this.$root.showSnackBar("test bar");
        //this.$root.showPageAlert("test bar"," test mes");

        //this.$root.showPageLoading(true);
        //thing to do here
        //setTimeout(() => this.$root.showPageLoading(false), 2500);
    }
    async mounted() {
        const self = this;
        LogService.log(LogLevel.Debug, "Home Page Mounted", true);

        self.loading = true;

        self.loading = false;

    }
};
