import React, { useEffect } from "react";
import { useState } from "react";
import { createMonthBill, getRates } from "../Database/firestore";
import { createCarerBillDoc } from "../Database/firestore";
import { formatDateToDayDDMonth, formateDateToHolidayFormat, getAllDaysInMonth, getDayOfWeek, getMonthYearString } from "../Utils/Dates";
import { HoursInputRow } from "./singleBillForm";
import { formatDateToString } from "../Utils/Dates";
import { ExpensesInputRow } from "./expensesInputRow";
import { getBillForCarerMonth } from "../Database/firestore";


export const createMonthHoursJson = (dates, rates) => {
    var monthHoursRateDict = {};
    dates.forEach(date => {
        monthHoursRateDict[formatDateToString(date)] = {
            hours: 0,
            rate: 0
        }
    });
    monthHoursRateDict["expenses"] = 0
    return monthHoursRateDict;
}

function getTotalHoursPriceForMonth(monthHoursRatesDict) {
    var total = 0;
    for (const [key, value] of Object.entries(monthHoursRatesDict)) {
        const numHours = parseFloat(value.hours)
        if (!isNaN(numHours)) {
            total = total + (value["rate"] * numHours)
        }
    }
    return total
}

export function getTotalPriceForMonth(monthHoursRateDict, expensesTotal) {
    const et = parseFloat(expensesTotal) || 0.00
    const ht = parseFloat(getTotalHoursPriceForMonth(monthHoursRateDict));
    return et + ht;
}

const populateMonthHours = (dates, monthHours, bill) => {
    dates.forEach(date => {
        const formattedDate = formatDateToString(date)
        monthHours[formattedDate]["hours"] = bill[formattedDate]["hours"]
    })
    return monthHours
}

function isHoliday(date) {
    const holidays = require("../holidays.json")["northern-ireland"].events
    const holidayFormattedDate = formateDateToHolidayFormat(date)
    return holidays.some(e => e.date == holidayFormattedDate)

}
export const populateRates = (dates, monthHours, rates) => {
    let rate
    dates.forEach(date => {
        const formattedDate = formatDateToString(date)
        if (isHoliday(date) || ["Sat", "Sun"].includes(getDayOfWeek(date))) {
            rate = rates.weekend
        }
        else {
            rate = rates.weekday
        }
        monthHours[formattedDate]["rate"] = rate
    })
    return monthHours
}

export function getMonthHoursFromBill(bill) {
    const monthHours = {}
    Object.assign(monthHours, bill)
    delete monthHours.expenses
    return monthHours
}

export const MonthBillsForm = (props) => {
    const [expenses, setExpenses] = useState(0.0)
    const [total, setTotal] = useState(0.0)
    var chosenDate = props.chosenDate
    let dates = getAllDaysInMonth(chosenDate.getFullYear(), chosenDate.getMonth())
    const [rates, setRates] = useState({ weekday: 0, weekend: 0 })
    const [monthHours, setMonthHours] = useState(createMonthHoursJson(dates, rates));
    const [hasCreatedCarer, setHasCreatedCarer] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        createMonthBill(monthHours, expenses, getMonthYearString(chosenDate), props.nameId)
        .then(alert("Saved Successfully")).catch("Oops Something Went Wrong. Try Again Soon")
    }

    useEffect(() => {
        getBillForCarerMonth(props.nameId, getMonthYearString(chosenDate))
            .then(
                (data) => {
                    if (data.id) {
                        setMonthHours(getMonthHoursFromBill(populateMonthHours(dates, monthHours, data.data)))
                        setExpenses(data.data.expenses)
                    }
                    else {
                        createCarerBillDoc(props.nameId, monthHours, getMonthYearString(props.chosenDate))
                        setHasCreatedCarer(true)
                    }
                }
            )
    }, [rates, hasCreatedCarer])

    useEffect(() => {
        getRates().then(
            (data) => {
                setRates(prevState => ({
                    ...prevState,
                    weekday: data.weekday,
                    weekend: data.weekend,
                }))
                populateRates(dates, monthHours, data)
            }
        )


    }, [])


    useEffect(() => {
        setTotal(getTotalPriceForMonth(monthHours, expenses))
    }, [monthHours, expenses])

    return (
        <div style={{ clear: "both" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                <h3>Date</h3>
                <h3>Hours</h3>
                <h3>Rate</h3>
                <h3>Day Total</h3>
            </div>
            {dates.map((date) => {
                const formattedDate = formatDateToString(date)
                const readableDate = formatDateToDayDDMonth(date)
                return (
                    <div style={{ clear: "both" }}>
                        <HoursInputRow
                        readableDate = {readableDate}
                            monthHours={monthHours}
                            setMonthHours={setMonthHours}
                            hours={monthHours[formattedDate]["hours"]}
                            date={formattedDate}
                            rate={monthHours[formattedDate]["rate"]}>
                        </HoursInputRow>
                    </div>
                )
            })}
            <ExpensesInputRow expensesTotal={expenses} setExpenses={setExpenses}></ExpensesInputRow>
            <button onClick={handleSubmit}>Submit</button>
            <h3>Total: £{total.toFixed(2)}</h3>
        </div>
    )
}
