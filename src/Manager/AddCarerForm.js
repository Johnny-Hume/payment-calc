import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

    useEffect(() => {
    }, [carerRef])

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

    const url = window.location.href.split("/")[2]

    return (
        <div>
            <h3>Add new Carer</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}> */}
                    <p>Name</p>
                    <input
                        type="text"
                        style={{ fontSize: "16px" }}
                        value={name}
                        onChange={(e) => handleNameChange(e)}
                    />
                </div>
                <input type={"submit"}></input>
            </form>
            {carerRef != "" ?  <Link to={"/billing/" + carerRef} style={{color:"deepskyblue"}}>Go To Carer Page</Link> : <p></p>}
        </div>
    )
}