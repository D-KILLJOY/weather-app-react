interface weatherProps {
    dispStat: boolean;
    forecastData: any;
}

function Current({ dispStat, forecastData }: weatherProps) {
    return (
        <section className="current__weather__info__con">
            {dispStat === true ? (
                <div className="curr__loading__con">
                    <div className="load__circle__con">
                        <div className="load__circle"></div>
                        <div className="load__circle load__rev"></div>
                        <div className="load__circle"></div>
                    </div>
                    <p className="load__text">Loading...</p>
                </div>
            ) : (
                <section className="current__weather__info">
                    <article className="locdate__con">
                        <h2 className="location">{forecastData.location}</h2>
                        <p className="date">{forecastData.date}</p>
                    </article>
                    <article className="temp__con">
                        <img
                            src={forecastData.weatherCode}
                            width="120"
                            height="120"
                            alt="temperature icon"
                            className="temp__icon"
                        />
                        <p className="temperature">
                            {forecastData.temperature}°
                        </p>
                    </article>
                </section>
            )}
            <section className="current__weather__details__con">
                <div className="feels__like current__weather__detail">
                    <h3 className="current__weather__detail__header">
                        Feels Like
                    </h3>
                    <p className="current__weather__detail__text feels__like__text">
                        {dispStat === true
                            ? "-"
                            : `${forecastData.apparentTemp}°`}
                    </p>
                </div>
                <div className="humidity current__weather__detail">
                    <h3 className="current__weather__detail__header">
                        Humidity
                    </h3>
                    <p className="current__weather__detail__text humidity__text">
                        {dispStat === true ? "-" : `${forecastData.humidity}%`}
                    </p>
                </div>
                <div className="wind current__weather__detail">
                    <h3 className="current__weather__detail__header">Wind</h3>
                    <p className="current__weather__detail__text wind__text">
                        {dispStat === true ? "-" : `${forecastData.wind} Km/h`}
                    </p>
                </div>
                <div className="precipitation current__weather__detail">
                    <h3 className="current__weather__detail__header">
                        Precipitation
                    </h3>
                    <p className="current__weather__detail__text precipitation__text">
                        {dispStat === true
                            ? "-"
                            : `${forecastData.precipitation} mm`}
                    </p>
                </div>
            </section>
        </section>
    );
}

export default Current;
