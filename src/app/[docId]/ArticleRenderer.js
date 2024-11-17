'use client';

import { useState } from "react";
import { marked } from "marked";
import styles from "./pageStyles.module.css";

export default function ArticleRenderer({ title, content }) {
    const [fontSize, setFontSize] = useState(16); // Default font size
    const [background, setBackground] = useState("dark"); // Default background color mode

    // Handle background mode toggling
    const toggleBackground = () => {
        const modes = ["dark", "white", "beige"];
        const currentIndex = modes.indexOf(background);
        const nextIndex = (currentIndex + 1) % modes.length;
        setBackground(modes[nextIndex]);
    };

    return (
        <div className={`${styles.container} ${styles[background]}`}>
            <div className={styles.controls}>
                <div className={styles.sliderContainer}>
                    <span className={styles.smallA}>A</span>
                    <input
                        type="range"
                        min="12"
                        max="100"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className={styles.slider}
                    />
                    <span className={styles.largeA}>A</span>
                </div>
                <button onClick={toggleBackground} className={styles.toggleButton}>
                    Toggle Background
                </button>
            </div>
            <h1 className={styles.title} style={{ fontSize: `${fontSize}px` }}>{title}</h1>
            <div
                className={styles.content}
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{ __html: marked(content) }}
            ></div>
        </div>
    );
}
