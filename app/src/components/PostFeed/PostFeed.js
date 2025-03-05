import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 10;

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

  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="likes">Most Liked</option>
          <option value="views">Most Viewed</option>
          <option value="title-asc">A-Z</option>
          <option value="title-desc">Z-A</option>
        </select>
      </div>
      <div>
        {paginatedPosts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div>
                <span>👍 {post.reactions?.likes || 0} | 👎 {post.reactions?.dislikes || 0}</span>
                <span>👁️ {post.views}</span>
              </div>
              <div>
                {post.tags.map((tag) => (
                  <span key={tag}>#{tag} </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE)))}
          disabled={currentPage * POSTS_PER_PAGE >= filteredPosts.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
