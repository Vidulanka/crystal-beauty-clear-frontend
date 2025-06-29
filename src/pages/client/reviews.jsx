import { useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    { id: 1, name: "kavindu", rating: 5, comment: "Amazing products! Highly recommend." },
    { id: 2, name: "nethmi", rating: 4, comment: "Good quality and fast delivery." },
  ]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  function submitReview(e) {
    e.preventDefault();
    if (!name || !comment) return;
    const newReview = {
      id: reviews.length + 1,
      name,
      rating,
      comment,
    };
    setReviews([newReview, ...reviews]);
    setName("");
    setRating(5);
    setComment("");
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-700 mb-6 text-center">Customer Reviews</h1>

      <form onSubmit={submitReview} className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
            placeholder="Your name"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-semibold">Rating</span>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-6">
          <span className="text-gray-700 font-semibold">Comment</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-pink-300 p-2 focus:border-pink-600 focus:ring focus:ring-pink-200"
            placeholder="Write your review"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-6">
        {reviews.map(({ id, name, rating, comment }) => (
          <div key={id} className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-pink-700">{name}</h3>
              <div className="text-yellow-400 font-bold">{Array(rating).fill("★").join("")}</div>
            </div>
            <p className="text-gray-700">{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
