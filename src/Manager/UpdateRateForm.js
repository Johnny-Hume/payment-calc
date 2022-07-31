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
        updateRates(rates)
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            <form onSubmit={handleSubmit}>
                <p>Weekday rate</p>
                <input
                    type="text"
                    value={rates.weekday}
                    onChange={(e) => onChangeWeekday(e)}
                />
                <p>Weekend rate</p>
                <input
                    type="text"
                    value={rates.weekend}
                    onChange={(e) => onChangeWeekend(e)}
                />
                <input type={"submit"}></input>
            </form>
        </div>
    )
}