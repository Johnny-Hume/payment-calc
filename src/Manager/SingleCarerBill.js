import { useEffect, useState } from "react"
import { getAllMonthlyBills } from "../Database/firestore"
import { getMonthYearString } from "../Utils/Dates"
import { monthlyBill } from "../Domain/bill"
import { createMonthHoursJson, getMonthHoursFromBill, getTotalPriceForMonth } from "../Carer/monthBillsForm"
import { formatDateToString } from "../Utils/Dates"
import { getAllDaysInMonth } from "../Utils/Dates"


const calcTotal = (hours, rate) => {
    const total = parseFloat(hours) * parseFloat(rate)
    if(isNaN(total)){
        return 0
    }
    return total
}

export const SingleCarerBill = (props) => {

    const name = props.monthlyBill["name"]
    const monthlyBill = props.monthlyBill["data"]

    return (
        <div>
            <h3>{name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                <p>Date</p>
                <p>Hours</p>
                <p>Rate</p>
                <p>Total</p>
            </div>
            {props.dates.map((date) => {
                const formattedDate = formatDateToString(date)
                const hours = monthlyBill[formattedDate]["hours"]
                const rate = monthlyBill[formattedDate]["rate"]
                return (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                        <p>{formattedDate}</p>
                        <p>{hours}</p>
                        <p>{rate}</p>
                        <p> £{calcTotal(hours, rate)} </p>
                    </div>
                )
            }

            )}
            <p>Expenses: £{monthlyBill["expenses"]}</p>
            <h3>{name} Total: £{getTotalPriceForMonth(getMonthHoursFromBill(props.monthlyBill["data"]))}</h3>

        </div>
    )
}