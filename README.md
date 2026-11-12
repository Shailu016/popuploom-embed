# popuploom-embed

Small, dependency-free helpers for adding a PopupLoom popup to a website. The popup itself is designed and hosted on [popuploom.com](https://popuploom.com/); this package only mounts the widget and loads the immutable runtime once.

## Install

```bash
npm install popuploom-embed
```

Or copy the file you need. There is no build step.

## Vanilla HTML

```html
<div data-popuploom="wan_your_widget_id"></div>
<script src="https://popuploom.com/embed/1.1.0/popuploom.js" defer></script>
```

## ESM helper

```js
import { mountPopup } from "popuploom-embed";

const unmount = mountPopup("wan_your_widget_id");
// later, if needed: unmount();
```

`mountPopup` validates the ID, appends the mount element to `document.body`, and injects the runtime script once even if several components call it.

## React

```jsx
import PopupLoom from "popuploom-embed/react";

export default function Layout() {
  return <PopupLoom widgetId="wan_your_widget_id" />;
}
```

## Vue

```vue
<script setup>
import PopupLoom from "popuploom-embed/vue";
</script>

<template>
  <PopupLoom widget-id="wan_your_widget_id" />
</template>
```

## Astro

```astro
---
import PopupLoom from "popuploom-embed/astro";
---
<PopupLoom widgetId="wan_your_widget_id" />
```

## What this package does not do

- It does not send data anywhere by itself. The mounted runtime fetches the saved popup configuration and records views and submissions according to the popup settings.
- It does not include an editor, account, analytics or email sending.
- It does not bypass the popup's own targeting and frequency rules.
- It does not read cart, order or customer data.

## Content Security Policy

The runtime is served from `https://popuploom.com`. Allow that origin in `script-src` and `connect-src`:

```http
Content-Security-Policy: script-src 'self' https://popuploom.com; connect-src 'self' https://popuploom.com
```

## Widget IDs

A widget ID looks like `wan_0123456789abcdef`. It is issued in the PopupLoom studio after you save a popup. Guest previews do not issue install code.

## License

MIT. The hosted runtime and the PopupLoom service are separate and governed by the site terms at https://popuploom.com/terms.html.
