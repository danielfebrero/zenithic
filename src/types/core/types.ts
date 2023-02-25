import { RouterConfig } from "../router";
import { StoreConfig } from "../store";

export type ZenithicApp = any;

export type Config = {
  router: RouterConfig;
  store: StoreConfig;
  mixins: null;
  directives: null;
  filters: null;
  components: null;
};

export type Plugin = {
  install: (app: ZenithicApp) => void;
}