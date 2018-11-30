import Vue       from "vue";
import Component from "vue-class-component";

import { LogLevel }   from "../Enums/logLevel";
import { LogService } from "../Services/logService";

@Component({
  name: "errorPage",
})
export default class ErrorPage extends Vue {

  working:  boolean       = false;
  photos:   Array<object> = [{ src: "/images/errorImages/err_1.jpg" },
                             { src: "/images/errorImages/err_2.jpg" },
                             { src: "/images/errorImages/err_3.jpg" },
                             { src: "/images/errorImages/err_4.jpg" },
                             { src: "/images/errorImages/err_5.jpg" },
                             { src: "/images/errorImages/err_6.jpg" },
                             { src: "/images/errorImages/err_7.jpg" },
                             { src: "/images/errorImages/err_8.jpg" },
                             { src: "/images/errorImages/err_9.jpg" }];

  created(): void {
      LogService.log(LogLevel.Debug, "Error Page Created", true);
  }
};
