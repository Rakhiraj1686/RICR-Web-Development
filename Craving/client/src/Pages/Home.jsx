import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Config/Api";
import {
  FaMagnifyingGlass,
  FaFire,
  FaPizzaSlice,
  FaBowlFood,
  FaStar,
  FaBurger,
  FaBolt,
  FaLeaf,
  FaHandPointer,
  FaShieldHeart,
  FaLocationDot,
  FaTruckFast,
  FaTag,
  FaGift,
  FaPercent,
  FaDrumstickBite,
  FaCarrot,
  FaIceCream,
  FaBowlRice,
} from "react-icons/fa6";

/* Small scroll-reveal hook — no extra dependency, respects prefers-reduced-motion via CSS. */
const useFadeIn = () => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const CATEGORY_ICON_TONES = ["primary", "secondary", "accent"];

const CATEGORIES = [
  { name: "Pizza", icon: <FaPizzaSlice /> },
  { name: "Burger", icon: <FaBurger /> },
  { name: "Indian", icon: <FaBowlRice /> },
  { name: "Chinese", icon: <FaBowlFood /> },
  { name: "Biryani", icon: <FaDrumstickBite /> },
  { name: "Desserts", icon: <FaIceCream /> },
  { name: "Fast Food", icon: <FaFire /> },
  { name: "Healthy Food", icon: <FaCarrot /> },
];

const OFFER_ICON_TONES = ["primary", "secondary", "accent", "primary"];

const OFFERS = [
  {
    title: "First Order Discount",
    text: "Get 50% off (up to ₹100) on your very first Craving order.",
    icon: <FaPercent />,
  },
  {
    title: "Free Delivery",
    text: "Enjoy zero delivery fees on orders above ₹299, all week long.",
    icon: <FaTruckFast />,
  },
  {
    title: "Weekend Offers",
    text: "Extra savings on Fri–Sun at handpicked partner restaurants.",
    icon: <FaTag />,
  },
  {
    title: "Special Combos",
    text: "Curated meal combos priced lower than ordering items apart.",
    icon: <FaGift />,
  },
];

