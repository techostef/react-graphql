import HTMLReactParser from "html-react-parser";
import SanitizeHtml from "sanitize-html";
import { ICollection } from "../types/collections";

export function range(start: number, end: number) {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
}

export function safeHtml(text: string) {
  return HTMLReactParser(SanitizeHtml(text));
}

export function getCollectionsFromLocalstorage () {
  const collections: ICollection[] = localStorage.getItem("collections")
        ? JSON.parse(localStorage.getItem("collections")!)
        : [];
  return collections;
}

export function saveCollection(newLists: ICollection[]) {
  localStorage.setItem("collections", JSON.stringify(newLists));
}