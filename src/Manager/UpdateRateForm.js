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
            .then(
                alert("Rates Updated Successfully")
            )
    }

    return (
        <div>
            <h3>Rates</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <p>Weekday rate</p>
                    <p>Weekend rate</p>
                    <input
                        type="text"
                        size={6}
                        maxLength={6}
                        value={rates.weekday}
                        style={{ fontSize: "16px" }}
                        onChange={(e) => onChangeWeekday(e)}
                    />
                    <input
                        type="text"
                        size={6}
                        maxLength={6}
                        value={rates.weekend}
                        style={{ fontSize: "16px" }}
                        onChange={(e) => onChangeWeekend(e)}
                    />
                </div>
                <input type={"submit"}></input>
            </form>
        </div>
    )
}