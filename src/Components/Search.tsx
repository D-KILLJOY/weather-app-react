import searchIcon from "../assets/images/icon-search.svg";
import searchLoading from "../assets/images/icon-loading.svg";

type SearchState = "searching" | "results";

interface City {
    id?: number;
    name: string;
    admin1: string;
    country: string;
    latitude?: number;
    longitude?: number;
}

interface CurCty {
    cords: {
        lat?: number;
        lng?: number;
    };
}

interface SearchProps {
    srchCurSt: SearchState;
    srchAct: boolean;
    lclVal: string;
    srchRslts: City[];
    updtLcFunc: (locName: string) => void;
    srcWthFunc: () => void;
    clsSrchFunc: (city: string) => void;
    updCurCtyFunc: (cityCords: CurCty) => void;
}

function Search({
    srchCurSt,
    srchAct,
    lclVal,
    srchRslts,
    updtLcFunc,
    srcWthFunc,
    clsSrchFunc,
    updCurCtyFunc,
}: SearchProps) {
    return (
        <>
            <section className="hero">
                <h1 className="hero__text">How's the sky looking today?</h1>
            </section>
            <form className="search__container">
                <div className="input__con">
                    <img
                        src={searchIcon}
                        className="search__icon"
                        alt="search Icon"
                    />
                    <input
                        type="text"
                        placeholder="Search for a place"
                        className="search__input"
                        name="location"
                        value={lclVal}
                        onChange={(e) => updtLcFunc(e.target.value)}
                    />
                </div>
                {srchAct === true && (
                    <div className="search__suggestions">
                        {srchCurSt === "searching" && (
                            <div className="search__loading">
                                <img
                                    className="search__load__icon"
                                    src={searchLoading}
                                    alt="loading"
                                />

                                <span className="search__text">
                                    Search in progress
                                </span>
                            </div>
                        )}

                        {srchCurSt === "results" && (
                            <div className="search__results">
                                {srchRslts.map((city) => (
                                    <p
                                        className="search__result"
                                        key={city.id}
                                        onClick={() => {
                                            clsSrchFunc(
                                                `${city.name}, ${city.admin1}, ${city.country}`
                                            );
                                            updCurCtyFunc({
                                                cords: {
                                                    lat: city.latitude,
                                                    lng: city.longitude,
                                                },
                                            });
                                        }}
                                    >
                                        {city.name}, {city.admin1},{" "}
                                        {city.country}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <button
                    className="search__btn"
                    type="button"
                    onClick={() => srcWthFunc()}
                >
                    Search
                </button>
            </form>
        </>
    );
}

export default Search;
