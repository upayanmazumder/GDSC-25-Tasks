import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PostFeed.module.css";
import { BsEye, BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";

const POSTS_PER_PAGE = 10;
const MAX_BODY_LENGTH = 200;

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("likes");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      });
  }, []);

  useEffect(() => {
    let filtered = posts.filter((post) => post.body.toLowerCase().includes(search.toLowerCase()));

    switch (sortBy) {
      case "likes":
        filtered.sort((a, b) => b.reactions.likes - a.reactions.likes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredPosts(filtered);
  }, [search, sortBy, posts]);

  const truncateText = (text, maxLength) => (text.length > maxLength ? text.slice(0, maxLength) + "..." : text);

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.select}>
          <option value="likes">Most Liked</option>
          <option value="views">Most Viewed</option>
          <option value="title-asc">A-Z</option>
          <option value="title-desc">Z-A</option>
        </select>
      </div>
      <div className={styles.postList}>
        {paginatedPosts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className={styles.postLink}>
            <div className={styles.postCard}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.postBody}>{truncateText(post.body, MAX_BODY_LENGTH)}</p>
              <div className={styles.postStats}>
                <span><BsHandThumbsUp /> {post.reactions?.likes || 0} <BsHandThumbsDown /> {post.reactions?.dislikes || 0}</span>
                <span><BsEye /> {post.views}</span>
              </div>
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>#{tag} </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={styles.button}
        >
          Previous
        </button>
        <span className={styles.pageNumber}>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE)))}
          disabled={currentPage * POSTS_PER_PAGE >= filteredPosts.length}
          className={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
}
