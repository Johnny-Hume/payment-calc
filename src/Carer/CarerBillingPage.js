import React, { useEffect, useState } from "react";
import { getNameById, getRates } from "../Database/firestore";
import { MonthBillsForm } from "./monthBillsForm";
import { useParams } from "react-router-dom";
import { getChosenDate } from "../Database/firestore";

export const CarerBillingPage = (props) => {

    const [name, setName] = useState("")
    const nameId = useParams().nameId
    const [chosenDate, setChosenDate] = useState("")

    useEffect(() => {
        getNameById(nameId)
            .then((name) => setName(name))
        getChosenDate().then(
            (data) => {
                setChosenDate(new Date(data["chosenDate"]))
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
    if (name == null){
        return (
            <div>
                <p>This link is invalid. Please ensure the URL after /billing/ is correct</p>
            </div>
        )
    }
    return (
        <div style={{ clear: "both" }}>
            <h2>{name}'s monthly bill</h2>
            <MonthBillsForm chosenDate={chosenDate} nameId={nameId}></MonthBillsForm>
        </div>
    )
}
