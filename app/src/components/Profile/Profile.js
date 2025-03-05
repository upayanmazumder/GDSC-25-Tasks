import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import {BsBuilding} from "react-icons/bs";

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

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!user) return <p className={styles.error}>User not found.</p>;

  return (
    <div className={styles.profileContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      <h1 className={styles.name}>{user.firstName} {user.lastName}</h1>
      <img className={styles.profileImage} src={user.image} alt={`${user.firstName} ${user.lastName}`} width={100} />
      <p className={styles.info}><strong>{user.username}</strong> <br/> {user.email}</p>
      <p className={styles.info}>{user.phone} <br /> {user.address.address}, {user.address.city}</p>
      <p className={styles.info}><BsBuilding /> {user.company.name}</p>
    </div>
  );
}