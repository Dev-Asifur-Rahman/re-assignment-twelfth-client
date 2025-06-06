import { useState, useEffect, useContext } from "react";
import "../css/togglemode.css";
import { Context } from "../js/context";

const ThemeToggle = () => {
  const { mode, setMode } = useContext(Context);
  function toggleMode(e) {
    if (e.target.checked) {
      localStorage.setItem("theme", "dark");
      setMode("dark");
    } else {
      localStorage.setItem("theme", "light");
      setMode("light");
    }
  }

  return (
    <>
      <section>
        <svg style={{ display: "none" }}>
          <symbol id="light" viewBox="0 0 24 24">
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="12"
                  y1="17"
                  x2="12"
                  y2="20"
                  transform={`rotate(${i * 45},12,12)`}
                />
              ))}
            </g>
            <circle fill="currentColor" cx="12" cy="12" r="5" />
          </symbol>
          <symbol id="dark" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M15.1,14.9c-3-0.5-5.5-3-6-6C8.8,7.1,9.1,5.4,9.9,4c0.4-0.8-0.4-1.7-1.2-1.4C4.6,4,1.8,7.9,2,12.5c0.2,5.1,4.4,9.3,9.5,9.5c4.5,0.2,8.5-2.6,9.9-6.6c0.3-0.8-0.6-1.7-1.4-1.2C18.6,14.9,16.9,15.2,15.1,14.9z"
            />
          </symbol>
        </svg>
        <label className="switch">
          <input
            className="switch__input"
            type="checkbox"
            checked={mode === "dark"}
            onChange={toggleMode}
          />
          <svg
            className="switch__icon"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href="#light" />
          </svg>
          <svg
            className="switch__icon"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href="#dark" />
          </svg>
          <span className="switch__inner"></span>
          <span className="switch__inner-icons">
            <svg
              className="switch__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="#light" />
            </svg>
            <svg
              className="switch__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="#dark" />
            </svg>
          </span>
          <span className="switch__sr">Dark Mode</span>
        </label>
      </section>
    </>
  );
};

export default ThemeToggle;
