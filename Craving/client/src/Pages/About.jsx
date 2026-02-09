import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-(--color-background) to-white">

      {/* HERO SECTION */}
      <section className="py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">
          We Power Your <span className="text-(--color-primary)">Cravings</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600 text-lg">
          Cravings is a smart food discovery platform built to connect people,
          restaurants, and flavors — instantly.
        </p>
      </section>

      {/* STORY SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Food cravings don’t come with a schedule. They hit suddenly —
            late at night, during work breaks, or on lazy weekends. Cravings
            was created to solve one simple problem: finding the right food,
            at the right time, without effort.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold mb-4">
            What makes us different
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>⚡ Speed-first experience</li>
            <li>🍽️ Curated food & menus</li>
            <li>📊 Restaurant-friendly tools</li>
            <li>🧠 Smart discovery system</li>
          </ul>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-(--color-primary)">100+</h3>
            <p className="text-gray-600 mt-2">Restaurants</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-(--color-primary)">500+</h3>
            <p className="text-gray-600 mt-2">Dishes</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-(--color-primary)">10k+</h3>
            <p className="text-gray-600 mt-2">Happy Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-(--color-primary)">24/7</h3>
            <p className="text-gray-600 mt-2">Cravings Served</p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Our Mission
        </h2>
        <p className="max-w-3xl mx-auto mt-6 text-gray-700 text-lg">
          To turn food discovery into a seamless experience by combining
          technology, design, and love for food — helping users enjoy more and
          restaurants grow faster.
        </p>
      </section>

      {/* FOOTER LINE */}
      <section className="py-10 text-center border-t border-gray-200">
        <p className="text-lg font-semibold text-gray-900">
          Cravings — built for people who love food.
        </p>
      </section>

    </div>
  );
};

export default About;
