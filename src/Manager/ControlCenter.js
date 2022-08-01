import { AddCarerForm } from "./AddCarerForm"
import { AllCarerBills } from "./AllCarerBills"
import { UpdateRateForm } from "./UpdateRateForm"
import { useEffect, useState } from "react"
import { getRates } from "../Database/firestore"
import { getAllDaysInMonth, getMonthYearString } from "../Utils/Dates"

export const ControlCenter = (props) => {

    var now = new Date();
    let dates = getAllDaysInMonth(now.getFullYear(), now.getMonth())
    const [rates, setRates] = useState({ weekday: 0, weekend: 0 })

    useEffect(() => {
        getRates().then(
            (data) => {
                setRates(prevState => ({
                    ...prevState,
                    weekday: data.weekday,
                    weekend: data.weekend,
                }))
            }
        )
    }, [])

    return (
        <div>
            <AddCarerForm monthYear={getMonthYearString(now)} dates={dates} rates={rates}></AddCarerForm>
            <UpdateRateForm></UpdateRateForm>
            <AllCarerBills dates={dates} rates={rates}></AllCarerBills>
        </div>
    )
}