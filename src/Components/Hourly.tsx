function Hourly() {
    return (
        <section className="hourly__forecast__con">
            <nav className="forecast__nav__con">
                <h3 className="hourly__header">Hourly forecast</h3>
                <button className="day__select__btn">
                    <span className="day__btn__text">Tuesday</span>
                    <img
                        src="./assets/images/icon-dropdown.svg"
                        alt="dropdown arrow"
                        width="12"
                        height="18"
                        className="icon__dropdown"
                    />
                </button>
                <div className="forecast__nav__dropdown ">
                    <button className="forecast__nav">Monday</button>
                    <button className="forecast__nav">Tuesday</button>
                </div>
            </nav>
            <article className="hourly__forecast">
                <div className="forecast__con">
                    <img
                        src="./assets/images/icon-overcast.webp"
                        className="hourly__forecast__img"
                        alt=""
                    />
                    <p className="hourly__forecast__time">6 PM</p>
                    <p className="hourly__forecast__temp">20&deg;</p>
                </div>
            </article>
        </section>
    );
}

export default Hourly;
