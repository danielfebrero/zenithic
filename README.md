# Zenithic
Zenithic is a lightweight, fast, and highly customizable JavaScript framework designed as an alternative to React and other existing competitors. It features a powerful virtual DOM rendering engine, an intuitive and easy-to-learn API, and a flexible and modular architecture that allows developers to use only the features they need.

One of the main advantages of Zenithic is its small size and minimal overhead, requiring only a fraction of the memory footprint of existing frameworks. This allows developers to create responsive and performant applications with minimal effort.

Zenithic also focuses on developer productivity, offering a powerful templating system and state management library that reduce the amount of code needed to implement a feature. Additionally, it provides a robust plugin system that allows developers to extend the framework with custom components and features.

The framework has a core library size of under 50KB and no dependencies, and it supports server-side rendering, as well as the latest versions of all major browsers.

## Features
- **Small size**: Core library size of under 50KB and no dependencies
- **Fast**: Powerful virtual DOM rendering engine for efficient updates
- **Customizable**: Flexible and modular architecture allows developers to use only the features they need
- **Productivity**: Powerful templating system and state management library that reduce the amount of code needed to implement a feature
- **Plugin system**: Robust plugin system that allows developers to extend the framework with custom components and features
- **Server-side rendering**: Supported
- **Browser support:** Latest versions of all major browsers

## Usage

To get started, install Zenithic using npm or yarn:

```bash
npm install zenithic
# or
yarn add zenithic
```

Then create a new application instance:

```js
import createZenithic from 'zenithic';

const app = createZenithic({
    // Application config
});
```

## Components
Components are the building blocks of Zenithic applications. They are reusable UI elements that can be combined to create complex interfaces. A component is defined as an object with properties that describe its behavior, data, and presentation.

### Component object properties

- `template`: A string that defines the component's markup. The template can contain placeholders for data properties that are defined in the data property. The placeholders are enclosed in double curly braces (e.g., {{ message }}).
- `props`: An object that defines the component's input properties. Props are similar to function parameters; they are used to pass data into the component. Each prop is defined as a key-value pair, where the key is the name of the prop and the value is an object that describes its type, default value, and other options.
- `data`: An object that defines the component's reactive data properties. Data properties are used to store and manipulate state within the component. Changes to data properties trigger a re-render of the component.
- `computed`: An object that defines the component's computed properties. Computed properties are derived from one or more data properties and are updated automatically when their dependencies change.
- `methods`: An object that defines the component's methods. Methods are used to perform actions or calculations within the component.
- `watch`: An object that defines the component's watchers. Watchers are used to perform an action when a data property changes. Watchers are defined as key-value pairs, where the key is the name of the property to watch and the value is a function that is executed when the property changes.
- `mounted`: A function that is executed when the component is mounted. Mounted is a lifecycle hook that is used to perform initialization tasks that require access to the DOM.
- `updated`: A function that is executed when the component is updated. Updated is a lifecycle hook that is used to perform tasks after the component has been re-rendered.
- `beforeDestroy`: A function that is executed before the component is destroyed. BeforeDestroy is a lifecycle hook that is used to perform cleanup tasks before the component is removed from the DOM.
- `destroyed`: A function that is executed when the component is destroyed. Destroyed is a lifecycle hook that is used to perform cleanup tasks after the component has been removed from the DOM.
- `mixins`: An array of objects that define mixins to be applied to the component. Mixins are reusable sets of component options that can be combined with other options to create a new component definition.

### Component Example
Here's an example of a simple component that displays a message:

```js
const HelloWorld = {
  template: '<div>{{ message }}</div>',
  data() {
    return {
      message: 'Hello, World!'
    }
  }
};
```

This component has a single data property (message) and a template that references it. When this component is rendered, it will display "Hello, World!".

### Usage

To use the Button component in another component, import it:

```js
import Button from './Button.js';
```

Then use it in the template:

```js
<Button @button-clicked="handleButtonClick" label="Click me!" />
```

And listen for the emitted event:

```js
export default {
    methods: {
        handleButtonClick(label) {
            // do something
        }
    }
};
```

## Filters
Filters are functions that can be used to transform data in a template. They are applied to an expression in double curly braces (e.g., {{ expression | filterName }}) and modify the data before it is displayed.

Zenithic comes with several built-in filters that can be used to format and manipulate data:

