import React from 'react';
import Card from "../card/Card";
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles["flex-container"]}>
            <Card />
            <Card />
            <Card />
        </div>
    );
}


