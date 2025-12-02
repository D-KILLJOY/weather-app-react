import searchIcon from "../assets/images/icon-search.svg";
import searchLoading from "../assets/images/icon-loading.svg";
import { useEffect, useState } from "react";
import axios from "axios";

type SearchState = "searching" | "results";

interface City {
    id?: number;
    name: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

function Search() {
    const [searchCurrState, setSearchCurrState] =
        useState<SearchState>("searching");
    const [searchActive, setSearchActive] = useState(false);
    const [locValue, setLocValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<City[]>([]);

    function updateLocation(locName: string) {
        setLocValue(locName);
        setSearchActive(locName.trim() !== "");
    }

    function closeSearch(city: string) {
        setLocValue(city);
        setSearchActive(false);
        setSearchResults([]);
    }

    const getLocation = async (query: string) => {
        const cleanQuery = query.trim();

        if (cleanQuery.length <= 1) return;

        try {
            const response = await axios.get(
                "https://geocoding-api.open-meteo.com/v1/search",
                {
                    params: {
                        name: query,
                        count: 4,
                        language: "en",
                        format: "json",
                    },
                }
            );
            setSearchResults(response.data.results ?? []);
        } catch (error) {
            console.error(error);
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            getLocation(locValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [locValue]);

    useEffect(() => {
        setSearchCurrState(searchResults.length > 0 ? "results" : "searching");
    }, [searchResults]);

    return (
        <>
            <section className="hero">
                <h1 className="hero__text">How's the sky looking today?</h1>
            </section>
            <form className="search__container">
                <div className="input__con">
                    <img
                        src={searchIcon}
                        className="search__icon"
                        alt="search Icon"
                    />
                    <input
                        type="text"
                        placeholder="Search for a place"
                        className="search__input"
                        name="location"
                        value={locValue}
                        onChange={(e) => updateLocation(e.target.value)}
                    />
                </div>
                {searchActive === true && (
                    <div className="search__suggestions">
                        {searchCurrState === "searching" && (
                            <div className="search__loading">
                                <img
                                    className="search__load__icon"
                                    src={searchLoading}
                                    alt="loading"
                                />

                                <span className="search__text">
                                    Search in progress
                                </span>
                            </div>
                        )}

                        {searchCurrState === "results" && (
                            <div className="search__results">
                                {searchResults.map((city) => (
                                    <p
                                        className="search__result"
                                        key={city.id}
                                        onClick={() =>
                                            closeSearch(
                                                `${city.name}, ${city.country}`
                                            )
                                        }
                                    >
                                        {city.name}, {city.country}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <button className="search__btn" type="submit">
                    Search
                </button>
            </form>
        </>
    );
}

export default Search;
