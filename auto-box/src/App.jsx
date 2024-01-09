import React,{ useState } from "react";
import countryData from "../resources/countryData.json";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    const filteredCountries = countryData.filter((country) =>
      startsWithIgnoreCase(country.name, inputValue)
    );

    setSearchResults(filteredCountries);
  };

  const startsWithIgnoreCase = (str, prefix) => {
    return str.toLowerCase().startsWith(prefix.toLowerCase());
  };

  const handleSelectCountry = (value) => {
    setSearchQuery(value);
    setSearchResults([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchResults([]);
    }
  };

  return (
    <>
      <h1>Country Search</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {searchResults.length > 0 && (
        <div className="suggestions">
          {searchResults.map((result, index) => (
            <div
              className="suggestion"
              key={index}
              onClick={() => handleSelectCountry(result.name)}
            >
              {result.name} ({result.code})
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
