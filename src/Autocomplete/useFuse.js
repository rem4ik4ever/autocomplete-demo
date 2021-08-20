import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

export function useFuse(searchTerm, items, options = {}) {
  const fuse = useRef();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    console.log("setting fuse");
    fuse.current = new Fuse(items, options);
  }, [items, options]);
  useEffect(() => {
    const items = fuse.current.search(searchTerm);
    console.log("search", items);
    setSuggestions(items.map(({ item }) => item));
  }, [searchTerm]);

  return suggestions;
}
