import React, { useEffect, useRef } from "react";
import "cally";

const CallyCalender = ({setCalenderDate,setOpen,open}) => {

  const Calender = useRef(null);
  useEffect(() => {
    const el = Calender.current;

    const handleDateChange = (e) => {
      setCalenderDate(e.target.value)
      setOpen(!open)
    };

    el?.addEventListener("change", handleDateChange);

    return () => {
      el?.removeEventListener("change", handleDateChange);
    };
  }, []);
  return (
    <>
      <calendar-date ref={Calender} className="absolute top-full left-0 z-50 bg-white shadow-md mt-1">
        <calendar-month></calendar-month>
      </calendar-date>
    </>
  );
};

export default CallyCalender;
