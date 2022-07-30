import { db } from "./firebase-config";
import { doc, query, where, addDoc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";


export async function getBillForCarerMonth(name, month) {
    const docRef = doc(db, month, name);
    const docSnap = await getDoc(docRef)
    var bill = {id: null, data: {}};
    if (docSnap.exists()) {
        bill.id = docSnap.id
        bill.data = docSnap.data()
    } else {
        console.error("No such document!");
    }
    return bill
}

export async function getRates(){
    const docRef = doc(db, "rates", "rates")
    const docSnap = await getDoc(docRef)
    var rates = {weekday: null, weekend: null, pubHol: null};
    if (docSnap.exists()) {
        rates.weekday = docSnap.data().weekday
        rates.weekend = docSnap.data().weekend
        rates.pubHol = docSnap.data().pubhol
    } else {
        console.error("No such document!");
    }
    return rates

}
export async function getNameById(nameId){
    const docRef = doc(db, "names", nameId)
    const docSnap = await getDoc(docRef)
    var name = null
    if(docSnap.exists()){
        name = docSnap.data().name
    }
    else{
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

export async function getAllMonthlyBills(monthYear) {
    console.log(monthYear)
    const bills = getDocsInCollection(monthYear)
    console.log(bills)
}

async function getDocsInCollection(collectionName) {
    const col = collection(db, collectionName);
    const colSnapshot = await getDocs(col);
    const docs = colSnapshot.docs.map(doc => doc.data());
    return docs
}
