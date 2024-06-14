import { FC } from "react";
import { SuggestionInterface } from "../../interfaces/suggestion";
import { TagInterface } from "../../interfaces/tag";

type Props = {
  onAddTag: (value: TagInterface) => void;
  suggestions: SuggestionInterface[];
};

export const SuggestionsList: FC<Props> = ({ suggestions, onAddTag }) => {
  return (
    <div className="absolute top-full left-0 right-0 border-t flex flex-col">
      {suggestions.map((suggestion, index) => (
        <button
          key={suggestion.name + `${index}`}
          className="bg-gray-100 py-1 px-4 cursor-pointer hover:bg-gray-200"
          onClick={() => onAddTag({ title: suggestion.name, value: 0 })}
        >
          {suggestion.name}
        </button>
      ))}
    </div>
  );
};
