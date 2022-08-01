import { SingleCarerBill } from "./SingleCarerBill";
import { getAllDaysInMonth } from "../Utils/Dates";
import { useState, useEffect } from "react";
import { createMonthHoursJson } from "../Carer/monthBillsForm";
import { getAllMonthlyBills, getNameById } from "../Database/firestore";
import { getMonthYearString } from "../Utils/Dates";
import { namedQuery } from "firebase/firestore";

export const AllCarerBills = (props) => {

    const [monthlyBills, setMonthlyBills] = useState([{ id: "", data: createMonthHoursJson(props.dates, props.rates) }])

    useEffect(() => {
        getAllMonthlyBills(getMonthYearString(new Date())).then(
            (data) => {
                setMonthlyBills(data)
            }
        )
    }, [])

    // useEffect(() => {
    //     if (hasBillsUpdated) {
    //         monthlyBills.forEach(bill => {
    //             getNameById(bill["id"]).then((name) => {
    //                 setNames([...names, {id: bill["id"], name: name}])
    //             })
    //         })
    //     }
    // }, [monthlyBills])

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