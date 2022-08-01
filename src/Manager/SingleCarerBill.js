import { useEffect, useState } from "react"
import { createMonthHoursJson, getMonthHoursFromBill, getTotalPriceForMonth } from "../Carer/monthBillsForm"
import { formatDateToString } from "../Utils/Dates"
import { getNameById } from "../Database/firestore"


const calcTotal = (hours, rate) => {
    const total = parseFloat(hours) * parseFloat(rate)
    if(isNaN(total)){
        return 0
    }
    return total
}

export const SingleCarerBill = (props) => {

    const monthlyBill = props.monthlyBill["data"]
    const [name, setName] = useState("")

    useEffect(() => {
        getNameById(props.monthlyBill["id"])
        .then((name) => setName(name, console.log(name)))
    }, [props.monthlyBill])

    return (
        <div>
            <h3>Name: {name}</h3>
            <h3>CarerId: {props.monthlyBill["id"]}</h3>
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
            <p>Expenses: {monthlyBill["expenses"]}</p>
            <h3>{props.name} Total: {getTotalPriceForMonth(getMonthHoursFromBill(props.monthlyBill["data"]))}</h3>

        </div>
    )
}