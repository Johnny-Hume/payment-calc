import { useEffect, useState } from "react"
import { createMonthHoursJson, populateRates } from "../Carer/monthBillsForm"
import { createCarerBillDoc, createCarerNameDoc, getRates } from "../Database/firestore"
import { formatDateToString } from "../Utils/Dates"

export const AddCarerForm = (props) => {

    const [name, setName] = useState("")
    const [monthHours, setMonthHours] = useState(createMonthHoursJson(props.dates, props.rates))
    const [carerRef, setCarerRef] = useState("")

    useEffect(() => {
        setMonthHours(populateRates(props.dates, monthHours, props.rates))
    })

    const handleNameChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCarerNameDoc(name, setCarerRef)
            .then((data) => {
                createCarerBillDoc(data, monthHours, props.monthYear)
                setCarerRef(data)
            }
            )
    }


    return (
        <div>
            <h3>Add new Carer</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}> */}
                    <p>Name</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => handleNameChange(e)}
                    />
                </div>
                <input type={"submit"}></input>
            </form>
            <h3>New Carer ID: {carerRef}</h3>
        </div>
    )
}