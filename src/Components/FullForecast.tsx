import Current from "./Current";
import Daily from "./Daily";
import Hourly from "./Hourly";

type UnitSystemType = "metric" | "imperial";

interface weatherProps {
    ldState: boolean;
    forecastData: any;
    locName: string;
    sltdDay: string;
    tglDayFunc: (day: string) => void;
    unitSys: UnitSystemType;
}

function FullForecast({
    ldState,
    forecastData,
    locName,
    sltdDay,
    tglDayFunc,
    unitSys,
}: weatherProps) {
    let currentWeatherData;
    let dailyWeather;
    let hourlyWeather;

    function convertCodeToIcon(code: number): string {
        if (code === 0) return "/images/icon-sunny.webp";

        if ([1, 2].includes(code)) return "/images/icon-partly-cloudy.webp";

        if (code === 3) return "/images/icon-overcast.webp";

        if ([45, 48].includes(code)) return "/images/icon-fog.webp";

        if ([51, 53, 55, 56, 57].includes(code))
            return "/images/icon-drizzle.webp";

        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code))
            return "/images/icon-rain.webp";

        if ([71, 73, 75, 77, 85, 86].includes(code))
            return "/images/icon-snow.webp";

        if ([95, 96, 99].includes(code)) return "/images/icon-storm.webp";

        return "/images/icon-sunny.webp";
    }

    function formatDate(dateVal: string): string {
        const date = new Date(dateVal);

        const options = {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        } as const;

        return date.toLocaleDateString("en-US", options);
    }

    function getShortDay(timeVal: string): string {
        const date = new Date(timeVal);
        return date.toLocaleDateString("en-US", { weekday: "short" });
    }

    function getLongDay(dateStr: string): string {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    function formatToAmPm(dateString: string) {
        const date = new Date(dateString);
        let hours = date.getHours();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours} ${ampm}`;
    }

    function convertTemp(temp: number): string {
        if (unitSys === "metric") return `${temp}°`;
        return `${Math.round(temp * (9 / 5) + 32)} °`;
    }

    function convertSpeed(speed: number): string {
        if (unitSys === "metric") return `${speed} km/h`;
        return `${Math.round(speed * 0.621371)} mph`;
    }

    function convertPpt(ppt: number): string {
        if (unitSys === "metric") return `${ppt} mm`;
        return `${ppt / 25.4} in`;
    }

    if (forecastData && forecastData.current) {
        hourlyWeather = forecastData.hourly;

        currentWeatherData = {
            location: locName,
            date: formatDate(forecastData.current.time),
            weatherCode: convertCodeToIcon(forecastData.current.weather_code),
            temperature: convertTemp(
                Math.round(forecastData.current.temperature_2m)
            ),
            apparentTemp: convertTemp(
                Math.round(forecastData.current.apparent_temperature)
            ),
            humidity: Math.round(forecastData.current.relative_humidity_2m),
            wind: convertSpeed(Math.round(forecastData.current.wind_speed_10m)),
            precipitation: convertPpt(
                Math.round(forecastData.current.precipitation)
            ),
        };

        dailyWeather = forecastData.daily.time.map(
            (timeVal: string, i: number) => ({
                weekDay: getShortDay(timeVal),
                minTemp: convertTemp(
                    Math.round(forecastData.daily.temperature_2m_min[i])
                ),
                maxTemp: convertTemp(
                    Math.round(forecastData.daily.temperature_2m_max[i])
                ),
                WeatherIcon: convertCodeToIcon(
                    forecastData.daily.weather_code[i]
                ),
            })
        );

        hourlyWeather = forecastData.hourly.time.map(
            (timeVal: string, i: number) => ({
                weekDay: getLongDay(timeVal),
                time: formatToAmPm(timeVal),
                temp: convertTemp(
                    Math.round(forecastData.hourly.temperature_2m[i])
                ),
                weatherIcon: convertCodeToIcon(
                    forecastData.hourly.weather_code[i]
                ),
            })
        );
    }
    console.log(hourlyWeather);
    console.log(currentWeatherData);

    console.log(forecastData);

    console.log(dailyWeather);
    console.log(hourlyWeather);

    return (
        <section className="weather__content">
            <Current dispStat={ldState} forecastData={currentWeatherData} />
            <Daily dispStat={ldState} forecastData={dailyWeather} />
            <Hourly
                dispStat={ldState}
                forecastData={hourlyWeather}
                selectedDay={sltdDay}
                toggleDayFunc={tglDayFunc}
            />
        </section>
    );
}

export default FullForecast;
