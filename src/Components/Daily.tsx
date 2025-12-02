function Daily() {
    const items = [...Array(7)];

    return (
        <section className="daily__forecast__con">
            <h3 className="daily__forecast__header">Daily forecast</h3>
            <article className="daily__forcast">
                {items.map((_, i) => (
                    <div className="forecast">
                        {/* <p className="forecast__day">Tue</p>
                        <img
                            className="forecast__img"
                            src="./assets/images/icon-rain.webp"
                            alt="forecast image"
                        />

                        <div className="forecast__temp">
                            <p className="first__temp temp__text">20&deg;</p>
                            <p className="second__temp temp__text">14&deg;</p>
                        </div> */}
                    </div>
                ))}
            </article>
        </section>
    );
}

export default Daily;
