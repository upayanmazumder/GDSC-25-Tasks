import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address.address}, {user.address.city}</p>
      <p>Company: {user.company.name}</p>
      <img src={user.image} alt={`${user.firstName} ${user.lastName}`} width={100} />
    </div>
  );
}
