import logo from "../assets/images/logo.svg";
import unitsIcon from "../assets/images/icon-units.svg";
import dropDownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";

type UnitSystemType = "metric" | "imperial";

interface HeaderProps {
    unitTgl: boolean;
    tglUnitFunc: () => void;
    tglUnitSysFunc: () => void;
    unitSys: UnitSystemType;
    tempUnitSys: UnitSystemType;
    spdUnitSys: UnitSystemType;
    pptUnitSys: UnitSystemType;
    tglTmpFunc: (unitType: UnitSystemType) => void;
    tglSpdFunc: (unitType: UnitSystemType) => void;
    tglPptFunc: (unitType: UnitSystemType) => void;
}

function Header({
    unitTgl,
    tglUnitFunc,
    tglUnitSysFunc,
    unitSys,
    tempUnitSys,
    spdUnitSys,
    pptUnitSys,
    tglTmpFunc,
    tglSpdFunc,
    tglPptFunc,
}: HeaderProps) {
    return (
        <header className="main__header">
            <nav className="main__nav">
                <img className="main__logo" src={logo} alt="Weather Now Logo" />

                <button
                    type="button"
                    className={`unit__btn ${
                        unitTgl === true ? "unit__btn--active" : ""
                    }`}
                    onClick={tglUnitFunc}
                >
                    <img
                        src={unitsIcon}
                        alt="settings Icon"
                        className="unit__icon"
                    />
                    <span className="unit__btn__text">Units</span>
                    <img
                        src={dropDownIcon}
                        alt="dropdown arrow"
                        className="icon__dropdown"
                    />
                </button>
                <ul
                    className={`nav__dropdown ${
                        unitTgl === true ? "nav__dropdown--active" : ""
                    } `}
                >
                    <button
                        type="button"
                        className="switch__btn"
                        onClick={tglUnitSysFunc}
                    >{`${
                        unitSys === "metric"
                            ? "Switch to Imperial"
                            : "Switch to Metric"
                    }`}</button>
                    <div className="tsp__contaioner temp">
                        <p className="list__label">Temperature</p>

                        <li
                            onClick={() => tglTmpFunc("metric")}
                            className={`nav__list__item ${
                                tempUnitSys === "metric"
                                    ? "nav__list__item--active "
                                    : ""
                            }`}
                        >
                            Celsius (&deg;C){" "}
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>

                        <li
                            onClick={() => tglTmpFunc("imperial")}
                            className={`nav__list__item ${
                                tempUnitSys === "imperial"
                                    ? "nav__list__item--active "
                                    : ""
                            }`}
                        >
                            Fahrenheit (&deg;F)
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>
                    </div>
                    <div className="line"></div>
                    <div className="tsp__contaioner speed">
                        <p className="list__label">Wind Speed</p>
                        <li
                            onClick={() => tglSpdFunc("metric")}
                            className={`nav__list__item ${
                                spdUnitSys === "metric"
                                    ? "nav__list__item--active"
                                    : ""
                            }`}
                        >
                            Km/h{" "}
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>
                        <li
                            onClick={() => tglSpdFunc("imperial")}
                            className={`nav__list__item ${
                                spdUnitSys === "imperial"
                                    ? "nav__list__item--active "
                                    : ""
                            }`}
                        >
                            mph{" "}
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>
                    </div>
                    <div className="line"></div>
                    <div className="tsp__contaioner ppt">
                        <p className="list__label">Precipitation</p>
                        <li
                            onClick={() => tglPptFunc("metric")}
                            className={`nav__list__item ${
                                pptUnitSys === "metric"
                                    ? "nav__list__item--active "
                                    : ""
                            }`}
                        >
                            Millimeters (mm){" "}
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>
                        <li
                            onClick={() => tglPptFunc("imperial")}
                            className={`nav__list__item ${
                                pptUnitSys === "imperial"
                                    ? "nav__list__item--active "
                                    : ""
                            }`}
                        >
                            Inches (in){" "}
                            <img
                                src={checkmarkIcon}
                                alt="checkmark icon"
                                className="active__img"
                            />
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
