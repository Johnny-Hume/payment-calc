import React from "react";
import { useState } from "react";

export function ExpensesInputRow(props) {


    const onChange = (event) => {
        event.preventDefault()
        props.setExpenses(parseFloat(event.target.value))
    }

    return (
        <div>
            <h3>{props.date}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <h3>Expenses</h3>
                <p>
                    <input
                        type="text"
                        value={props.expensesTotal}
                        onChange={(e) => onChange(e)}
                    />
                </p>
            </div>
        </div>
    )
}
