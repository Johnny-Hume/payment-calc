import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { createMonthHoursJson, getMonthHoursFromBill, getTotalPriceForMonth } from "../Carer/monthBillsForm"
import { populateRates } from "../Carer/monthBillsForm"
import { getRates } from "../Database/firestore"
import { formatDateToString } from "../Utils/Dates"
import { getNameById } from "../Database/firestore"


const calcTotal = (hours, rate) => {
    const total = parseFloat(hours) * parseFloat(rate)
    if (isNaN(total)) {
        return 0
    }
    return total
}

export const SingleCarerBill = (props) => {

    const [monthlyBill, setMonthlyBill] = useState(props.monthlyBill["data"])
    const [name, setName] = useState("")

    useEffect(() => {
        if (props.monthlyBill["id"] != "") {
            getNameById(props.monthlyBill["id"])
                .then((name) => setName(name))
            setMonthlyBill(props.monthlyBill["data"])
        }
    }, [props.monthlyBill])

    useEffect(() => {
        getRates().then(
            (data) => {
                if(props.monthlyBill["id"] != ""){
                    const newLocal =  populateRates(props.dates, props.monthlyBill["data"], data) 
                    setMonthlyBill(newLocal)
                }
            }
        )


    }, [props.monthlyBill])

    return (
        <div>
            <h3>Name: {name}</h3>
            <Link to={"/billing/" + props.monthlyBill["id"]} style={{color:"deepskyblue"}}>Go To Carer Page</Link>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                <p>Date</p>
                <p>Hours</p>
                <p>Rate</p>
                <p>Total</p>
            </div>
            {props.dates.map((date) => {
                const formattedDate = formatDateToString(date)
                var hours = 0
                var rate = 0
                try {
                    hours = monthlyBill[formattedDate]["hours"]
                    rate = monthlyBill[formattedDate]["rate"]
                }
                finally {
                    return (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                            <p>{formattedDate}</p>
                            <p>{hours}</p>
                            <p>£{rate}</p>
                            <p> £{calcTotal(hours, rate)} </p>
                        </div>
                    )
                }
            }

            )}
            <p>Expenses: £{monthlyBill["expenses"]}</p>
            <h3>{props.name} Total: £{getTotalPriceForMonth(getMonthHoursFromBill(props.monthlyBill["data"]), monthlyBill["expenses"])}</h3>

        </div>
    )
}
