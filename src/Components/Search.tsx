import searchIcon from "../assets/images/icon-search.svg";

function Search() {
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
                    />
                </div>
                <button className="search__btn" type="submit">
                    Search
                </button>
            </form>
        </>
    );
}

export default Search;
