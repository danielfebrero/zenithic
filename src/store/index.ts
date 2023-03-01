import { prepareStore } from "./store";
import { createActions } from "./actions";
import { createGetters } from "./getters";
import { createMutations } from "./mutations";
import { createModules } from "./modules";
import { createState } from "./state";

import { StoreConfig } from "../types/store";
import { Plugin } from "../types/core";

/**
 * Creates a new store plugin based on the given configuration.
 *
 * @param config The configuration to use.
 */
export const createStore = (config?: StoreConfig): Plugin => {
  const store = prepareStore();
  const actions = createActions(config);
  const getters = createGetters(config);
  const mutations = createMutations(config);
  const modules = createModules(config);
  const state = createState(config);

  store.registerActions(actions);
  store.registerGetters(getters);
  store.registerMutations(mutations);
  store.registerModules(modules);
  store.registerState(state);

  return {
    install: (app) => (app["store"] = store),
  };
};
