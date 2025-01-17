import { Link, useNavigate } from 'react-router-dom';

import styles from './Details.module.css';
import Spinner from '../spinner/Spinner';
import Comment from './Comment';

import { useGetOneTrade } from '../../../hooks/useTrades';
import { useForm } from '../../../hooks/useForm';
import { useCreateComment, useGetAllComments } from '../../../hooks/useComments';
import { useAuthContext } from '../../../contexts/AuthContext';
import { remove } from '../../../api/trades-api';
import ConfirmModal from '../../common/confirmModal/ConfirmModal';
import { useConfirm } from '../../../hooks/useConfirm';

const initialValues = {
    comment: ''
}

export default function Details() {

    const [trade, setTrade, loading, setLoading] = useGetOneTrade();
    const [comments, setComments] = useGetAllComments(trade._id);
    const { isAuthenticated, username, userId } = useAuthContext();
    const [showModal, setShowModal, cancel] = useConfirm();

    const navigate = useNavigate();
    const createComment = useCreateComment();

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, async (values) => {
        try {
            const newComment = await createComment(trade._id, values.comment);
            setComments(oldComments => [...oldComments, { ...newComment, author: { username } }]);
        } catch (error) {
            console.log(error.message);
        }
    });

    const isOwner = userId === trade._ownerId;

    const tradeDeleteHandler = async () => {
        try {
            if (!isOwner) {
                alert('You are not the owner of this trade');
                return;
            }

            await remove(trade._id);
            navigate('/trades');
        } catch (error) {
            console.log(error.message);
        }
    };

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
                        {isOwner && (<footer className={styles.detailsFooter}>
                            <Link to={`/trades/${trade._id}/edit`} className={styles.actionButton}>
                                <button className={styles.actionButton}>Edit</button>
                            </Link>
                            <button className={styles.actionButton} onClick={() => setShowModal(true)}>Delete</button>
                        </footer>)}
                    </section>
                    <section className={styles.commentsSection}>
                        <h4>Comments</h4>
                        <div className={styles.commentsList}>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <Comment key={comment._id} comment={comment} />
                                ))
                            ) : (
                                <p>Write the first comment</p>
                            )}
                        </div>
                        {isAuthenticated && (<> <label htmlFor="comment">Add a new comment</label>
                            <form className={styles.addComment} onSubmit={submitHandler}>
                                <textarea
                                    name='comment'
                                    placeholder="Add a comment"
                                    onChange={changeHandler}
                                    value={values.comment}
                                />
                                <button className={styles.actionButton}>Add Comment</button>
                            </form> </>)}
                    </section>
                    {showModal && (
                        <ConfirmModal 
                         title='Delete trade details'
                         message='Are you sure you want to delete this trade?'
                         onClose={cancel}
                         onConfirm={tradeDeleteHandler}                       
                        />
                        )}
                </div>
            )}
        </>
    );
}
