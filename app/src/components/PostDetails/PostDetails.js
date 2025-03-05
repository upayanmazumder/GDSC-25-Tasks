import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const postRes = await fetch(`https://dummyjson.com/posts/${postId}`);
        const commentsRes = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
        
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
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div>
        <span>👍 {post.reactions?.likes || 0} | 👎 {post.reactions?.dislikes || 0}</span>
      </div>
      <h2>Comments</h2>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id}>
              <strong 
                style={{ color: "blue", cursor: "pointer" }} 
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
  );
}
