import { writable } from "svelte/store";

interface Document {
  category: "note" | "highlight" | "rss" | "article";
  created_at: string;
  updated_at: string;
}

export const documents = writable<Document[]>(
  JSON.parse(localStorage.getItem("documents") || "[]"),
);

documents.subscribe(
  (value) => (localStorage.documents = JSON.stringify(value)),
);
