import Current from "./Current";
import Daily from "./Daily";
import Hourly from "./Hourly";

function FullForecast() {
    return (
        <section className="weather__content">
            <Current />
            <Daily />
            <Hourly />
        </section>
    );
}

export default FullForecast;
