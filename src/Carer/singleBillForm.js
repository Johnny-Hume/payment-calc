import React, { useEffect } from "react";
import { useState } from "react";

export function HoursInputRow(props) {

    const [total, setTotal] = useState(0.0)

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

    useEffect(() => {
        setTotal(props.monthHours[props.date]["hours"] * props.rate)
              // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.monthHours])

    return (
        <div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
            <p>{props.readableDate}</p>
                <h3>
                    <input
                        type="text"
                        style={{fontSize:"20px"}}
                        maxLength="4"
                        size="4"
                        value={props.hours != 0 ?props.hours : ""}
                        onChange={(e) => onChange(e)}
                    />
                </h3>
                <p>£{props.rate}</p>
                <p>£{total.toFixed(2)}</p>
            </div>
        </div>
    )
}
