
import Vue            from "vue";
import Component      from "vue-class-component";
import { LogLevel }   from "../Enums/logLevel";
import { LogService } from "../Services/logService";

@Component({
    name: "notFoundPage",
})
export default class NotFoundPage extends Vue {
    frustrationLevel: number = 0;

    created() {
        LogService.log(LogLevel.Debug, "NotFound Page Created", false);
    }

    imFrustrated(): void {
        this.frustrationLevel++;
    }

    get levelColor(): string {

        let colorName: string = "green";

        if (this.frustrationLevel < 50) {
            colorName = "green";
        } else {
            if (this.frustrationLevel < 100) {
                colorName = "blue";
            } else {
                if (this.frustrationLevel < 150) {
                    colorName = "amber";
                } else {
                    colorName = "red";
                }
            }
        }
        return colorName;
    }
};