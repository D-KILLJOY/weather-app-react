import Daily from "./Components/Daily";
import Header from "./Components/Header";
import Hourly from "./Components/Hourly";
import Search from "./Components/Search";
import WeatherResults from "./Components/WeatherResults";

import { useState } from "react";

type UnitSystemType = "metric" | "imperial";

function App() {
    const [unitToggle, setUnitToggle] = useState(false);
    const [unitSystem, setUnitSystem] = useState<UnitSystemType>("metric");

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
            <Search />
            <WeatherResults />
            <Daily />
            <Hourly />
        </main>
    );
}

export default App;
