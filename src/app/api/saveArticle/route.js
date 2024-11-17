import { firestore } from "../../../../firebaseAdminConfig";
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

        // Generate a URL-safe document ID
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Replace ':' and '.' with '-'
        const safeTitle = title.replace(/[^a-zA-Z0-9]/g, "-"); // Replace non-alphanumeric characters with '-'
        const docId = `${safeTitle}-${timestamp}`;

        // Use Firebase Admin to save the document
        const docRef = firestore.collection("articles").doc(docId);
        await docRef.set({ title, content: articleContent });

        return NextResponse.json({ success: true, message: 'Article saved successfully.', id: docId, url: `https://gpt-easy-reader.vercel.app/${docId}`});
    } catch (error) {
        console.error("Error saving article:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
