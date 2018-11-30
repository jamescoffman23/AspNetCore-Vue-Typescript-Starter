import Vue       from "vue";
import Component from "vue-class-component";

import { LogLevel }   from "../Enums/logLevel";
import { LogService } from "../Services/logService";

@Component({
    name: "unauthorizedPage",
})
export default class UnauthorizedPage extends Vue {

    created() {
      LogService.log(LogLevel.Debug, "Unauthorized Page Created", false);
    }
};