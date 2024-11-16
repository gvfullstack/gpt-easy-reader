import { firestore } from "../../../../firebaseAdminConfig"; // Adjust path if necessary
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Validate API Key
        const apiKey = request.headers.get("x-api-key");
        if (apiKey !== process.env.API_KEY) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse the request body
        const { title, articleContent } = await request.json();

        if (!title || !articleContent) {
            return NextResponse.json({ error: "Title and article content are required" }, { status: 400 });
        }

        // Use Firebase Admin to save the document
        const docRef = firestore.collection("articles").doc(title);
        await docRef.set({ title, content: articleContent });

        return NextResponse.json({ success: true, message: "Article saved successfully" });
    } catch (error) {
        console.error("Error saving article:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
