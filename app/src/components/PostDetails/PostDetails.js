import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetails.module.css";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const [postRes, commentsRes] = await Promise.all([
          fetch(`https://dummyjson.com/posts/${postId}`),
          fetch(`https://dummyjson.com/posts/${postId}/comments`)
        ]);

        const postData = await postRes.json();
        const commentsData = await commentsRes.json();

        setPost(postData);
        setComments(commentsData.comments || []);
      } catch (error) {
        console.error("Failed to fetch post details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [postId]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.body}>{post.body}</p>
      <div className={styles.reactions}>
        <span><BsHandThumbsUp /> {post.reactions?.likes || 0} | <BsHandThumbsDown />  {post.reactions?.dislikes || 0}</span>
      </div>
      <h2>Comments</h2>
      <div className={styles.commentsSection}>
        <ul className={styles.commentList}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                <strong 
                  className={styles.commentUser}
                  onClick={() => navigate(`/profile/${comment.user.id}`)}
                >
                  {comment.user.username}
                </strong>: {comment.body}
              </li>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </ul>
      </div>
    </div>
  );
}