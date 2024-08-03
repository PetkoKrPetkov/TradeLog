import styles from './Comment.module.css';

function Comment({ comment }) {
    console.log(comment.author.username);
    return (
        <div className={styles.comment}>
            <h3 className={styles.commentAuthor}>{comment.author.username}</h3>
            
            <p className={styles.commentText}>{comment.content}</p>
        </div>
    );
}

export default Comment;
