import React from "react";
import { useState } from "react";

export function HoursInputRow(props) {

    const [total, setTotal] = useState("0")

    const onChange = (event) => {
        event.preventDefault()
        props.monthHours[props.date]["hours"] = event.target.value
        const date = props.date
        props.setMonthHours((prevState) => ({
            ...prevState,
            [date]: {
                hours: event.target.value,
                rate: props.rate
            }
        }));

        setTotal(event.target.value * props.rate)
    }

    return (
        <div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
            <p>{props.date}</p>
                <h3>
                    <input
                        type="text"
                        value={props.hours}
                        onChange={(e) => onChange(e)}
                    />
                </h3>
                <p>£{props.rate}</p>
                <p>Day Total: £{total}</p>
            </div>
        </div>
    )
}
