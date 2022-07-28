import React from "react";
import { useState } from "react";
import { createMonthBill } from "./firestore";
import { getAllDaysInMonth, getMonthYearString } from "./Dates";
import { HoursInputRow } from "./singleBillForm";
import { formatDateToString } from "./Dates";
import { getAllMonthlyBills } from "./firestore";
import { ExpensesInputRow } from "./expensesInputRow";



const createMonthHoursJson = (dates, rates) => {
    var monthHoursRateDict = {};
    dates.forEach(date => {
        let rate;
        if (date.getDay() < 5) {
            rate = rates.weekday
        }
        else {
            rate = rates.weekend
        }
        monthHoursRateDict[formatDateToString(date)] = {
            hours: "",
            rate: rate
        }
    });
    console.log("here")
    return monthHoursRateDict;
}

function getTotalHoursPriceForMonth(monthHoursRatesDict) {
    var total = 0;
    for (const [key, value] of Object.entries(monthHoursRatesDict)) {
        total = total + (value["rate"] * value["hours"])
    }
    return total
}

function getTotalPriceForMonth(monthHoursRateDict, expensesTotal) {
    const et = parseFloat(expensesTotal) || 0.00
    const ht = parseFloat(getTotalHoursPriceForMonth(monthHoursRateDict));
    return et + ht;
}

export const MonthBillsForm = (e, props) => {
    const [expenses, setExpenses] = useState("")
    const [total, setTotal] = useState("")
    const rates = { weekday: 5.32, weekend: 10.99 }
    var now = new Date();
    let dates = getAllDaysInMonth(now.getFullYear(), now.getMonth())
    const [monthHours, setMonthHours] = useState(createMonthHoursJson(dates, rates));

    const handleSubmit = (event) => {
        event.preventDefault();
        createMonthBill(monthHours, expenses, getMonthYearString(now), "Jerry")
        alert("Bill created successfully")
    }

    return (
        <div style={{ clear: "both" }}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr"}}>
                <h3>Date</h3>
                <h3>Hours</h3>
                <h3>Rate</h3>
                </div>
            <form onSubmit={handleSubmit}>
                {dates.map((date) => {
                    const formattedDate = formatDateToString(date)
                    return (
                        <div style={{clear:"both"}}>
                            <HoursInputRow
                                monthHours={monthHours}
                                setMonthHours={setMonthHours}
                                hours={monthHours[formattedDate]["hours"]}
                                date={formattedDate}
                                name="Jerry"
                                rate={monthHours[formattedDate]["rate"]}>
                            </HoursInputRow>
                        </div>
                )})}
                <ExpensesInputRow expensesTotal={expenses} setExpenses={setExpenses}></ExpensesInputRow>
                <input type="submit"></input>
            </form>
            <button onClick={() => setTotal(getTotalPriceForMonth(monthHours, expenses))}>Bills</button>
            <h3>Total: {total}</h3>
        </div>
    )
}
