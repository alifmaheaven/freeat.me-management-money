import methods from "./methods/index";
import computed from "./computed";
import watch from "./watch";
var mixin = {
  methods,
  computed,
  watch,
  data: function () {
    return {
      env: process.env.VUE_APP_URL_IMAGE_OR_FILE,
    };
  },
};

export default mixin;
