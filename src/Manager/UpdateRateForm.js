import { useState, useEffect } from "react"
import { getRates, updateRates } from "../Database/firestore"
export const UpdateRateForm = (props) => {

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
    }, []
    )

    const onChangeWeekday = (event) => {
        event.preventDefault()
        setRates(prevState => ({
            ...prevState,
            weekday: event.target.value
        }))
    }

    const onChangeWeekend = (event) => {
        event.preventDefault()
        setRates(prevState => ({
            ...prevState,
            weekend: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("Submitted\nClick Ok to save rates")
        updateRates(rates)
    }

    return (
        <div>
        {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}> */}
        <h3>Rates</h3>
            <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <p>Weekday rate</p>
                <p>Weekend rate</p>
                <input
                    type="text"
                    value={rates.weekday}
                    onChange={(e) => onChangeWeekday(e)}
                />
                <input
                    type="text"
                    value={rates.weekend}
                    onChange={(e) => onChangeWeekend(e)}
                />
                </div>
                <input type={"submit"}></input>
            </form>
        </div>
    )
}