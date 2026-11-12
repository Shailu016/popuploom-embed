<script setup>
import { onMounted, onBeforeUnmount, watch } from "vue";
import { mountPopup, isWidgetId } from "../src/index.js";

const props = defineProps({
  widgetId: { type: String, required: true },
  scriptSrc: { type: String, default: undefined }
});

let cleanup;
function mount() {
  if (cleanup) cleanup();
  cleanup = undefined;
  if (isWidgetId(props.widgetId)) {
    cleanup = mountPopup(props.widgetId, { scriptSrc: props.scriptSrc });
  }
}

onMounted(mount);
onBeforeUnmount(() => {
  if (cleanup) cleanup();
  cleanup = undefined;
});
watch(() => [props.widgetId, props.scriptSrc], mount);
</script>

<template>
  <span hidden aria-hidden="true" data-popuploom-embed></span>
</template>
