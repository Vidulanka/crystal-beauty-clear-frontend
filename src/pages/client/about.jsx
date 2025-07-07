import Footer from "../../components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-pink-50 flex flex-col">
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-8 bg-white bg-opacity-90 rounded-3xl shadow-2xl mt-16 mb-12">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <img
              src="https://cvdfovhspaksxldsjrza.supabase.co/storage/v1/object/public/images//1750355602229"
              alt="Crystal Beauty Clear"
              className="w-40 h-40 rounded-full shadow-lg mb-6 md:mb-0 md:mr-8 border-4 border-teal-100"
            />
            <div>
              <h1 className="text-5xl font-extrabold text-teal-700 mb-2 text-center md:text-left">
                About Crystal Beauty Clear
              </h1>
              <p className="text-xl text-gray-700 font-light">
                Where clarity meets beauty — and confidence begins.
              </p>
            </div>
          </div>

          <section className="mb-8">
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              At <span className="font-semibold text-teal-700">Crystal Beauty Clear</span>, we believe true beauty shines from clarity — clear skin, clear confidence, and a clear commitment to quality. Our mission is to provide you with premium skincare and cosmetic products that help you reveal your natural radiance every day.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Our Commitment</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
              <li>
                <span className="font-semibold text-teal-700">Pure & Effective Ingredients:</span> Gentle yet powerful, for the best skin care.
              </li>
              <li>
                <span className="font-semibold text-teal-700">Cruelty-Free & Ethical:</span> Never tested on animals, always eco-friendly.
              </li>
              <li>
                <span className="font-semibold text-teal-700">Innovative Formulations:</span> Science and nature, working together for real results.
              </li>
              <li>
                <span className="font-semibold text-teal-700">For Every Skin Type:</span> Solutions for dry, oily, sensitive, and combination skin.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pink-600 mb-3">Why Choose Crystal Beauty Clear?</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              Your skin deserves clarity and care. We’re passionate about empowering you to feel confident and beautiful in your own skin with products that are safe, effective, and luxurious.
            </p>
            <p className="text-lg text-teal-700 mt-8 font-semibold text-center">
              Thank you for trusting Crystal Beauty Clear — where clarity meets beauty.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
