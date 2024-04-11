import { writable } from "svelte/store";

export const apiKey = writable(localStorage.apiKey || "");

apiKey.subscribe((value) => (localStorage.apiKey = value));
