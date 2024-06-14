import axios from "axios";
import { SuggestionInterface } from "../interfaces/suggestion";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getSuggestionList = async () => {
  return (await axiosInstance.get<SuggestionInterface[]>("autocomplete")).data;
};
