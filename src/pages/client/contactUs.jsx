import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/contact", {
        name,
        email,
        message,
      });
      toast.success("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Name</span>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Email</span>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Message</span>
          <textarea
            placeholder="Your message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-pink-600 text-white py-3 rounded-lg font-semibold transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-700"
          }`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        <div>
            
        </div>
        
      </form>
    </div>
    
  );
}
