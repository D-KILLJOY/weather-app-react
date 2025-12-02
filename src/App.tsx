import FullForecast from "./Components/FullForecast";
import Header from "./Components/Header";
import Search from "./Components/Search";
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

interface CurCty {
    cords: {
        lat?: number;
        lng?: number;
    };
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
    const [currentCity, setCurrentCity] = useState<CurCty[]>([]);

    function updateLocation(locName: string) {
        setLocValue(locName);
        setSearchActive(locName.trim() !== "");
    }

    function updateCurCity(cityCords: CurCty) {
        setCurrentCity([cityCords]);
    }

    function searchWeather() {
        fetchWeather(currentCity);
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
    const fetchWeather = async (curCity: CurCty[]) => {
        if (curCity.length === 0) return;
        const cityLattitude = curCity[0].cords.lat;
        const cityLongitude = curCity[0].cords.lat;

        setLoading(true);

        try {
            const url = "https://api.open-meteo.com/v1/forecast";

            const response = await axios.get<WeatherData>(url, {
                params: {
                    latitude: cityLattitude,
                    longitude: cityLongitude,
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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentCity([
                        { cords: { lat: latitude, lng: longitude } },
                    ]);
                },
                (error) => {
                    console.error("Geolocation error:", error);

                    // !! ADD ERROR THAT DISPLAYS THAT CURRENT CITY CANT BE DETECTED AND DISPLAY FOR SOMEWHERE ELSE
                }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            // !! ADD ERROR THAT DISPLAYS THAT CURRENT CITY CANT BE DETECTED AND DISPLAY FOR SOMEWHERE ELSE
        }
    }, []);

    useEffect(() => {
        fetchWeather(currentCity);
    }, []);

    console.log(currentCity);
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
                updCurCtyFunc={updateCurCity}
            />

            <FullForecast />
            <div className="attribution">
                Challenge by{" "}
                <a href="https://www.frontendmentor.io?ref=challenge">
                    Frontend Mentor
                </a>
                . Coded by{" "}
                <a target="_blank" href="https://linktr.ee/didiauche">
                    Didia Uchenna
                </a>
                .
            </div>
        </main>
    );
}

export default App;
