import { SingleCarerBill } from "./SingleCarerBill";
import { getAllDaysInMonth } from "../Utils/Dates";
import { useState, useEffect } from "react";
import { createMonthHoursJson, populateRates } from "../Carer/monthBillsForm";
import { getAllMonthlyBills, getNameById } from "../Database/firestore";
import { getMonthYearString } from "../Utils/Dates";
import { namedQuery } from "firebase/firestore";

export const AllCarerBills = (props) => {

    const [monthlyBills, setMonthlyBills] = useState([{ id: "", data: createMonthHoursJson(props.dates, props.rates) }])

    useEffect(() => {
        getAllMonthlyBills(getMonthYearString(props.chosenDate)).then(
            (data) => {
                setMonthlyBills(data)
            }
        )
    }, [props.chosenDate])

    return (
        <div>
            <h2>Carer Bills</h2>
            {monthlyBills.map((bill) => {
                return (
                    <div style={{ clear: "both" }}>
                        <SingleCarerBill dates={props.dates} monthlyBill={bill}></SingleCarerBill>
                    </div>
                )
            })}

        </div>
    )
}