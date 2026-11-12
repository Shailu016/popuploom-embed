import { test } from "node:test";
import assert from "node:assert/strict";
import { isWidgetId, mountPopup, WIDGET_ID_PATTERN } from "../src/index.js";

test("accepts real widget id shapes", () => {
  assert.equal(isWidgetId("wan_0123456789abcdef"), true);
  assert.equal(isWidgetId("wan_ABCDEF123456"), true);
  assert.equal(WIDGET_ID_PATTERN.test("wan_0123456789abcdef"), true);
});

test("rejects injection-shaped ids", () => {
  for (const value of [
    "",
    "wan_",
    "wan_short",
    "wan_0123<script>",
    "https://evil.example/wan_0123456789",
    "wan_0123456789abcdef\" onload=\"alert(1)",
    null,
    42
  ]) {
    assert.equal(isWidgetId(value), false, String(value));
  }
});

test("mountPopup explains the missing-browser case", () => {
  assert.throws(() => mountPopup("wan_0123456789abcdef"), /browser document/);
});

test("mountPopup rejects an invalid id before touching the DOM", () => {
  assert.throws(() => mountPopup("not-a-widget"), /wan_/);
});
