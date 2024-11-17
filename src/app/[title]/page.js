import { db } from "../../../firebaseConfig"; // Adjust the path if necessary
import { doc, getDoc } from "firebase/firestore";
import ArticleRenderer from "./ArticleRenderer"; // Client Component

export default async function Page({ params }) {
    const { title } = params;

    try {
        // Fetch article data from Firestore
        const docRef = doc(db, "articles", title);
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
    