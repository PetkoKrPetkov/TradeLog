import styles from './Comment.module.css';

function Comment({ comment }) {
    return (
        <div className={styles.comment}>
            <h3 className={styles.commentAuthor}>{comment._ownerId}</h3>
            <p className={styles.commentText}>{comment.content}</p>
        </div>
    );
}

export default Comment;