- capitalize: Capitalizes the first letter of a string.
- currency: Formats a number as currency using the specified currency code (e.g., USD, EUR).
- date: Formats a date using the specified format string (e.g., 'YYYY-MM-DD').
- limitTo: Limits an array to the specified number of items.
- lowercase: Converts a string to lowercase.
- orderBy: Orders an array by the specified property or function.
- uppercase: Converts a string to uppercase.

To use a filter, simply apply it to an expression in the template using the pipe character (|) followed by the filter name and any optional arguments. For example:

```html
<!-- Displays "Hello, World!" -->
<p>{{ message | capitalize }}</p>

<!-- Displays "$1,234.56" -->
<p>{{ price | currency('USD') }}</p>

<!-- Displays "2022-01-01" -->
<p>{{ date | date('YYYY-MM-DD') }}</p>

<!-- Displays the first 3 items in the array -->
<ul>
  <li v-for="item in items | limitTo(3)">{{ item }}</li>
</ul>

<!-- Displays "john doe" -->
<p>{{ name | lowercase }}</p>

<!-- Displays the array sorted by the 'name' property -->
<ul>
  <li v-for="item in items | orderBy('name')">{{ item.name }}</li>
</ul>

<!-- Displays "JOHN DOE" -->
<p>{{ name | uppercase }}</p>
```

You can also chain filters to apply multiple transformations to the same data:

```html
<!-- Displays the first 3 items in the array, sorted by the 'name' property -->
<ul>
  <li v-for="item in items | orderBy('name') | limitTo(3)">{{ item.name }}</li>
</ul>
```

To register a new filter with the framework, you can use the registerFilter function.
The name parameter is a string representing the name of the filter, and the filter parameter is a function that takes a value and returns the transformed value.

For example, the following code registers a new reverse filter that reverses a string:

```js
registerFilter('reverse', (value) => {
    return value.split('').reverse().join('');
});
```

This filter splits the input string into an array, reverses the array, and then joins the array back into a string.


## Mixins
Mixins are a way to share functionality between components without inheritance. A mixin is an object containing properties that can be merged with the properties of a component. The properties of a mixin are added to the component, and if there are conflicts, the properties of the component take precedence.

Here are some examples of mixins in Zenithic:

### clickOutside
The clickOutside mixin adds a click outside event to a component. This can be useful for components like modals, which should close when the user clicks outside of them.

```js
import { clickOutside } from 'zenithic';

const modal = {
  mixins: [clickOutside],

  mounted() {
    this.addClickOutsideEvent();
  },

  beforeDestroy() {
    this.removeClickOutsideEvent();
  },

  methods: {
    close() {
      this.$emit('close');
    },

    onClickOutside() {
      this.close();
    },
  },

  template: `
    <div>
      <div class="modal">
        <slot />
      </div>
    </div>
  `,
};
```

### draggable
The draggable mixin adds drag and drop functionality to a component. This can be useful for components like sliders or sortable lists.

```js
import { draggable } from 'zenithic';

const slider = {
  mixins: [draggable],

  data() {
    return {
      position: 0,
    };
  },

  methods: {
    onDragStart(event) {
      const thumb = event.target;
      const thumbRect = thumb.getBoundingClientRect();

      this.dragStartX = event.clientX;
      this.thumbStartX = thumbRect.left;
      this.thumbWidth = thumbRect.width;
    },

    onDrag(event) {
      const offset = event.clientX - this.dragStartX;
      const newPosition = this.thumbStartX + offset;
      const sliderRect = this.$el.getBoundingClientRect();
      const position = (newPosition - sliderRect.left) / sliderRect.width;

      this.position = Math.max(Math.min(position, 1), 0);
      this.$emit('input', this.position);
    },
  },

  template: `
    <div class="slider" @mousedown="startDrag">
      <div class="track">
        <div class="thumb" :style="{ left: position * 100 + '%' }" @mousedown.stop="startDrag" />
      </div>
    </div>
  `,
};
```

### form
The form mixin provides form validation and submission functionality to a component. This can be useful for components like login or registration forms.

