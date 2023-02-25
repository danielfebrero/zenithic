export default {
  router: {
    routes: [],
  },
  store: {
    initialState: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
  },
  mixins: [
    "clickOutside",
    "draggable",
    "focus",
    "form",
  ],
  directives: [
    "bind",
    "cloak",
    "elseIf",
    "else",
    "for",
    "if",
    "model",
    "on",
    "once",
    "pre",
    "show",
    "tooltip",
  ],
  filters: [
    "capitalize",
    "currency",
    "date",
    "limitTo",
    "lowercase",
    "orderBy",
    "uppercase"
  ],
  components: [
    "Button",
    "DatePicker",
    "Input",
    "List",
    "Select",
    "Textarea",
  ],
  utils: [
    "ajax",
    "date",
    "dom",
    "index",
    "log",
    "number",
    "type",
    "url",
  ]
};