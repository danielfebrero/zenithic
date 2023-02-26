// THIS FILE IS A BIG WORK IN PROGRESS
// THERE IS STILL A LOT TO DO FOR COMPILING TO AST AND GENERATE VDOM WHILE IMPLEMENTING
// DIRECTIVES, FILTERS, MIXINS, AND OTHER CAPABILITIES
// NONE OF THOSE FUNCIONS ARE DEFINITIVE, COMPLETE, SECURE OR WORKING

import { querySelector } from "./utils/dom";

import { Component, Props, CompiledComponent } from "./types/components";
import { Plugin, ZenithicApp } from "./types/core";
import { Directive } from "./types/directives";
import { Filter } from "./types/filters";

const parseDirectives = (
  template: string
): { [directive: string]: (...args: any[]) => any } => {
  const directiveRegex = /v-(\w+):?([a-zA-Z]*)="(.*?)"/g; // Expression régulière pour identifier les directives
  let match = directiveRegex.exec(template);
  const directives = {};
  while (match !== null) {
    const [, name, arg, value] = match;
    directives[name] = { arg, value };
    match = directiveRegex.exec(template);
  }
  return directives;
};

// This function adds a watcher to a reactive object.
const watch = (
  obj: { [key: string]: any },
  key: string,
  handler: (newValue: any, oldvalue: any) => void
) => {
  Object.defineProperty(obj, key, {
    get() {
      this._key;
    },
    set(newValue) {
      handler(newValue, this._key);
      this._key = newValue;
    },
  });
};

// This function removes all watchers from a reactive object.
const unwatch = (obj: { [key: string]: any }) => {
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(obj, key, {
      get() {
        this._key;
      },
      set(nv) {
        this._key = nv;
      },
    });
  });
};

// This function defines a computed property on an object.
const defineComputed = (
  obj: { [key: string]: any },
  key: string,
  getter: () => any
) => {
  Object.defineProperty(obj, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });
};

const prepareComponent = (comp: Component) => {
  const component: Component = Object.assign(comp, {
    data: () => {
      // const reactiveData = reactive(data);
      const reactiveData = component.data;
      component.mixins.forEach((mixin) => {
        if (mixin.data) {
          Object.assign(reactiveData, mixin.data());
        }
      });
      return reactiveData;
    },
  });

  component.mixins.forEach((mixin) => {
    if (mixin.computed) {
      Object.keys(mixin.computed).forEach((key) => {
        defineComputed(component.computed, key, mixin.computed[key]);
      });
    }
    if (mixin.methods) {
      Object.keys(mixin.methods).forEach((key) => {
        component.methods[key] = mixin.methods[key];
      });
    }
    if (mixin.watch) {
      Object.keys(mixin.watch).forEach((key) => {
        const handler = mixin.watch[key];
        watch(component.data(), key, (newValue, oldValue) => {
          handler.call(component, newValue, oldValue);
        });
      });
    }
  });

  return component;
};

const compileComponent = (component: Component): CompiledComponent => {
  // Define the component object
  const preparedComponent = prepareComponent(component);

  // Define the component template
  const template = component.template;

  // Create the component constructor
  const ComponentConstructor = (obj: Component) => {};

  ComponentConstructor.prototype = {
    constructor(obj: Component) {
      Object.assign(this, obj);
      // TODO
      // Set the context for the component
      // obj.setContext.call(this);

      // TODO
      // Set up the reactive data
      // this.$data = reactive(obj.data);

      // Set up the computed properties
      for (const key in this.computed) {
        const getter = this.computed[key].bind(this);
        defineComputed(this, key, getter);
      }

      // Set up the methods
      for (const key in obj.methods) {
        this[key] = obj.methods[key].bind(this);
      }

      // Set up the watchers
      for (const key in obj.watch) {
        const handler = obj.watch[key].bind(this);
        watch(this.data, key, handler);
      }

      // TODO
      // Mounted / rendered lifecyle
      // Call the mounted hook
      // obj.mounted.call(this);
    },
    $destroy: function () {
      // Call the beforeDestroy hook
      this.beforeDestroy.call(this);

      // Destroy the component
      unwatch(this.data);
      delete this.data;
      Object.setPrototypeOf(this, null);

      // Call the destroyed hook
      this.destroyed.call(this);
    },
  };

  // Define the render function
  // const vdom = parseComponent(component);

  // Add the render function to the component prototype
  ComponentConstructor.prototype.render = () => {
    return "<div>Hello noob</div>";
    // return vdom();
  };

  // Return the component constructor
  return new ComponentConstructor(preparedComponent);
};

const fillFragmentOrElement = (
  el: DocumentFragment | Element,
  parent: DocumentFragment | Element
) => {
  if (el) {
    const childNodes = parent.childNodes;
    while (childNodes.length > 0) parent.removeChild(childNodes[0]);
    parent.appendChild(el);
  }
};

