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
    const [tempUnitSystem, setTempUnitSystem] =
        useState<UnitSystemType>("metric");
    const [speedUnitSystem, setSpeedUnitSystem] =
        useState<UnitSystemType>("metric");
    const [pptUnitSystem, setPptUnitSystem] =
        useState<UnitSystemType>("metric");
    const [unitSystem, setUnitSystem] = useState<UnitSystemType>("metric");

    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [searchCurrState, setSearchCurrState] =
        useState<SearchState>("searching");
    const [searchActive, setSearchActive] = useState(false);
    const [locValue, setLocValue] = useState<string>("");
    const [locName, setLocName] = useState<string>("");
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const [currentCity, setCurrentCity] = useState<CurCty[]>([]);
    const [autoCity, setAutoCity] = useState<CurCty[]>([]);

    const [selectedDay, setSelectedDay] = useState<string>("");

    function updateLocation(locNameP: string) {
        setLocValue(locNameP);
        setSearchActive(locNameP.trim() !== "");
    }

    function updateCurCity(cityCords: CurCty) {
        setCurrentCity([cityCords]);
    }

    function searchWeather() {
        fetchWeather(currentCity);
        setLocName(locValue);
        setLocValue("");
    }

    function closeSearch(city: string) {
        setLocValue(city);
        setSearchActive(false);
        setSearchResults([]);
    }

    function updateDay(day: string) {
        setSelectedDay(day);
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
        const cityLongitude = curCity[0].cords.lng;

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
                    console.log(position);
                    setAutoCity([{ cords: { lat: latitude, lng: longitude } }]);
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
        fetchWeather(autoCity);

        const reverseGeocode = async (autoCty: CurCty[]) => {
            if (autoCty.length === 0) return;
            const cityLattitude = autoCty[0].cords.lat;
            const cityLongitude = autoCty[0].cords.lng;
            try {
                const response = await axios.get(
                    "https://nominatim.openstreetmap.org/reverse",
                    {
                        params: {
                            lat: cityLattitude,
                            lon: cityLongitude,
                            format: "json",
                        },
                    }
                );
                const { city, country } = response.data.address;
                console.log(response.data.address);
                const newLoc = `${city}, ${country}`;
                setLocName(newLoc);

                // { city, state, country, postcode, etc. }
            } catch (err) {
                console.error(err);
            }
        };
        reverseGeocode(autoCity);
    }, [autoCity]);

    console.log(autoCity);

    function setCurrDay() {
        if (weatherData === undefined || weatherData === null) return;
        const date = new Date(weatherData.current.time);
        const currentDay = date.toLocaleDateString("en-US", {
            weekday: "long",
        });

        setSelectedDay(currentDay);
    }

    useEffect(setCurrDay, [weatherData]);

    console.log(weatherData);

    // GET WEATHER DATA
    // GET WEATHER DATA

    function toggleUnit() {
        setUnitToggle((prev) => !prev);
    }

    function toggleUnitSystem() {
        if (unitSystem === "metric") {
            setUnitSystem("imperial");
            setTempUnitSystem("imperial");
            setSpeedUnitSystem("imperial");
            setPptUnitSystem("imperial");
        } else if (unitSystem === "imperial") {
            setUnitSystem("metric");
            setTempUnitSystem("metric");
            setSpeedUnitSystem("metric");
            setPptUnitSystem("metric");
        }
    }

    function toggleTempUnitSystem(unitType: UnitSystemType) {
        setTempUnitSystem(unitType);
    }

    function toggleSppedUnitSystem(unitType: UnitSystemType) {
        setSpeedUnitSystem(unitType);
    }

    function togglePptUnitSystem(unitType: UnitSystemType) {
        setPptUnitSystem(unitType);
    }
    return (
        <main className="app__body">
            <Header
                unitTgl={unitToggle}
                tglUnitFunc={toggleUnit}
                tglUnitSysFunc={toggleUnitSystem}
                unitSys={unitSystem}
                tempUnitSys={tempUnitSystem}
                spdUnitSys={speedUnitSystem}
                pptUnitSys={pptUnitSystem}
                tglTmpFunc={toggleTempUnitSystem}
                tglSpdFunc={toggleSppedUnitSystem}
                tglPptFunc={togglePptUnitSystem}
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

            {loading === false && autoCity.length < 1 && locName === "" ? (
                <div className="no__result">
                    <p>No search result found!</p>
                </div>
            ) : (
                <FullForecast
                    ldState={loading}
                    locName={locName}
                    forecastData={weatherData}
                    sltdDay={selectedDay}
                    tglDayFunc={updateDay}
                    tempUnitSys={tempUnitSystem}
                    spdUnitSys={speedUnitSystem}
                    pptUnitSys={pptUnitSystem}
                />
            )}

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
