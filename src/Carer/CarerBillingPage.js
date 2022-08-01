import React, { useEffect, useState } from "react";
import { getNameById, getRates } from "../Database/firestore";
import { MonthBillsForm } from "./monthBillsForm";
import { useParams } from "react-router-dom";

export const CarerBillingPage = (props) => {

    const [name, setName] = useState("")
    const nameId = useParams().nameId

    useEffect(() => {
        getNameById(nameId)
        .then((name) => setName(name))
    }, [])

    return (
        <div style={{ clear: "both" }}>
            <h2>{name}'s monthly bill</h2>
            <MonthBillsForm nameId={nameId}></MonthBillsForm>
        </div>
    )
}
