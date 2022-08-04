import { AddCarerForm } from "./AddCarerForm"
import { AllCarerBills } from "./AllCarerBills"
import { UpdateRateForm } from "./UpdateRateForm"
import { useEffect, useState } from "react"
import { getChosenDate, getRates, updateDate } from "../Database/firestore"
import { getAllDaysInMonth, getMonthYearString } from "../Utils/Dates"
import { ChooseDateForm } from "./ChooseDateForm"

export const ControlCenter = (props) => {

    const [chosenDate, setChosenDate] = useState("")
    const [dates, setDates] = useState([])
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
        getChosenDate().then(
            (data) => {
                const newDate = new Date(data["chosenDate"])
                setChosenDate(newDate)
                setDates(getAllDaysInMonth(newDate.getFullYear(), newDate.getMonth()))
            }
        )
    }, [])


    if(chosenDate == ""){
        return (
            <div>
                <h3>Loading</h3>
            </div>
        )
    }
    return (
        <div>
            <h1>Control Centre</h1>
            <h2>{getMonthYearString(chosenDate)}</h2>
            <AddCarerForm monthYear={getMonthYearString(chosenDate)} dates={dates} rates={rates}></AddCarerForm>
            <ChooseDateForm chosenDate={chosenDate} setChosenDate={setChosenDate}></ChooseDateForm>
            <UpdateRateForm></UpdateRateForm>
            <AllCarerBills chosenDate={chosenDate} dates={dates} rates={rates}></AllCarerBills>
        </div>
    )
}