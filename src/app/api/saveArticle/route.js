import { db } from "../../../firebaseConfig"; // Adjust the path if your config file is in a different location
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Handler for POST request
export async function POST(request) {
    try {
        // Parse the request body to get title and articleContent
        const { title, articleContent } = await request.json();
        
        // Ensure both title and content are provided
        if (!title || !articleContent) {
            return NextResponse.json({ error: "Title and article content are required" }, { status: 400 });
        }

        // Define a document reference in Firestore using the title as a unique identifier
        const docRef = doc(db, "articles", title); // 'articles' is the collection name, title is the document ID

        // Save the document to Firestore
        await setDoc(docRef, { title, content: articleContent });

        // Send success response
        return NextResponse.json({ success: true, message: "Article saved successfully" });
    } catch (error) {
        // Send error response if there's an issue
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
