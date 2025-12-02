import drizzleIcon from "../assets/images/icon-drizzle.webp";
import fogIcon from "../assets/images/icon-fog.webp";
import overCastIcon from "../assets/images/icon-overcast.webp";
import partlyCloudyIcon from "../assets/images/icon-partly-cloudy.webp";
import RainIcon from "../assets/images/icon-rain.webp";
import snowIcon from "../assets/images/icon-snow.webp";
import stormIcon from "../assets/images/icon-storm.webp";
import sunnyIcon from "../assets/images/icon-sunny.webp";

function FullForecast() {
    return (
        <section className="weather__info__con">
            <section className="weather__info">
                <article className="locdate__con">
                    <h2 className="location">Berlin, Germany</h2>
                    <p className="date">Tuesday, Aug 5, 2025</p>
                </article>
                <article className="temp__con">
                    <img
                        src={sunnyIcon}
                        width="120"
                        height="120"
                        alt="temperature icon"
                        className="temp__icon"
                    />
                    <p className="temperature">20&deg;</p>
                </article>
            </section>
            <section className="weather__details__con">
                <div className="feels__like weather__detail">
                    <h3 className="weather__detail__header">Feels Like</h3>
                    <p className="weather__detail__text feels__like__text">
                        18&deg;
                    </p>
                </div>
                <div className="humidity weather__detail">
                    <h3 className="weather__detail__header">Humidity</h3>
                    <p className="weather__detail__text humidity__text"></p>
                </div>
                <div className="wind weather__detail">
                    <h3 className="weather__detail__header">Wind</h3>
                    <p className="weather__detail__text wind__text"></p>
                </div>
                <div className="precipitation weather__detail">
                    <h3 className="weather__detail__header">Precipitation</h3>
                    <p className="weather__detail__text precipitation__text"></p>
                </div>
            </section>
        </section>
    );
}

export default FullForecast;
