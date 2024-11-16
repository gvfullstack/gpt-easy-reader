'use client';

import { db } from "../../../../firebaseConfig"; // Adjust the path if necessary
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { marked } from "marked";
import styles from "./pageStyles.module.css";

export default function Page({ params }) {
    const { title } = params;

    const [article, setArticle] = useState(null);
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [background, setBackground] = useState("dark"); // Default background color mode

    useEffect(() => {
        // Fetch article from Firestore
        async function fetchArticle() {
            try {
                const docRef = doc(db, "articles", title);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setArticle(docSnap.data());
                } else {
                    setArticle({ error: "Article Not Found" });
                }
            } catch (error) {
                console.error("Error fetching article:", error);
                setArticle({ error: "Error fetching article" });
            }
        }
        fetchArticle();
    }, [title]);

    // Handle background mode toggling
    const toggleBackground = () => {
        const modes = ["dark", "white", "beige"];
        const currentIndex = modes.indexOf(background);
        const nextIndex = (currentIndex + 1) % modes.length;
        setBackground(modes[nextIndex]);
    };

    if (!article) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (article.error) {
        return <div className={styles.error}>{article.error}</div>;
    }

    return (
        <div className={`${styles.container} ${styles[background]}`}>
            <div className={styles.controls}>
                <div className={styles.sliderContainer}>
                    <span className={styles.smallA}>A</span>
                    <input
                        type="range"
                        min="12"
                        max="36"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className={styles.slider}
                    />
                    <span className={styles.largeA}>A</span>
                </div>
                <button onClick={toggleBackground} className={styles.toggleButton}>
                    Toggle Background
                </button>
            </div>
            <h1 className={styles.title} style={{ fontSize: `${fontSize}px` }}>{article.title}</h1>
            <div
                className={styles.content}
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: marked(article.content) }}
            ></div>
        </div>
    );
}
