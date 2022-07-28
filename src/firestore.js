import { db } from "./firebase-config";
import { doc, addDoc, setDoc, collection, getDocs } from "firebase/firestore/lite";

export async function createMonthBill(monthHours, expenses, month, name) {
    try {
        const data = Object.assign({}, monthHours, {expenses: expenses})
        const docRef = await setDoc(doc(db, month, name), data)
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getAllMonthlyBills(monthYear){
    const bills = getDocsInCollection(monthYear)
    console.log(bills)
}

async function getRatesDocs() {
    const rates = getDocsInCollection('rates')
    return rates
}

export async function getRates() {
    const rates = {
        weekday: null,
        weekend: null,
        pubHol: null
    }
    const ratesDocs = getRatesDocs();
    rates.weekday = (await ratesDocs).at(0)["WeekdayRate"];
    rates.weekend = (await ratesDocs).at(0)["WeekendRate"];
    rates.pubHol = (await ratesDocs).at(0)["PubHolRate"];
    return rates
}

async function getDocsInCollection(collectionName) {
    const col = collection(db, collectionName);
    const colSnapshot = await getDocs(col);
    const docs = colSnapshot.docs.map(doc => doc.data());
    return docs
}