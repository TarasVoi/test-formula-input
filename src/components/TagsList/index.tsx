import { useTagStore } from "../../store/useTag";
import { TagInterface } from "../../interfaces/tag";
import { FC } from "react";

type Props = {
  operators: string[];
};

export const TagsList: FC<Props> = ({ operators }) => {
  const { tags, updateTag, removeTag } = useTagStore();

  return (
    <>
      {tags?.length > 0 &&
        tags.map((item: TagInterface, index: number) => (
          <>
            <div
              key={item.title + index}
              className="flex items-center p-2 bg-zinc-300 rounded-lg h-full gap-1"
            >
              <button
                onClick={() => removeTag(index)}
                className="w-5 h-5 pb-[4px] flex justify-center items-center bg-zinc-700 text-white rounded-full"
              >
                x
              </button>
              <div>{item.title}</div>
              <div className="w-[1px] bg-zinc-700 h-6 flex" />
              <input
                autoFocus
                placeholder="Value"
                className="bg-zinc-200 rounded-sm w-16 outline-none"
                value={item.value}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^\d*\.?\d*$/.test(newValue)) {
                    updateTag(index, { ...item, value: +newValue });
                  }
                }}
              />
            </div>
            {operators[index] && (
              <div className="mx-2 text-2xl font-bold">{operators[index]}</div>
            )}
          </>
        ))}
    </>
  );
};
