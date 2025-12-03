import dropdownIcon from "../assets/images/icon-dropdown.svg";

interface weatherProps {
    dispStat: boolean;
    // forecastData: any;
}
function Hourly({ dispStat }: weatherProps) {
    const items = [...Array(8)];

    return (
        <section className="hourly__forecast__con">
            <nav className="forecast__nav__con">
                <h3 className="hourly__header">Hourly forecast</h3>
                <button className="day__select__btn">
                    <span className="day__btn__text">-</span>
                    <img
                        src={dropdownIcon}
                        alt="dropdown arrow"
                        className="icon__dropdown"
                    />
                </button>
                <div className="forecast__nav__dropdown ">
                    <button className="forecast__nav">Monday</button>
                    <button className="forecast__nav">Tuesday</button>
                </div>
            </nav>

            <article className="hourly__forecast">
                {dispStat === true ? (
                    items.map((_, i) => (
                        <div className="forecast__con" key={i}></div>
                    ))
                ) : (
                    <div className="forecast__con"></div>
                )}
            </article>
        </section>
    );
}

export default Hourly;
