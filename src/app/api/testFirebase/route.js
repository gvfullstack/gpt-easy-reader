import { db } from "../../../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const testRef = doc(db, "testCollection", "testDoc");
        await setDoc(testRef, { message: "Firebase is working with App Router!" });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    return NextResponse.json({ message: "API is working!" });
}