const WHY_CHOOSE = [
  {
    title: "Fast Delivery",
    text: "Get your favorite food delivered quickly, right when you need it.",
    icon: <FaBolt />,
  },
  {
    title: "Fresh & Delicious",
    text: "Enjoy quality food from trusted, verified restaurant partners.",
    icon: <FaLeaf />,
  },
  {
    title: "Easy Ordering",
    text: "A simple, smooth ordering experience from browse to checkout.",
    icon: <FaHandPointer />,
  },
  {
    title: "Secure Payment",
    text: "Safe, encrypted, and convenient payment options every time.",
    icon: <FaShieldHeart />,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Choose",
    text: "Find your favorite restaurant or food from hundreds of options.",
  },
  {
    step: "02",
    title: "Order",
    text: "Add your favorite items to your cart and check out in seconds.",
  },
  {
    step: "03",
    title: "Enjoy",
    text: "Sit back while your food is delivered fresh to your doorstep.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  const heroRef = useFadeIn();
  const categoriesRef = useFadeIn();
  const restaurantsRef = useFadeIn();
  const offersRef = useFadeIn();
  const whyRef = useFadeIn();
  const howRef = useFadeIn();
  const ctaRef = useFadeIn();

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoadingRestaurants(true);
      try {
        const res = await api.get("/public/allRestaurants");
        setRestaurants(res.data.data || []);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Unable to load restaurants");
      } finally {
        setLoadingRestaurants(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return restaurants
      .filter(
        (r) =>
          r.restaurantName?.toLowerCase().includes(term) ||
          r.cuisine?.toLowerCase().includes(term),
      )
      .slice(0, 5);
  }, [query, restaurants]);

  const handleRestaurantClick = (restaurantInfo) => {
    navigate("/restaurantMenu", { state: restaurantInfo });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate("/order-now", { state: { search: query.trim() } });
  };

  const featuredRestaurants = restaurants.slice(0, 4);

  return (
    <main className="overflow-x-hidden bg-(--color-background) text-(--color-text)">
      {/* HERO */}
      <section
        ref={heroRef}
        className="fade-in-section relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--color-accent)/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-(--color-secondary)/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-(--color-accent) bg-white/70 px-4 py-1 text-sm font-semibold tracking-wide text-(--color-primary)">
              The New Craving Experience
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Delicious food,
              <span className="block text-(--color-primary)">
                delivered to your door.
              </span>
            </h1>
            <p className="max-w-xl text-base text-(--color-text-secondary) sm:text-lg">
              Discover top-rated restaurants, trending dishes, and real-time
              delivery tracking — all in one smooth, modern experience.
            </p>

            {/* Search */}
            <div ref={searchBoxRef} className="relative max-w-xl">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-full border border-(--color-accent) bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-(--color-primary)"
              >
                <FaMagnifyingGlass className="ml-2 shrink-0 text-(--color-text-secondary)" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search for restaurants, dishes or cuisines..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-(--color-text) outline-none sm:text-base"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-(--color-primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover) sm:px-6"
                >
                  Search
                </button>
              </form>

              {showSuggestions && query.trim() && (
                <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-(--color-accent)/60 bg-white shadow-lg">
                  {suggestions.length > 0 ? (
                    suggestions.map((r) => (
                      <button
                        key={r._id}
                        type="button"
                        onClick={() => handleRestaurantClick(r)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm hover:bg-(--color-background)"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                          <FaBowlFood size={14} />
                        </span>
                        <span>
                          <span className="block font-semibold">
                            {r.restaurantName}
                          </span>
                          <span className="block text-xs text-(--color-text-secondary)">
                            {r.cuisine}
                          </span>
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-(--color-text-secondary)">
                      No matches yet — press Search to browse all restaurants.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/order-now")}
                className="rounded-full bg-(--color-primary) px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
              >
                Explore Restaurants
              </button>
              <button
                onClick={() => navigate("/order-now")}
                className="rounded-full border border-(--color-primary) px-6 py-3 font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
              >
                Order Now
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">700+</p>
                <p className="text-sm text-(--color-text-secondary)">Partner kitchens</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">65K+</p>
                <p className="text-sm text-(--color-text-secondary)">Monthly orders</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold sm:text-3xl">17 min</p>
                <p className="text-sm text-(--color-text-secondary)">Avg prep time</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-(--color-accent) bg-white p-6 shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
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
                    <div className="h-2 rounded-full bg-(--color-accent)/40">
                      <div
                        className="h-2 rounded-full bg-(--color-primary) transition-all duration-700"
                        style={{ width: item.value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-(--color-background) p-4">
                <p className="text-sm font-semibold">Most reordered tonight</p>
                <p className="mt-1 text-xl font-bold">Paneer Tikka Wrap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        ref={categoriesRef}
        className="fade-in-section px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
              Browse
            </p>
            <h2 className="text-3xl font-extrabold">Popular Categories</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {CATEGORIES.map((cat, idx) => {
              const tone = CATEGORY_ICON_TONES[idx % CATEGORY_ICON_TONES.length];
              const toneClass =
                tone === "primary"
                  ? "text-(--color-primary)"
                  : tone === "secondary"
                    ? "text-(--color-secondary)"
                    : "text-(--color-accent)";
              return (
                <button
                  key={cat.name}
                  onClick={() => navigate("/order-now")}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-(--color-accent)/40 bg-(--color-card) p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-(--color-primary)/40 hover:shadow-lg"
                >
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-(--color-background) text-2xl transition group-hover:scale-110 ${toneClass}`}
                  >
                    {cat.icon}
                  </span>
                  <span className="text-sm font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR RESTAURANTS */}
      <section
        ref={restaurantsRef}
        className="fade-in-section bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
                Near You
              </p>
              <h2 className="text-3xl font-extrabold">
                Popular Restaurants Near You
              </h2>
            </div>
            <button
              onClick={() => navigate("/order-now")}
              className="rounded-full bg-(--color-secondary) px-5 py-2 text-sm font-semibold text-(--color-text) transition hover:bg-(--color-secondary-hover) hover:text-white"
            >
              View All
            </button>
          </div>

          {loadingRestaurants ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-72 animate-pulse rounded-2xl bg-(--color-background)"
                />
              ))}
            </div>
          ) : featuredRestaurants.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredRestaurants.map((r) => (
                <article
                  key={r._id}
                  onClick={() => handleRestaurantClick(r)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-accent)/50 bg-(--color-background) shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-40 overflow-hidden bg-(--color-accent)/30">
                    {r.photo?.url ? (
                      <img
                        src={r.photo.url}
                        alt={r.restaurantName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl text-(--color-primary)">
                        <FaBowlFood />
                      </div>
                    )}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-(--color-primary)">
                      Open Now
                    </span>
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="truncate font-bold">{r.restaurantName}</h3>
                    <p className="truncate text-sm text-(--color-text-secondary)">
                      {r.cuisine}
                    </p>
                    {r.address && (
                      <p className="flex items-center gap-1 truncate text-xs text-(--color-text-secondary)">
                        <FaLocationDot className="shrink-0" />
                        {r.address}
                      </p>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestaurantClick(r);
                      }}
                      className="mt-2 w-full rounded-full bg-(--color-primary) py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
                    >
                      View Menu
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-(--color-accent) bg-(--color-background) p-10 text-center text-(--color-text-secondary)">
              No restaurants are live yet — check back soon!
            </div>
          )}
        </div>
      </section>

      {/* OFFERS */}
      <section
        ref={offersRef}
        className="fade-in-section bg-(--color-section-light) px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
              Deals
            </p>
            <h2 className="text-3xl font-extrabold">
              Hungry? We've Got Something Special For You!
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFERS.map((offer, idx) => {
              const tone = OFFER_ICON_TONES[idx % OFFER_ICON_TONES.length];
              const toneClass =
                tone === "primary"
                  ? "text-(--color-primary)"
                  : tone === "secondary"
                    ? "text-(--color-secondary)"
                    : "text-(--color-accent)";
              return (
                <div
                  key={offer.title}
                  className="flex flex-col justify-between rounded-2xl border border-(--color-accent)/40 bg-(--color-card) p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-(--color-background) text-xl ${toneClass}`}
                    >
                      {offer.icon}
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{offer.title}</h3>
                    <p className="mt-2 text-sm text-(--color-text-secondary)">
                      {offer.text}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/order-now")}
                    className="mt-5 self-start rounded-full bg-(--color-secondary) px-4 py-2 text-sm font-semibold text-(--color-text) transition hover:bg-(--color-secondary-hover) hover:text-white"
                  >
                    Claim Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section
        ref={whyRef}
        className="fade-in-section bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
              Why Craving
            </p>
            <h2 className="text-3xl font-extrabold">Why Choose Craving</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-(--color-accent)/50 bg-(--color-background) p-6 text-center transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-(--color-primary) shadow-sm">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        ref={howRef}
        className="fade-in-section px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
              Simple Process
            </p>
            <h2 className="text-3xl font-extrabold">How It Works</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, idx) => (
              <div key={s.step} className="relative">
                <div className="rounded-2xl border border-(--color-accent)/50 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="text-4xl font-black text-(--color-primary)">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-(--color-text-secondary)">
                    {s.text}
                  </p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="mx-auto mt-3 hidden h-0.5 w-10 bg-(--color-accent) sm:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        ref={ctaRef}
        className="fade-in-section px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-(--color-primary) to-(--color-secondary) px-6 py-14 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--color-accent)/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Your next delicious meal is just a click away.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Join thousands of happy customers ordering from Craving every
              single day.
            </p>
            <button
              onClick={() => navigate("/order-now")}
              className="mt-7 rounded-full bg-white px-8 py-3 font-bold text-(--color-primary) transition hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-primary)"
            >
              Explore Restaurants
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
