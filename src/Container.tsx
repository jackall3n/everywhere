import { useState } from "react";
import reactLogo from "./assets/react.svg";
import qs from "query-string";

console.log();

export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it to expire in 7 days
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function initialise() {
  const processed = [];

  const url = new URL(window.location.href);
  const params = Array.from(url.searchParams.entries());

  try {
    for (const [key, value] of params) {
      const [prefix, type, name] = key.split(":");

      if (key === "__everywhere") {
        const parsed = JSON.parse(atob(value));

        for (const [name, config] of Object.entries(
          parsed.cookies ?? {}
        ) as any) {
          console.log(name, config);

          setCookie(name, config.value);
        }

        processed.push(key);

        continue;
      }

      if (prefix !== "__everywhere") {
        continue;
      }

      if (type === "cookie") {
        setCookie(name, value);

        processed.push(key);
      }
    }
  } catch (e) {
    console.error(e);
  }

  if (processed.length) {
    processed.forEach((param) => url.searchParams.delete(param));

    console.log(processed, url.searchParams.toString());

    window.location.search = url.searchParams.toString();

    console.log(params);
  }
}

initialise();

function Container() {
  return <div></div>;
}

export default Container;
