import { useQuery } from "react-query";
import { getSuggestionList } from "./services/api";
import { useEffect } from "react";
import { useSuggestionStore } from "./store/useSuggestion";
import { FormulaInput } from "./components/FormulaInput";

const App = () => {
  const { data, isLoading } = useQuery("suggestionList", getSuggestionList);
  const { setSuggestion } = useSuggestionStore();

  useEffect(() => {
    if (data) {
      setSuggestion(data);
    }
  }, [data, setSuggestion]);

  if (isLoading) return <div>Loading...</div>;
  return <FormulaInput />;
};

export default App;
