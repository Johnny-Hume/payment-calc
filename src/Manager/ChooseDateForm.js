import { updateDate } from "../Database/firestore"


export const ChooseDateForm = (props) => {

    const handleChange = (e) => {
        props.setChosenDate(new Date(e.target.value))
        updateDate(e.target.value)
    }
    return (
        <div>
            <input type={"date"} onChange={(e) => { handleChange(e) }}
                value={props.chosenDate.toISOString().split('T')[0]}>
            </input>
        </div>
    )
}