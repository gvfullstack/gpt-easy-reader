import { db } from "../../../firebaseConfig"; // Adjust the path if necessary
import { doc, getDoc } from "firebase/firestore";
import ArticleRenderer from "./ArticleRenderer"; // Client Component

export default async function Page({ params: promiseParams }) {
    try {
        // Await the params promise
        const params = await promiseParams;
        const { docId } = params; // Expect the full document ID in the parameters

        if (!docId) {
            throw new Error("Document ID is required to fetch the article.");
        }

        // Fetch article data from Firestore
        const docRef = doc(db, "articles", docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return (
                <div>
                    <h1>Article Not Found</h1>
                </div>
            );
        }

        const articleData = docSnap.data();

        // Pass the fetched article data to the Client Component
        return <ArticleRenderer title={articleData.title} content={articleData.content} />;
    } catch (error) {
        console.error("Error fetching article:", error);
        return (
            <div>
                <h1>Error fetching article</h1>
            </div>
        );
    }
}
