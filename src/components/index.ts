import Button from "./Button";
import DatePicker from "./DatePicker";
import Input from "./Input";
import List from "./List";
import Select from "./Select";
import Textarea from "./Textarea";

import { ComponentsConfig } from "../types/components";
import { Plugin } from "../types/core/types";

export const createComponents = (config?: ComponentsConfig): Plugin => {
  return {
    install: (app) => {
      if (config) {
        if (config.includes("Button")) Object.assign(app.components, { Button });
        if (config.includes("DatePicker")) Object.assign(app.components, { DatePicker });
        if (config.includes("Input")) Object.assign(app.components, { Input });
        if (config.includes("List")) Object.assign(app.components, { List });
        if (config.includes("Select")) Object.assign(app.components, { Select });
        if (config.includes("Textarea")) Object.assign(app.components, { Textarea });
      }
    },
  };
};
