import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactMessage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to view messages");
      setLoading(false);
      return;
    }

    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/contact/messages", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load contact messages");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/messages/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      toast.success("Message deleted successfully");
     
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete message");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-pink-600">Loading messages...</p>
      </div>
    );

  if (messages.length === 0)
    return (
      <div className="p-8 text-center text-gray-600 text-lg">
        No contact messages found.
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-pink-700 mb-8">Contact Messages</h1>
      <ul className="space-y-6">
        {messages.map(({ _id, name, email, message, createdAt }) => (
          <li
            key={_id}
            className="border border-pink-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex justify-between items-start"
          >
            <div>
              <p className="text-lg font-semibold text-pink-700">{name}</p>
              <p className="text-sm text-gray-500 mb-2">{email}</p>
              <p className="whitespace-pre-wrap text-gray-800">{message}</p>
              <p className="text-xs text-gray-400 mt-4">
                Sent on: {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(_id)}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              aria-label={`Delete message from ${name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