const createApp = (): ZenithicApp => {
  const app: ZenithicApp = {
    el: null,
    main: null,
    router: null,
    store: null,
    mixins: null,
    directives: null,
    filters: null,
    components: null,
    utils: null,
    use(plugin: Plugin) {
      if (plugin.install) {
        plugin.install(this);
      }
    },
    mount(selector: string, component: Component, props: Props) {
      const mountPoint = window.document.querySelector(selector);

      if (mountPoint) {
        // TODO
        // if (comp.setContext) {
        //   comp.setContext(el, comp);
        // }

        // assign mounted properties to computed data
        Object.assign(component, { computed: props });

        // create empty document and assign it to app object
        const fragment = document.createDocumentFragment();
        this.el = fragment;

        // compile component, render it, and fill the fragment with the result
        const compiledComponent = compileComponent(component);
        const node = compiledComponent.render();
        fillFragmentOrElement(node, fragment);
        fillFragmentOrElement(fragment, querySelector(selector));
      }
    },
    unmount() {
      (this as ZenithicApp).el.parentNode.removeChild(this.el);
    },
    registerComponent(name: string, component: Component) {
      Object.assign((this as ZenithicApp).components, { [name]: component });
    },
    getComponent(name: string) {
      return (this as ZenithicApp).components[name];
    },
    registerDirective(name: string, directive: Directive) {
      Object.assign((this as ZenithicApp).directives, { [name]: directive });
    },
    registerFilter(name: string, filter: Filter) {
      Object.assign((this as ZenithicApp).filters, { [name]: filter });
    },
  };

  return app;
};

export { createApp };

// const parse = (template, options = {}) => {
//   const { delimiters = ["{{", "}}"], state = {} } = options;

//   // Use the DOMParser API to parse the HTML template string
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(template, "text/html");

//   // Create an empty virtual DOM object
//   const vdom = {};

//   // Set the tag name of the root element
//   vdom.tagName = doc.body.firstChild.tagName.toLowerCase();

//   // Set the attributes of the root element
//   vdom.attrs = {};
//   const attrList = doc.body.firstChild.attributes;
//   for (let i = 0; i < attrList.length; i++) {
//     const attr = attrList[i];
//     vdom.attrs[attr.name] = attr.value;
//   }

//   // Recursively parse child nodes and append them to the root vdom object
//   vdom.children = [];
//   const childNodes = doc.body.firstChild.childNodes;
//   for (let i = 0; i < childNodes.length; i++) {
//     const childNode = childNodes[i];
//     if (childNode.nodeType === Node.ELEMENT_NODE) {
//       vdom.children.push(parseNode(childNode));
//     } else if (childNode.nodeType === Node.TEXT_NODE) {
//       vdom.children.push(childNode.textContent.trim());
//     }
//   }

//   // Return the final vdom object
//   return vdom;
// };

// const parseNode = (node) => {
//   // Create a new vdom object for the node
//   const vdom = {};

//   // Set the tag name of the node
//   vdom.tagName = node.tagName.toLowerCase();

//   // Set the attributes of the node
//   vdom.attrs = {};
//   const attrList = node.attributes;
//   for (let i = 0; i < attrList.length; i++) {
//     const attr = attrList[i];
//     vdom.attrs[attr.name] = attr.value;
//   }

//   // Recursively parse child nodes and append them to the vdom object
//   vdom.children = [];
//   const childNodes = node.childNodes;
//   for (let i = 0; i < childNodes.length; i++) {
//     const childNode = childNodes[i];
//     if (childNode.nodeType === Node.ELEMENT_NODE) {
//       vdom.children.push(parseNode(childNode));
//     } else if (childNode.nodeType === Node.TEXT_NODE) {
//       vdom.children.push(childNode.textContent.trim());
//     }
//   }

//   // Return the final vdom object for the node
//   return vdom;
// };

// const buildVdom = (templateString, options = {}) => {
//   const ast = parse(templateString.trim(), options);

//   const genProps = (attrs) => {
//     if (!attrs.length) {
//       return "null";
//     }

//     let props = "";
//     attrs.forEach((attr, i) => {
//       props += `${i !== 0 ? "," : ""}${JSON.stringify(attr.name)}:${
//         attr.value ? JSON.stringify(attr.value) : "true"
//       }`;
//     });
//     return `{${props}}`;
//   };

//   const gen = (node) => {
//     if (node.type === 1) {
//       // element node
//       return genElement(node);
//     } else if (node.type === 2) {
//       // expression node
//       return `_s(${node.expression})`;
//     } else {
//       // text node
//       return JSON.stringify(node.text);
//     }
//   };

//   const genElement = (node) => {
//     const children = genChildren(node);
//     const props = genProps(node.attrs);
//     return `_c("${node.tag}",${props ? props + "," : ""}${children})`;
//   };

//   const genChildren = (node) => {
//     const children = node.children;
//     if (children.length) {
//       return `[${children.map((c) => gen(c)).join(",")}]`;
//     }
//     return "undefined";
//   };

//   const code = genElement(ast);
//   return new Function(`with(this){return ${code}}`);
// };

// const parseComponent = (component) => {
//   const { template, data, computed, methods, props } = component;
//   const state = { ...data(), ...computed, ...props, methods };
//   const directives = parseDirectives(template);

//   // Parse template string and create virtual DOM tree
//   const vdom = buildVdom(template, { state, directives });

//   return vdom;
// };

// This function returns a reactive object that tracks changes to its properties.
// const reactive = (obj) => {
//   const observed = new Proxy(obj, {
//     set(target, key, value) {
//       const result = Reflect.set(target, key, value);
//       // trigger update
//       return result;
//     },
//   });
//   return observed;
// };