import { useRef, useState } from "react";
import { ITextInput, TextInput } from "./TextInput";
import { Maybe } from "@src/graphql/generated";
import { useOutsideClick } from "@src/hooks/useOutsideClick";

export interface ISuggestion {
  key?: Maybe<string>;
  value?: Maybe<string>;
}

export interface IAutoComplete<T> extends ITextInput {
  suggestions?: T[];
  onSelectSuggestion?: (s: T) => void;
}

export const AutoComplete: React.FC<IAutoComplete<ISuggestion>> = ({
  suggestions = [],
  loading,
  onSelectSuggestion,
  ...inputProps
}) => {
  const wrapperRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  useOutsideClick(wrapperRef, () => setShowSuggestions(false));

  const handleSelectSuggestion = (s: ISuggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(s);
    }

    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef}>
      <TextInput {...inputProps} onFocus={() => setShowSuggestions(true)} />
      {showSuggestions && suggestions.length ? (
        <ul className="mt-1 absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-md py-1 z-10">
          {!loading &&
            suggestions.map((s) => (
              <li
                key={s.key}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer truncate"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSuggestion(s);
                }}
                title={s.value || ""}
              >
                {s.value}
              </li>
            ))}
          {loading && (
            <li className="px-3 py-2 cursor-not-allowed text-gray-500">
              Loading...
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};
