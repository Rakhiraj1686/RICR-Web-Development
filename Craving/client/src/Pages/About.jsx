import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#fdf4e8] via-[#fff8f0] to-[#fffdf9] text-[#2b221d] font-['Poppins',ui-sans-serif,system-ui,sans-serif]">
      <section className="relative overflow-hidden px-6 pb-14 pt-20 sm:px-10 sm:pt-24">
        <div className="pointer-events-none absolute -top-20 right-0 h-64 w-64 rounded-full bg-[#ff9966]/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-4 left-0 h-56 w-56 rounded-full bg-[#f7c66a]/25 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 inline-block rounded-full border border-[#f8c8a5] bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#cc5d2c]">
            About Cravings
          </p>
          <h1 className="max-w-4xl text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-6xl font-['Playfair_Display',Georgia,serif]">
            We Power Your <span className="text-[#d1602f]">Cravings</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5f4d40] sm:text-lg">
            Cravings is a smart food discovery platform built to connect people,
            restaurants, and flavors instantly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:px-10 md:grid-cols-2 md:items-stretch">
        <div className="rounded-3xl border border-[#f0ddca] bg-white/80 p-7 shadow-sm backdrop-blur-sm sm:p-9">
          <h2 className="mb-4 text-3xl font-black tracking-tight font-['Playfair_Display',Georgia,serif]">
            Our Story
          </h2>
          <p className="text-base leading-relaxed text-[#564639] sm:text-lg">
            Food cravings do not come with a schedule. They hit suddenly late
            at night, during work breaks, or on lazy weekends. Cravings was
            created to solve one simple problem: finding the right food, at the
            right time, without effort.
          </p>
        </div>

        <div className="rounded-3xl border border-[#f0ddca] bg-linear-to-br from-white via-[#fff8f3] to-[#fff2e7] p-7 shadow-sm sm:p-9">
          <h3 className="mb-5 text-2xl font-black tracking-tight">What makes us different</h3>
          <ul className="space-y-3 text-base font-medium text-[#564639] sm:text-lg">
            <li className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ffe5d3] text-sm font-bold text-[#d1602f]">01</span>
              Speed-first experience
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ffe5d3] text-sm font-bold text-[#d1602f]">02</span>
              Curated food and menus
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ffe5d3] text-sm font-bold text-[#d1602f]">03</span>
              Restaurant-friendly tools
            </li>
            <li className="flex items-center gap-3 rounded-xl bg-white/75 px-4 py-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ffe5d3] text-sm font-bold text-[#d1602f]">04</span>
              Smart discovery system
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#f0ddca] bg-white p-5 text-center shadow-sm">
            <h3 className="text-3xl font-black text-[#d1602f] sm:text-4xl">100+</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#6e5a4c]">Restaurants</p>
          </div>
          <div className="rounded-2xl border border-[#f0ddca] bg-white p-5 text-center shadow-sm">
            <h3 className="text-3xl font-black text-[#d1602f] sm:text-4xl">500+</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#6e5a4c]">Dishes</p>
          </div>
          <div className="rounded-2xl border border-[#f0ddca] bg-white p-5 text-center shadow-sm">
            <h3 className="text-3xl font-black text-[#d1602f] sm:text-4xl">10k+</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#6e5a4c]">Happy Users</p>
          </div>
          <div className="rounded-2xl border border-[#f0ddca] bg-white p-5 text-center shadow-sm">
            <h3 className="text-3xl font-black text-[#d1602f] sm:text-4xl">24/7</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#6e5a4c]">Cravings Served</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-4 text-center sm:px-10 sm:pb-20">
        <div className="rounded-3xl border border-[#f0ddca] bg-white/80 px-6 py-10 shadow-sm">
          <h2 className="text-3xl font-black tracking-tight font-['Playfair_Display',Georgia,serif]">
            Our Mission
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#5f4d40] sm:text-lg">
            To turn food discovery into a seamless experience by combining
            technology, design, and love for food, helping users enjoy more and
            restaurants grow faster.
          </p>
        </div>
      </section>

      <section className="border-t border-[#f0ddca] px-6 py-8 text-center sm:px-10">
        <p className="text-base font-bold text-[#3f3128] sm:text-lg">
          Cravings built for people who love food.
        </p>
      </section>
    </div>
  );
};

export default About;


