import { SingleCarerBill } from "./SingleCarerBill";
import { getAllDaysInMonth } from "../Utils/Dates";
import { useState, useEffect } from "react";
import { createMonthHoursJson } from "../Carer/monthBillsForm";
import { getAllMonthlyBills } from "../Database/firestore";
import { getMonthYearString } from "../Utils/Dates";

export const AllCarerBills = (props) => {

    const rates = { weekday: 0, weekend: 0 }
    var now = new Date();
    const dates = getAllDaysInMonth(now.getFullYear(), now.getMonth())
    const [monthlyBills, setMonthlyBills] = useState([{name: "", data: createMonthHoursJson(dates, rates)}])

    useEffect(() => {
        getAllMonthlyBills(getMonthYearString(new Date())).then(
            (data) => {
                setMonthlyBills(data)
            }
        )
    }, [])

    return (
        <div>
            <h2>Carer Bills</h2>
            {monthlyBills.map((bill) => {
                return (
                    <div style={{ clear: "both" }}>
                        <SingleCarerBill dates={dates} monthlyBill={bill}></SingleCarerBill>
                    </div>
                )
            })}

        </div>
    )
}