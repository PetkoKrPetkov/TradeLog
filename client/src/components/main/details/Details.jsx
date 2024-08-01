
import styles from './Details.module.css';
import Spinner from '../spinner/Spinner';
import Comment from './Comment';

import { useGetOneTrade } from '../../../hooks/useTrades';

export default function Details() {

    const [trade, setTrade, loading, setLoading] = useGetOneTrade();

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.detailsContainer}>
                    <section className={styles.detailsCard}>
                        <header className={styles.detailsHeader}>
                            <h4>Trade Details</h4>
                        </header>
                        <article className={styles.detailsContent}>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Ticker:</span>
                                <span className={styles.value}>{trade.ticker}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Date:</span>
                                <span className={styles.value}>{trade.date}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Trade Direction:</span>
                                <span className={styles.value}>{trade.trade_direction}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Entry Price:</span>
                                <span className={styles.value}>{trade.entry}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Exit Price:</span>
                                <span className={styles.value}>{trade.exit}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Volume:</span>
                                <span className={styles.value}>{trade.volume}$</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Support:</span>
                                <span className={styles.value}>{trade.support}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>MA:</span>
                                <span className={styles.value}>{trade.ma}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Price Action:</span>
                                <span className={styles.value}>{trade.price_action}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Oscillators:</span>
                                <span className={styles.value}>{trade.oscilators}</span>
                            </div>
                        </article>
                        <footer className={styles.detailsFooter}>
                            <button className={styles.actionButton}>Edit</button>
                            <button className={styles.actionButton}>Delete</button>
                        </footer>
                    </section>
                    <section className={styles.commentsSection}>
                    <h4>Comments</h4>
                    <div className={styles.commentsList}>
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                    </div>
                    <div className={styles.addComment}>
                        <textarea
                            placeholder="Add a comment"
                        />
                        <button className={styles.actionButton}>Add Comment</button>
                    </div>
                </section>
                </div>
            )}
        </>
    );
}
