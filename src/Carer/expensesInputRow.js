import React from "react";
import { useState } from "react";

export function ExpensesInputRow(props) {


    const onChange = (event) => {
        event.preventDefault()
        props.setExpenses(event.target.value)
    }

    return (
        <div>
            <h3>{props.date}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <h3>Expenses</h3>
                <p>
                    <input
                    maxLength={6}
                    size={6}
                    style={{fontSize:"20px"}}
                        type="text"
                        value={props.expensesTotal != 0 ? props.expensesTotal : ""}
                        onChange={(e) => onChange(e)}
                    />
                </p>
            </div>
        </div>
    )
}
