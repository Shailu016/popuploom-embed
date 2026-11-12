// popuploom-embed — dependency-free mount helper.
// The popup is designed and hosted by PopupLoom; this module only inserts the
// mount element and loads the immutable runtime once.

export const RUNTIME_URL = "https://popuploom.com/embed/1.1.0/popuploom.js";
export const WIDGET_ID_PATTERN = /^wan_[A-Za-z0-9]{6,64}$/;

export function isWidgetId(value) {
  return typeof value === "string" && WIDGET_ID_PATTERN.test(value);
}

/**
 * Mount a PopupLoom widget.
 *
 * @param {string} widgetId Saved widget id, e.g. "wan_0123456789abcdef".
 * @param {{ target?: Element|Document, scriptSrc?: string, scriptId?: string }} [options]
 * @returns {() => void} Cleanup function that removes the element it created.
 */
export function mountPopup(widgetId, options = {}) {
  if (!isWidgetId(widgetId)) {
    throw new TypeError("widgetId must look like wan_0123456789abcdef");
  }
  if (typeof document === "undefined") {
    throw new Error("mountPopup requires a browser document");
  }

  const target = options.target || document;
  const scriptSrc = options.scriptSrc || RUNTIME_URL;
  const scriptId = options.scriptId || "popuploom-runtime";

  const existing = document.getElementById(scriptId);
  if (!existing) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = scriptSrc;
    script.defer = true;
    script.async = false;
    (document.head || document.documentElement).appendChild(script);
  }

  const mount = document.createElement("div");
  mount.setAttribute("data-popuploom", widgetId);
  (target.body || document.body).appendChild(mount);

  return () => {
    if (mount.parentNode) mount.parentNode.removeChild(mount);
  };
}

export default mountPopup;
