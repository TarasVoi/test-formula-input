import { create } from "zustand";
import { TagInterface } from "../interfaces/tag";

type Props = {
  tags: TagInterface[];
  addTag: (tag: TagInterface) => void;
  updateTag: (index: number, newTag: TagInterface) => void;
  removeTag: (index: number) => void;
};

export const useTagStore = create<Props>((set) => ({
  tags: [],
  addTag: (tag: TagInterface) =>
    set((state) => ({ tags: [...state.tags, tag] })),
  updateTag: (index: number, newTag: TagInterface) =>
    set((state) => ({
      tags: state.tags.map((tag, i) => (i === index ? newTag : tag)),
    })),
  removeTag: (tagIndex) =>
    set((state) => ({
      tags: state.tags.filter((_, index) => index !== tagIndex),
    })),
}));
