import { createVuetify } from "vuetify";
// import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { md3 } from "vuetify/blueprints";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    blueprint: md3,
    ssr: true,
  });

  nuxtApp.vueApp.use(vuetify);
});
