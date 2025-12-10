import React from "react";
import Modal from "../ui/Modal";

export default function UsersList() {
  const [showModal, setShowModal] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const fetchUserData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      setUserData(data);
      setShowModal(true); // Open modal after fetching
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={fetchUserData} disabled={loading}>
        {loading ? "Loading..." : "Show User Info"}
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {userData ? (
          <div>
            <h2>{userData.name}</h2>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </Modal>
    </div>
  );
}
