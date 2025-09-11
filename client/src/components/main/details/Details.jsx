import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './Details.module.css';
import Spinner from '../spinner/Spinner';
import SkeletonDetails from '../../common/skeleton/SkeletonDetails';
import Comment from './Comment';

import { useGetOneTrade } from '../../../hooks/useTrades';
import { useForm } from '../../../hooks/useForm';
import { useCreateComment, useGetAllComments } from '../../../hooks/useComments';
import { useAuthContext } from '../../../contexts/AuthContext';
import { remove } from '../../../api/trades-api';
import ConfirmModal from '../../common/confirmModal/ConfirmModal';
import { useConfirm } from '../../../hooks/useConfirm';
import { useToast } from '../../../contexts/ToastContext.jsx';
import * as attachmentsAPI from '../../../api/attachments-api';
import { API_URL } from '../../../config';
import { formatMaybeNumber, formatInteger, formatDateISO } from '../../../utils/format';
import ImageLightbox from '../../common/lightbox/ImageLightbox.jsx';
import PageHeader from '../../common/page-header/PageHeader';

const initialValues = {
    comment: ''
}

export default function Details() {

    const [trade, setTrade, loading, setLoading] = useGetOneTrade();
    const [comments, setComments] = useGetAllComments(trade._id);
    const [attachments, setAttachments] = useState([]);
    const [viewerSrc, setViewerSrc] = useState(null);
    const [attToDelete, setAttToDelete] = useState(null);
    const { isAuthenticated, username, userId } = useAuthContext();
    const [showModal, setShowModal, cancel] = useConfirm();
    const [showAttModal, setShowAttModal, cancelAtt] = useConfirm();
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('details_tab') || 'details');
    useEffect(() => { localStorage.setItem('details_tab', activeTab); }, [activeTab]);
    const { addToast } = useToast();

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
            addToast('success', 'Comment added');
        } catch (error) {
            addToast('error', error?.message || 'Comment failed');
            console.log(error.message);
        }
    });

    const isOwner = userId === trade._ownerId;

    useEffect(() => {
        let active = true;
        if (!trade?._id) return;
        (async () => {
            try {
                const list = await attachmentsAPI.list(trade._id);
                if (!active) return;
                setAttachments(list);
            } catch (e) {
                console.error(e);
            }
        })();
        return () => { active = false };
    }, [trade?._id]);

    const tradeDeleteHandler = async () => {
        try {
            if (!isOwner) {
                alert('You are not the owner of this trade');
                return;
            }

            await remove(trade._id);
            addToast('success', 'Trade deleted');
            navigate('/trades');
        } catch (error) {
            addToast('error', error?.message || 'Delete failed');
            console.log(error.message);
        }
    };

    const onFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const created = await attachmentsAPI.upload(trade._id, file);
            setAttachments((prev) => [...prev, created]);
            addToast('success', 'Screenshot uploaded');
        } catch (err) {
            addToast('error', err?.message || 'Upload failed');
        } finally {
            e.target.value = '';
        }
    };

    const onRemoveAttachment = async (attId) => {
        try {
            await attachmentsAPI.remove(trade._id, attId);
            setAttachments((prev) => prev.filter(a => a._id !== attId));
        } catch (err) {
            addToast('error', err?.message || 'Delete failed');
        }
    };

    return (
        <>
            {loading ? (
                <SkeletonDetails />
            ) : (
                <div className={styles.detailsContainer}>
                    <PageHeader title="Trade Details" breadcrumbs={[{label:'Home', to:'/'},{label:'Trades', to:'/trades'},{label: trade.ticker || 'Details'}]} />
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${activeTab==='details'?styles.activeTab:''}`} onClick={()=> setActiveTab('details')}>Details</button>
                        <button className={`${styles.tab} ${activeTab==='attachments'?styles.activeTab:''}`} onClick={()=> setActiveTab('attachments')}>Screenshots ({attachments.length})</button>
                        <button className={`${styles.tab} ${activeTab==='comments'?styles.activeTab:''}`} onClick={()=> setActiveTab('comments')}>Comments ({comments.length})</button>
                    </div>
                    {activeTab==='attachments' && (
                    <section className={styles.attachments}>
                        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem'}}>
                            <h4>Screenshots</h4>
                            {isOwner && (
                                <label style={{cursor:'pointer'}}>
                                    <input type="file" accept="image/*" onChange={onFileSelect} style={{ display:'none' }} />
                                    <span className={styles.actionButton}>Upload</span>
                                </label>
                            )}
                        </header>
                        <div className={styles.attachmentsGrid}>
                            {attachments.length > 0 ? attachments.map(a => {
                                const base = API_URL.replace(/\/+$/, '');
                                const rel = (a.url || '').replace(/^\/+/, '/');
                                const fullUrl = /^https?:/i.test(a.url) ? a.url : `${base}${rel}`;
                                return (
                                    <div key={a._id} className={styles.thumb} onClick={() => setViewerSrc(fullUrl)}>
                                        <img src={fullUrl} alt={a.filename || 'screenshot'} />
                                        {isOwner && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setAttToDelete(a._id); setShowAttModal(true); }}
                                                title="Delete screenshot"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                );
                            }) : <p style={{color:'var(--muted)'}}>No screenshots</p>}
                        </div>
                    </section>
                    )}
                    {activeTab==='details' && (
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
                                <span className={styles.value}>{formatDateISO(trade.date)}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Trade Direction:</span>
                                <span className={styles.value}>{trade.trade_direction}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Entry Price:</span>
                                <span className={styles.value}>{formatMaybeNumber(trade.entry)}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Exit Price:</span>
                                <span className={styles.value}>{formatMaybeNumber(trade.exit)}</span>
                            </div>
                            <div className={styles.detailsItem}>
                                <span className={styles.label}>Volume:</span>
                                <span className={styles.value}>{formatInteger(trade.volume)}$</span>
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
                            {trade.strategy && (
                                <div className={styles.detailsItem}>
                                    <span className={styles.label}>Strategy:</span>
                                    <span className={styles.value}>{trade.strategy}</span>
                                </div>
                            )}
                            {Array.isArray(trade.tags) && trade.tags.length > 0 && (
                                <div className={styles.detailsItem}>
                                    <span className={styles.label}>Tags:</span>
                                    <span className={styles.value}>{trade.tags.join(', ')}</span>
                                </div>
                            )}
                        </article>
                        {isOwner && (<footer className={styles.detailsFooter}>
                            <Link to={`/trades/${trade._id}/edit`} className={styles.actionButton}>
                                <button className={styles.actionButton}>Edit</button>
                            </Link>
                            <button className={styles.actionButton} onClick={() => setShowModal(true)}>Delete</button>
                        </footer>)}
                    </section>
                    )}
                    {activeTab==='comments' && (
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
                    )}
                    {showModal && (
                        <ConfirmModal 
                         title='Delete trade details'
                         message='Are you sure you want to delete this trade?'
                         onClose={cancel}
                         onConfirm={tradeDeleteHandler}                       
                        />
                        )}
                    {showAttModal && (
                        <ConfirmModal
                          title='Delete screenshot'
                          message='Are you sure you want to delete this screenshot?'
                          onClose={cancelAtt}
                          onConfirm={async () => { await onRemoveAttachment(attToDelete); cancelAtt(); setAttToDelete(null); }}
                        />
                    )}
                </div>
            )}
            {viewerSrc && (
                <ImageLightbox src={viewerSrc} onClose={() => setViewerSrc(null)} />
            )}
        </>
    );
}
