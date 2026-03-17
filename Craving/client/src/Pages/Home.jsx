import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const foodHighlights = [
    {
      id: 1,
      title: "Smoky Tandoor Bowls",
      subtitle: "Charred, juicy, and loaded with flavor",
      eta: "22-28 min",
      badge: "Chef Pick",
      icon: "🔥",
    },
    {
      id: 2,
      title: "Street-Style Pizza Slices",
      subtitle: "Thin crust, bubbling cheese, spicy drizzle",
      eta: "18-24 min",
      badge: "Trending",
      icon: "🍕",
    },
    {
      id: 3,
      title: "Wok Tossed Noodles",
      subtitle: "High heat, crunchy veggies, bold sauces",
      eta: "20-30 min",
      badge: "Hot Now",
      icon: "🍜",
    },
  ];

  const topPicks = [
    {
      id: 1,
      name: "Butter Chicken Over Rice",
      restaurant: "Mitti Oven",
      price: 299,
      rating: 4.8,
      image: "🍛",
    },
    {
      id: 2,
      name: "Pepper Burst Pizza",
      restaurant: "Slice Social",
      price: 349,
      rating: 4.7,
      image: "🍕",
    },
    {
      id: 3,
      name: "Garlic Chilli Noodles",
      restaurant: "Wok Theory",
      price: 249,
      rating: 4.6,
      image: "🍜",
    },
    {
      id: 4,
      name: "Double Smash Burger",
      restaurant: "Stack Shack",
      price: 199,
      rating: 4.5,
      image: "🍔",
    },
  ];

  const serviceFlow = [
    {
      id: 1,
      title: "Pick your vibe",
      text: "Comfort, spicy, healthy, late-night: choose from curated mood collections.",
    },
    {
      id: 2,
      title: "Track in real time",
      text: "Live kitchen-to-doorstep timeline with smart ETA updates.",
    },
    {
      id: 3,
      title: "Repeat in one tap",
      text: "Your favorites stay saved so re-ordering is instant.",
    },
  ];

  return (
    <main className="bg-[#f8f1e4] text-[#3d2f2f]">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-[#b98a8a] bg-[#f3dfd6] px-4 py-1 text-sm font-semibold tracking-wide">
              The New Craving Experience
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Food delivery,
              <span className="block text-[#8b5e5e]">designed like a vibe.</span>
            </h1>
            <p className="max-w-xl text-base text-[#5b4a4a] sm:text-lg">
              Skip boring lists. Discover flavor lanes, quick picks, and real-time
              delivery flow in one smooth experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/order-now")}
                className="rounded-full bg-[#8b5e5e] px-6 py-3 font-semibold text-white transition hover:bg-[#734d4d]"
              >
                Start Ordering
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="rounded-full border border-[#8b5e5e] px-6 py-3 font-semibold text-[#8b5e5e] transition hover:bg-[#f4e4dc]"
              >
                Talk to Team
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">700+</p>
                <p className="text-sm text-[#6f5d5d]">Partner kitchens</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">65K+</p>
                <p className="text-sm text-[#6f5d5d]">Monthly orders</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">17 min</p>
                <p className="text-sm text-[#6f5d5d]">Avg prep time</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-4xl border border-[#d7bbb0] bg-[#fff9f2] p-6 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#8b5e5e]">
                Live Hunger Meter
              </p>
              <div className="mt-5 space-y-3">
                {[
                  { label: "Spicy", value: "92%" },
                  { label: "Cheesy", value: "78%" },
                  { label: "Healthy", value: "61%" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f2dfd7]">
                      <div
                        className="h-2 rounded-full bg-[#8b5e5e]"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[#f3e4db] p-4">
                <p className="text-sm font-semibold">Most reordered tonight</p>
                <p className="mt-1 text-xl font-bold">Paneer Tikka Wrap 🌯</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-5 -left-5 text-5xl">🍟</div>
            <div className="pointer-events-none absolute -right-3 -top-6 text-5xl">🥗</div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#8b5e5e]">
                Spotlight
              </p>
              <h2 className="text-3xl font-extrabold">Flavor Lanes</h2>
            </div>
            <button
              onClick={() => navigate("/order-now")}
              className="rounded-full bg-[#e8d0c6] px-5 py-2 text-sm font-semibold text-[#5a4141] transition hover:bg-[#ddbeb1]"
            >
              View Full Menu
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {foodHighlights.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-[#dec2b8] bg-[#fffaf4] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="rounded-full bg-[#f2dfd7] px-3 py-1 text-xs font-bold text-[#734d4d]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6f5d5d]">{item.subtitle}</p>
                <p className="mt-4 text-sm font-semibold text-[#8b5e5e]">
                  ETA {item.eta}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff7ef] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#8b5e5e]">
              Most Ordered
            </p>
            <h2 className="text-3xl font-extrabold">Top Picks You Should Try</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topPicks.map((dish) => (
              <article
                key={dish.id}
                className="rounded-2xl border border-[#e4cec5] bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-4xl">{dish.image}</span>
                  <span className="text-sm font-semibold">⭐ {dish.rating}</span>
                </div>
                <h3 className="font-bold">{dish.name}</h3>
                <p className="text-sm text-[#6f5d5d]">{dish.restaurant}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-extrabold text-[#8b5e5e]">₹{dish.price}</p>
                  <button className="rounded-full bg-[#8b5e5e] px-3 py-1 text-sm font-semibold text-white transition hover:bg-[#734d4d]">
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-4xl border border-[#ddc2b7] bg-[#fffaf5] p-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#8b5e5e]">
              How it Works
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">From craving to doorstep</h2>
            <p className="mt-3 text-[#6f5d5d]">
              Built for speed and clarity, so you always know what is cooking and
              when it reaches you.
            </p>
          </div>
          <div className="space-y-4">
            {serviceFlow.map((step) => (
              <div
                key={step.id}
                className="rounded-2xl border border-[#ecd8ce] bg-white p-4"
              >
                <p className="text-sm font-semibold text-[#8b5e5e]">Step {step.id}</p>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="text-sm text-[#6f5d5d]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 rounded-3xl bg-[#8b5e5e] px-6 py-10 text-center text-white sm:px-10 lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-extrabold">Hungry right now?</h2>
            <p className="mt-2 text-[#f9ece7]">
              Open the menu and place your order in less than a minute.
            </p>
          </div>
          <button
            onClick={() => navigate("/order-now")}
            className="rounded-full bg-white px-7 py-3 font-bold text-[#734d4d] transition hover:bg-[#f8ede8]"
          >
            Order in One Tap
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
