import React, { useEffect, useState } from "react";
import { getNameById } from "./firestore";
import { MonthBillsForm } from "./monthBillsForm";
import { useParams } from "react-router-dom";

export const CarerBillingPage = (props) => {

    const rates = { weekday: 5.32, weekend: 10.99 }
    const [name, setName] = useState("")
    const nameId = useParams().nameId

    useEffect(() => {
        getNameById(nameId)
        .then((name) => setName(name))
    }, [])

    return (
        <div style={{ clear: "both" }}>
            <h2>{name}'s monthly bill</h2>
            <MonthBillsForm name={name} rates={rates}></MonthBillsForm>
        </div>
    )
}