```js
import { form } from 'zenithic';

const loginForm = {
  mixins: [form],

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    submit() {
      this.validate().then(() => {
        // Submit form data to server
      }).catch(() => {
        // Handle validation errors
      });
    },

    validate() {
      const rules = {
        email: { required: true, email: true },
        password: { required: true, minlength: 8 },
      };

      return this.runValidation(this.$data, rules);
    },
  },

  template: `
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email">
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
      </div>
    </form>
  `;
```

## Directives
Directives are special attributes that can be used to apply reactive behavior to an HTML element in Zenithic applications. They are prefixed with`v-` followed by the directive name. For example, `v-if`, `v-for`, `v-bind`, `v-on`, etc.

Directives enable developers to declaratively apply reactive behavior to elements in the DOM, which makes it easier to reason about the application's behavior and state. Directives can be used to manipulate DOM elements, listen to events, conditionally render content, and more.

### Common directives

#### v-bind
The `v-bind` directive is used to dynamically bind an attribute or property of an HTML element to an expression. This can be used to bind the `src` attribute of an `img` element to a dynamic value, bind the `class` attribute to a computed class name, or bind a custom attribute to a data property. The expression can be a JavaScript expression or a data property name enclosed in double curly braces.

```html
<img v-bind:src="imageSrc">

<div v-bind:class="{ active: isActive }"></div>

<input v-bind:custom-attribute="customValue">
```

#### v-model
The `v-model` directive is used to create two-way data bindings between form inputs and data properties. This means that changes to the input element will automatically update the data property, and changes to the data property will automatically update the input element. The input element must be one of `input`, `select`, or `textarea`.

```html
<input v-model="message">
```

### v-if, v-else-if, v-else
The `v-if` directive is used to conditionally render an element based on a condition. If the condition is true, the element will be rendered; otherwise, it will be removed from the DOM. The `v-else-if` and `v-else` directives can be used to chain multiple conditions together.

```html
<div v-if="isDisplayed">
  This is displayed if isDisplayed is true.
</div>

<div v-else-if="isLoading">
  This is displayed if isDisplayed is false and isLoading is true.
</div>

<div v-else>
  This is displayed if isDisplayed and isLoading are both false.
</div>
```

#### v-for
The `v-for` directive is used to render a list of items based on an array. The directive takes the form of `v-for="(item, index) in items"`, where item is the current `item` in the iteration, `index` is the index of the current item, and `items` is the array being iterated over. The directive can also take the form of `v-for="(value, key, index) in object"`, where `value` is the value of the current property, `key` is the key of the current property, and `index` is the index of the current property.

```html
<ul>
  <li v-for="(item, index) in items" :key="index">
    {{ item }}
  </li>
</ul>
```

#### v-on
The `v-on` directive is used to listen to DOM events and trigger methods or inline expressions. The directive takes the form of `v-on:event="method"` or `v-on:event="expression"`, where `event` is the name of the DOM event (e.g., click, input, submit, etc.), `method` is the name of the method to call when the event is triggered, and `expression` is a JavaScript expression that will be executed when the event is triggered.

```html
<button v-on:click="incrementCounter">Increment</button>
```

In the example above, we use the `v-on:click` directive to bind a click event listener to the button element. When the button is clicked, the `incrementCounter` method on the component instance will be executed.

You can also use shorthand syntax for `v-on` by prefixing the event name with the `@` symbol:

```html
<button @click="incrementCounter">Increment</button>
```

This is equivalent to the previous example.

You can pass arguments to the method using the special `$event` variable:

```html
<button v-on:click="logEvent($event)">Log Event</button>
```

### Registering a custom directive

```js
app.registerDirective('scroll', {
    mounted(el, binding) {
        window.addEventListener('scroll', () => {
            const { value } = binding;
            const { top } = el.getBoundingClientRect();
            const isVisible = top < window.innerHeight && top > 0;
            value(el, isVisible);
        });
    },
});
```
This directive adds an event listener to the window object that updates the isVisible data property of the component whenever the user scrolls the page.


```html
<div v-show="isVisible">Visible</div>
```

In this example, the `v-show` directive will show the div element only when the isVisible data property is true.

Other commonly used directives include `v-if`, `v-for`, `v-bind`, and `v-on`.

## Plugins

Plugins are a powerful feature of Zenithic that allow developers to extend the framework with custom functionality. Plugins can provide additional components, directives, filters, or services that are not included in the core framework.

### Creating a plugin
To create a plugin, you need to define an object that contains one or more of the following properties:

