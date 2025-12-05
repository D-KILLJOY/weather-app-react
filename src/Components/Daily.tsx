interface weatherProps {
    dispStat: boolean;
    forecastData: any;
}

function Daily({ dispStat, forecastData }: weatherProps) {
    const items = [...Array(7)];

    return (
        <section className="daily__forecast__con">
            <h2 className="daily__forecast__header">Daily forecast</h2>
            <article className="daily__forcast">
                {dispStat === true
                    ? items.map((_, i) => (
                          <div className="forecast" key={i}></div>
                      ))
                    : forecastData.map((data: any) => (
                          <div className="forecast" key={data.weekDay}>
                              <p className="forecast__day">{data.weekDay}</p>
                              <img
                                  className="forecast__img"
                                  src={data.WeatherIcon}
                                  alt="forecast image"
                              />

                              <div className="forecast__temp">
                                  <p className="first__temp temp__text">
                                      {data.maxTemp}
                                  </p>
                                  <p className="second__temp temp__text">
                                      {data.minTemp}
                                  </p>
                              </div>
                          </div>
                      ))}
            </article>
        </section>
    );
}

export default Daily;
