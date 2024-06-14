import { useEffect, useState, useCallback } from "react";
import { useSuggestionStore } from "../store/useSuggestion";
import { useTagStore } from "../store/useTag";
import { SuggestionInterface } from "../interfaces/suggestion";
import { TagInterface } from "../interfaces/tag";

export const useTagsData = () => {
  const { suggestion } = useSuggestionStore();
  const { tags, addTag, removeTag } = useTagStore();
  const [filteredSuggestions, setFilteredSuggestion] = useState<SuggestionInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [operators, setOperators] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (suggestion) {
      setFilteredSuggestion(
        suggestion.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, suggestion]);

  const handleAddTag = useCallback((itemTitle: TagInterface) => {
    addTag(itemTitle);
    setSearchQuery("");
    setErrorMessage(null);
  }, [addTag]);

  const handleMainInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchQuery(text);
    setErrorMessage(null);

    if (tags.length > operators.length && text.length === 0) {
      setOperators(prev => prev.slice(0, -1));
    }
  }, [tags.length, operators.length]);

  const handleBackspace = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchQuery.length === 0) {
      if (tags.length) {
        if (tags.length === operators.length) {
          setOperators(prev => prev.slice(0, -1));
        } else {
          removeTag(tags.length - 1);
        }
      }
    }
    if (e.key === "Enter" && tags.length > operators.length && /^[+\-*/^()]*$/.test(searchQuery)) {
      setOperators(prev => [...prev, searchQuery]);
      setSearchQuery("");
      setErrorMessage(null);
    }
  }, [searchQuery, tags.length, operators.length, removeTag]);

  const handleResult = useCallback(() => {
    setErrorMessage(null);
    let expression = tags.map((tag, i) => tag.value + (operators[i] || "")).join("");

    if (/[(+\-*^/]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }

    try {
      setResult(eval(expression.replace("^", "**")));
    } catch {
      setErrorMessage("Error, check your expression!");
    }
  }, [tags, operators]);

  return {
    filteredSuggestions,
    result,
    errorMessage,
    handleAddTag,
    handleMainInput,
    handleBackspace,
    handleResult,
    searchQuery,
    tags,
    operators,
  };
};
