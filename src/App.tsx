import Daily from "./Components/Daily";
import Header from "./Components/Header";
import Hourly from "./Components/Hourly";
import Search from "./Components/Search";
import WeatherResults from "./Components/WeatherResults";
import axios from "axios";

import { useEffect, useState } from "react";

type UnitSystemType = "metric" | "imperial";

type SearchState = "searching" | "results";

interface City {
    id?: number;
    name: string;
    admin1: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

interface WeatherData {
    latitude: number;
    longitude: number;
    elevation: number;
    utc_offset_seconds: number;
    current_weather?: {
        temperature: number;
        windspeed: number;
    };
    daily?: any;
    hourly?: any;
}

function App() {
    const [unitToggle, setUnitToggle] = useState(false);
    const [unitSystem, setUnitSystem] = useState<UnitSystemType>("metric");

    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [searchCurrState, setSearchCurrState] =
        useState<SearchState>("searching");
    const [searchActive, setSearchActive] = useState(false);
    const [locValue, setLocValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const [currentCity, setCurrentCity] = useState<City[]>([]);

    function updateLocation(locName: string) {
        setLocValue(locName);
        setSearchActive(locName.trim() !== "");
    }

    function searchWeather() {
        console.log(searchResults);
    }

    function closeSearch(city: string) {
        setLocValue(city);
        setSearchActive(false);
        setSearchResults([]);
    }

    // GET LOCATION AND LOCATION DATA
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

    // GET LOCATION AND LOCATION DATA

    useEffect(() => {
        setSearchCurrState(searchResults.length > 0 ? "results" : "searching");
    }, [searchResults]);

    // GET WEATHER DATA
    // GET WEATHER DATA

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);

            try {
                const url = "https://api.open-meteo.com/v1/forecast";

                const response = await axios.get<WeatherData>(url, {
                    params: {
                        latitude: 6.6137,
                        longitude: 3.3553,
                        hourly: ["temperature_2m", "weather_code"],
                        daily: [
                            "temperature_2m_max",
                            "temperature_2m_min",
                            "weather_code",
                        ],
                        current: [
                            "temperature_2m",
                            "precipitation",
                            "apparent_temperature",
                            "wind_speed_10m",
                            "relative_humidity_2m",
                            "weather_code",
                        ],
                        timezone: "auto",
                    },
                });

                setWeatherData(response.data);
            } catch (err) {
                console.error("Weather fetch failed:", err);
            }

            setLoading(false);
        };

        fetchWeather();
    }, []);

    console.log(weatherData);

    // GET WEATHER DATA
    // GET WEATHER DATA

    function toggleUnit() {
        setUnitToggle((prev) => !prev);
    }

    function toggleUnitSystem() {
        unitSystem === "metric"
            ? setUnitSystem("imperial")
            : setUnitSystem("metric");
    }
    return (
        <main>
            <Header
                unitTgl={unitToggle}
                tglUnitFunc={toggleUnit}
                tglUnitSysFunc={toggleUnitSystem}
                unitSys={unitSystem}
            />
            <Search
                srchCurSt={searchCurrState}
                srchAct={searchActive}
                lclVal={locValue}
                srchRslts={searchResults}
                updtLcFunc={updateLocation}
                srcWthFunc={searchWeather}
                clsSrchFunc={closeSearch}
            />

            <WeatherResults />
            <Daily />
            <Hourly />
        </main>
    );
}

export default App;
