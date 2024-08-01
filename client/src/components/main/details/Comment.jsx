import styles from './Comment.module.css';

function Comment({ author, text }) {
    return (
        <div className={styles.comment}>
            <h3 className={styles.commentAuthor}>{author}</h3>
            <p className={styles.commentText}>{text}</p>
        </div>
    );
}

export default Comment;
