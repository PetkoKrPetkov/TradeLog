import Card from "../card/Card";
import styles from './Catalog.module.css';

export default function Catalog() {
    return (
        <div className={styles["flex-container"]}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}