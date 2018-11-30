
import Vue            from "vue";
import Component      from "vue-class-component";
import { Watch }      from "vue-property-decorator";
import { EventNames } from "../Enums/eventNames";
import { LogLevel }   from "../Enums/logLevel";
import { LogService } from "../Services/logService";

@Component({
    name: "pageLoading",
    template: `
            <div v-if="isLoading" class="backdrop" tabindex="-1">
                <div class="sk-wave" tabindex="-1" style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%);">
                    <div class="sk-rect sk-rect1" style="background-color: white;"></div>
                    <div class="sk-rect sk-rect2" style="background-color: white;"></div>
                    <div class="sk-rect sk-rect3" style="background-color: white;"></div>
                    <div class="sk-rect sk-rect4" style="background-color: white;"></div>
                    <div class="sk-rect sk-rect5" style="background-color: white;"></div>
                </div>
            </div>
    `
})
export default class PageLoading extends Vue {
    isLoading: boolean = false;
    $eventbus: any;
    $refs: any;
    $root: any;
    created() {
        this.$eventbus.$on(EventNames.SetPageLoading, (show: boolean) => { this.setLoading(show); });
    }

    //refs arent available until mounted
    mounted() {
        //console.log(this.$root.$refs);
    }

    setLoading(show: boolean) {
        this.isLoading = show;
        LogService.log(LogLevel.Debug, `setloading called ${show}`, true);
    }

    @Watch("isLoading")
    onLoadingChanged(value: boolean, oldValue: boolean) {
        const pg = this.$root.$refs.page as HTMLElement;
        if (pg) {
            if (value) {
                pg.classList.add("noScroll", "lock");
            } else {
                pg.classList.remove("noScroll", "lock");
            }
        }
    }
}
