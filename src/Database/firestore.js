import { db } from "./firebase-config";
import { doc, query, where, addDoc, setDoc, collection, getDoc, getDocs, connectFirestoreEmulator } from "firebase/firestore";
import { useState } from "react";


export async function getBillForCarerMonth(name, month) {
    const docRef = doc(db, month, name);
    const docSnap = await getDoc(docRef)
    var bill = { id: "", data: {} };
    if (docSnap.exists()) {
        bill.id = docSnap.id
        bill.data = docSnap.data()
    } else {
        console.error("No such document!");
    }
    return bill
}

export async function createCarerNameDoc(name, setRef) {
    const docRef = await addDoc(collection(db, "names"), { name: name })
        .then((data) => {
            return data.id
            })
    return docRef
}

export async function createCarerBillDoc(id, billTemplate, formattedDate) {
    try {
        await setDoc(doc(db, formattedDate, id), billTemplate)
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export async function updateRates(rates) {
    try {
        await setDoc(doc(db, "rates", "rates"), rates)
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export async function getRates() {
    const docRef = doc(db, "rates", "rates")
    const docSnap = await getDoc(docRef)
    var rates = { weekday: null, weekend: null, pubHol: null };
    if (docSnap.exists()) {
        rates.weekday = docSnap.data().weekday
        rates.weekend = docSnap.data().weekend
        rates.pubHol = docSnap.data().pubhol
    } else {
        console.error("No such document!");
    }
    return rates

}
export async function getNameById(nameId) {
    const docRef = doc(db, "names", nameId)
    const docSnap = await getDoc(docRef)
    var name = null
    if (docSnap.exists()) {
        name = docSnap.data().name
    }
    else {
        console.error("No such document")
    }
    return name
}

export async function createMonthBill(monthHours, expenses, month, name) {
    try {
        const data = Object.assign({}, monthHours, { expenses: expenses })
        await setDoc(doc(db, month, name), data)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


export async function updateDate(date) {
    try {
        await setDoc(doc(db, "chosenDate", "chosenDate"), {chosenDate: date})
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getChosenDate() {
    const docRef = doc(db, "chosenDate", "chosenDate")
    const docSnap = await getDoc(docRef)
    var chosenDate = {chosenDate: new Date()}
    if (docSnap.exists()) {
        chosenDate.chosenDate = docSnap.data().chosenDate
    } else {
        console.error("No such document!");
    }
    return chosenDate

}

export async function getAllMonthlyBills(monthYear) {
    const col = collection(db, monthYear);
    const colSnapshot = await getDocs(col)
    const docs = colSnapshot.docs.map(doc => {
         return { id: doc.id, data: doc.data() } });
    return docs
}
