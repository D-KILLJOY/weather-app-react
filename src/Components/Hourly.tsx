import { useState } from "react";
import dropdownIcon from "../assets/images/icon-dropdown.svg";

interface weatherProps {
    dispStat: boolean;
    forecastData: any;
    selectedDay: string;
    toggleDayFunc: (day: string) => void;
}
function Hourly({
    dispStat,
    forecastData,
    selectedDay,
    toggleDayFunc,
}: weatherProps) {
    const items = [...Array(8)];

    const [selectionOpen, setSelection] = useState<boolean>(false);

    let filteredDaily;

    if (forecastData !== undefined) {
        filteredDaily = forecastData.filter(
            (item: any) => item.weekDay === selectedDay
        );
    }

    function toggleNav() {
        setSelection((prev) => !prev);
    }

    return (
        <section className="hourly__forecast__con">
            <nav className="forecast__nav__con">
                <h3 className="hourly__header">Hourly forecast</h3>
                {dispStat === true ? (
                    <button className="day__select__btn" type="button">
                        <span className="day__btn__text">-</span>
                        <img
                            src={dropdownIcon}
                            alt="dropdown arrow"
                            className="icon__dropdown"
                        />
                    </button>
                ) : (
                    <button
                        className="day__select__btn"
                        type="button"
                        onClick={toggleNav}
                    >
                        <span className="day__btn__text">{selectedDay}</span>
                        <img
                            src={dropdownIcon}
                            alt="dropdown arrow"
                            className="icon__dropdown"
                        />
                    </button>
                )}
                <div
                    className={`forecast__nav__dropdown ${selectionOpen === true ? "forecast__nav__dropdown--active" : ""}`}
                >
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Monday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Monday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Tuesday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Tuesday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Wednesday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Wednesday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Thursday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Thursday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Friday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Friday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Saturday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Saturday
                    </button>
                    <button
                        className="forecast__nav"
                        onClick={() => {
                            toggleDayFunc("Sunday");
                            toggleNav();
                        }}
                        type="button"
                    >
                        Sunday
                    </button>
                </div>
            </nav>

            <article className="hourly__forecast">
                {dispStat === true
                    ? items.map((_, i) => (
                          <div className="forecast__con" key={i}></div>
                      ))
                    : filteredDaily.map((dailyHour: any) => (
                          <div className="forecast__con" key={dailyHour.time}>
                              <div className="icon__time">
                                  <img
                                      src={dailyHour.weatherIcon}
                                      alt=""
                                      className="hourly__icon"
                                  />
                                  <p className="hour__time">{dailyHour.time}</p>
                              </div>
                              <p className="hour__temp">{dailyHour.temp}</p>
                          </div>
                      ))}
            </article>
        </section>
    );
}

export default Hourly;