- `install`: A function that will be called when the plugin is installed. The function will receive the Zenithic application instance as its only argument. You can use this function to register new components, directives, filters, or services.
For example, here's how you could create a simple plugin that adds a new filter to format numbers as percentages:

```js
const percentageFilter = (value) => {
  if (typeof value !== 'number') {
    return value;
  }

  return `${Math.round(value * 100)}%`;
};

const percentagePlugin = {
  install: (app) => {
    Object.assign(app.filters, { 'percentage', percentageFilter })
  },
};

export default percentagePlugin;
```

This plugin adds a new percentage filter to the application instance. When the plugin is installed, the percentageFilter function is registered as a filter.

### Using a plugin
To use a plugin, you need to install it into your application instance using the `app.use` method:

```js
import createZenithic from 'zenithic';
import percentagePlugin from './percentagePlugin';

const app = createZenithic();

app.use(percentagePlugin);
```

This code installs the percentagePlugin into the application instance. When the plugin is installed, the percentage filter will be available to use in your templates.

### Sharing plugins
Plugins can be published to npm and shared with other developers. To make your plugin easy to use, it's a good idea to include a `README.md` file that explains how to install and use the plugin. You can also include a `demo` folder that demonstrates the plugin's functionality.

## Routing
To enable routing, use the `router` plugin:

```js
import router from 'zenithic/plugins/router';

app.use(router.createRouter());
```

Then define your routes:

```js
app.router.addRoutes([
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about',
        component: AboutPage
    }
]);
```

## Store (state management)

To enable state management, use the `store` plugin:

```js
import store from 'zenithic/plugins/store';

app.use(store.createStore());
```

Then define your state and mutations:

```js
app.store.state.myState = {
    count: 0
};

app.store.mutations.increment = (state) => {
    state.count++;
};
```

### Modules
To create modular state, you can use modules.

Create a module by defining its state and mutations

```js
const userModule = {
    state: {
        userName: ''
    },
    mutations: {
        setUserName (state, userName) {
            state.userName = userName
        }
    }
}
```

Then register your module to the store

```js
app.store.registerModule('user', userModule);
```

### Actions
Actions can be used to dispatch multiple mutations to the store.

Define an action

```js
app.store.actions.editUserName = ({ commit }, userName) => {
    commit('setUserName', userName);
};
```

Dispatch an action

```js
app.store.dispatch('editUserName', 'John Doe');
```

### Difference between actions and mutations
A mutation is a strategy for mutating the state of an application. Mutations are Synchronous functions that directly modify the state object. When a mutation is triggered, the mutation handler is executed and the new data is pushed to the store. 

An action is a strategy for modifying the state of an application. Unlike mutations, actions are Asynchronous functions that do not directly modify the state object. Actions can be used to perform more complex operations that require multiple steps such as making an API call, doing some business logic, or dispatching multiple mutations. When an action is triggered, the action handler is executed and the mutation handlers are dispatched to update the state.

### Retrieving data

Data can be retrieved from the store using getters.

Define a getter

```js
app.store.getters.userName = (state) => state.userName;
```

Retrieve the data

```js
app.store.get('userName'); // 'John Doe'
```

## Customizing the configuration

You can customize the configuration by passing options to the `createZenithic` method.

## Rendering

To render the application, use the `render` method:

```js
app.render();
```

## App example
App.js
```js
export default {
  template: `<div>{{ title }}</div>`,
  props: {
      title: {
          type: String,
          required: true
      }
};
```

config.js
```javascript
export default {
  plugins: [],
  directives: [],
  store: {
    state: {},
    actions: {},
    mutations: {},
    getters: {},
    modules: {}
  }
};
```

index.js
```javascript
import createZenithic, component from 'zenithic';

import App from './App';
import config from './config';

// Create application instance
const app = createZenithic(config);

// Register router plugin
app.use(router.createRouter());

// Register store plugin
app.use(store.createStore());

// Setup routes
app.router.addRoutes([
    {
        path: '/',
        component: App
    }
]);

// Setup state
app.store.state.count = 0;

// Setup mutations
app.store.mutations.increment = (state) => {
    state.count++;
};

// Mount and render
app.mount('#app', App, { title: 'Hello World' });
```

package.json
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "zenithic": "^1.0.0"
  }
}
```