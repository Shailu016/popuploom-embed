import { useEffect } from "react";
import { mountPopup, isWidgetId } from "../src/index.js";

/**
 * Mounts one PopupLoom popup for the lifetime of the component.
 * Renders no visible element of its own.
 */
export default function PopupLoom({ widgetId, scriptSrc }) {
  useEffect(() => {
    if (!isWidgetId(widgetId)) return undefined;
    return mountPopup(widgetId, { scriptSrc });
  }, [widgetId, scriptSrc]);

  return null;
}
