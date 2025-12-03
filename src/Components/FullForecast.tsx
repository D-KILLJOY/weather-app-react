import Current from "./Current";
import Daily from "./Daily";
import Hourly from "./Hourly";

interface weatherProps {
    ldState: boolean;
    forecastData: any;
    locName: string;
}

function FullForecast({ ldState, forecastData, locName }: weatherProps) {
    let currentWeatherData;
    let dailyWeather;
    let hourlyWeather;

    function convertCodeToIcon(code: number): string {
        return code === 0
            ? "/public/images/icon-sunny.webp"
            : code === 1 || 2
              ? "/public/images/icon-partly-cloudy.webp"
              : code === 3
                ? "/public/images/icon-overcast.webp"
                : code === 45 || 48
                  ? "/public/images/icon-fog.webp"
                  : code === 51 || 53 || 55 || 56 || 57
                    ? "/public/images/icon-drizzle.webp"
                    : code === 61 || 63 || 65 || 66 || 67 || 80 || 81 || 82
                      ? "/public/images/icon-rain.webp"
                      : code === 71 || 73 || 75 || 77 || 85 || 86
                        ? "/public/images/icon-snow.webp"
                        : code === 95 || 96 || 99
                          ? "/public/images/icon-storm.webp"
                          : "/public/images/icon-sunny.webp";
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

    if (forecastData && forecastData.current) {
        dailyWeather = forecastData.daily;
        hourlyWeather = forecastData.hourly;

        currentWeatherData = {
            location: locName,
            date: formatDate(forecastData.current.time),
            weatherCode: convertCodeToIcon(forecastData.current.weather_code),
            temperature: Math.round(forecastData.current.temperature_2m),
            apparentTemp: forecastData.current.apparent_temperature,
            humidity: forecastData.current.relative_humidity_2m,
            wind: forecastData.current.wind_speed_10m,
            precipitation: forecastData.current.precipitation,
        };
    }
    console.log(currentWeatherData);

    console.log(forecastData);

    console.log(dailyWeather);
    console.log(hourlyWeather);

    return (
        <section className="weather__content">
            <Current dispStat={ldState} forecastData={currentWeatherData} />
            <Daily dispStat={ldState} />
            <Hourly dispStat={ldState} />
        </section>
    );
}

export default FullForecast;
