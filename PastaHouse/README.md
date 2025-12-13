# PastaHouse

This is the Vue 3 frontend for the PastaHouse e-commerce application.

## Recent Security Update
We've updated the backend to remove django-ckeditor due to security concerns with CKEditor 4.22.1. The product description fields have been changed from RichTextField to standard TextField.

### Changes Made:
1. No frontend changes were required as product descriptions are displayed as plain text
2. The API endpoints remain the same, only the field type has changed in the backend

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

## Project Structure
- `/src/assets` - Static assets like CSS files
- `/src/components` - Reusable Vue components
- `/src/layouts` - Page layouts (AuthLayout, MainLayout)
- `/src/router` - Vue Router configuration
- `/src/services` - API service layer
- `/src/stores` - Pinia state management
- `/src/views` - Page-level Vue components
- `/src/App.vue` - Root Vue component
- `/src/main.ts` - Application entry point