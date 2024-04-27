// docs: https://developer.mozilla.org/es/docs/Web/API/fetch

import asserts from "node:assert";

const response = await fetch("https://google.es");

asserts(response.status === 200);

const text = await response.text();

asserts(text.startsWith("<!doctype html>"));