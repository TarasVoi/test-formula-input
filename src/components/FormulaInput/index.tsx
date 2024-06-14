import { useMemo } from "react";
import { TagsList } from "../TagsList";
import { SuggestionsList } from "../SuggestionsList";
import { useTagsData } from "../../hooks/useTagsData";
import Button from "../Button";

export const FormulaInput = () => {
  const {
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
  } = useTagsData();

  const renderSuggestion = useMemo(() => {
    return (
      searchQuery.length > 0 &&
      filteredSuggestions.length > 0 &&
      tags.length === operators.length
    );
  }, [searchQuery, filteredSuggestions, tags, operators]);

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="w-[80%] space-y-[1rem]">
        <div className="w-full flex">
          <div className="grow flex flex-wrap items-center bg-zinc-100 border p-2 relative">
            <TagsList operators={operators} />
            <input
              autoFocus
              placeholder={
                tags.length === operators.length
                  ? "Enter Tag"
                  : "Enter Math Operator"
              }
              className="grow bg-transparent rounded-lg py-2 px-4 outline-none"
              value={searchQuery}
              onChange={handleMainInput}
              onKeyDown={handleBackspace}
            />
            {renderSuggestion && (
              <SuggestionsList
                onAddTag={handleAddTag}
                suggestions={filteredSuggestions}
              />
            )}
          </div>
          <Button title="=" onClick={handleResult} />
        </div>
        <div className="text-center bg-indigo-500 text-white py-[0.5rem] rounded-xl text-lg font-medium">
          Result: {result}
        </div>
        <div className="text-center w-full text-red-500 font-bold text-xl">
          {errorMessage}
        </div>
      </div>
    </div>
  );
};
