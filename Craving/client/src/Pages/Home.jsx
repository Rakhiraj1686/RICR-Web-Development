import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Config/Api";
import { Button, Card, SkeletonGrid, EmptyState } from "../Components/ui";
import RestaurantCard from "../Components/RestaurantCard";
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
  FaTruckFast,
  FaTag,
  FaGift,
  FaPercent,
  FaDrumstickBite,
  FaCarrot,
  FaIceCream,
  FaBowlRice,
  FaCircleCheck,
  FaArrowRightLong,
  FaUtensils,
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
    title: "First Order",
    text: "Get special savings the very first time you order on Craving.",
    icon: <FaPercent />,
  },
  {
    title: "Free Delivery",
    text: "Enjoy selected delivery offers on orders across partner kitchens.",
    icon: <FaTruckFast />,
  },
  {
    title: "Weekend Cravings",
    text: "Handpicked weekend promotions from your favorite restaurants.",
    icon: <FaTag />,
  },
  {
    title: "Combo Deals",
    text: "Curated meal combos priced lower than ordering items apart.",
    icon: <FaGift />,
  },
];

const WHY_CHOOSE = [
  {
    title: "Fast Delivery",
    text: "Get your food without unnecessary waiting.",
    icon: <FaBolt />,
  },
  {
    title: "Wide Variety",
    text: "Discover different cuisines and dishes.",
    icon: <FaLeaf />,
  },
  {
    title: "Quality Food",
    text: "Find food from restaurants you love.",
    icon: <FaHandPointer />,
  },
  {
    title: "Secure Ordering",
    text: "A simple and reliable ordering experience.",
    icon: <FaShieldHeart />,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Discover",
    text: "Find restaurants and dishes you love.",
  },
  {
    step: "02",
    title: "Order",
    text: "Choose your favorites and place your order.",
  },
  {
    step: "03",
    title: "Enjoy",
    text: "Sit back and enjoy your meal.",
  },
];

const EXPERIENCE_BENEFITS = [
  "Easy ordering",
  "Fast delivery",
  "Multiple restaurants",
  "Secure payments",
];

const Home = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  const heroRef = useFadeIn();
  const searchRef = useFadeIn();
  const categoriesRef = useFadeIn();
  const restaurantsRef = useFadeIn();
  const offersRef = useFadeIn();
  const whyRef = useFadeIn();
  const howRef = useFadeIn();
  const experienceRef = useFadeIn();
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
      .slice(0, 6);
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

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-(--color-accent) bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-wider text-(--color-primary)">
              Your Craving, Your Way
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Good Food Is Always
              <span className="block">
                a Good <span className="text-(--color-primary)">Craving</span>.
              </span>
            </h1>
            <p className="max-w-xl text-base text-(--color-text-secondary) sm:text-lg">
              Discover delicious meals from your favorite local restaurants
              and get them delivered right to your doorstep.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" onClick={() => navigate("/order-now")}>
                Explore Restaurants
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/order-now")}>
                Order Now
              </Button>
            </div>
          </div>

          {/* Right column — hero visual with floating cards */}
          <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-linear-to-br from-(--color-secondary) via-(--color-primary) to-(--color-primary-hover) shadow-2xl sm:h-80 sm:w-80">
              <div className="flex h-[86%] w-[86%] items-center justify-center rounded-full border-4 border-white/40 bg-white/10 backdrop-blur-sm">
                <FaUtensils className="text-6xl text-white drop-shadow-sm sm:text-7xl" aria-hidden="true" />
              </div>
            </div>

            {/* Rating card */}
            <div className="absolute -left-2 top-2 flex items-center gap-2 rounded-2xl border border-(--color-border) bg-white px-4 py-2.5 shadow-lg sm:-left-6 sm:top-6">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-accent)/30">
                <FaStar className="text-(--color-accent)" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold">4.8</p>
                <p className="text-[11px] text-(--color-text-secondary)">Loved by foodies</p>
              </div>
            </div>

            {/* Delivery card */}
            <div className="absolute -right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-2xl border border-(--color-border) bg-white px-4 py-2.5 shadow-lg sm:-right-8">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                <FaBolt />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold">25–30 min</p>
                <p className="text-[11px] text-(--color-text-secondary)">Fast delivery</p>
              </div>
            </div>

            {/* Food / price card */}
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-(--color-border) bg-white px-4 py-2.5 shadow-lg sm:bottom-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-secondary)/20 text-(--color-secondary)">
                <FaBowlFood />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold">Your favorite meal</p>
                <p className="text-[11px] text-(--color-text-secondary)">Starting ₹249</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section
        ref={searchRef}
        className="fade-in-section px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            What are you craving today?
          </h2>
          <p className="mt-2 text-sm text-(--color-text-secondary) sm:text-base">
            Search across restaurants, dishes and cuisines near you.
          </p>

          <div ref={searchBoxRef} className="relative mx-auto mt-6 max-w-xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-full border border-(--color-accent) bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-(--color-primary)"
            >
              <FaMagnifyingGlass className="ml-2 shrink-0 text-(--color-text-secondary)" aria-hidden="true" />
              <label htmlFor="home-search" className="sr-only">
                Search for restaurants, dishes or cuisines
              </label>
              <input
                id="home-search"
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for restaurants, dishes or cuisines..."
                className="min-w-0 flex-1 bg-transparent py-2 text-left text-sm text-(--color-text) outline-none sm:text-base"
              />
              <Button type="submit" size="md" className="shrink-0">
                Search
              </Button>
            </form>

            {showSuggestions && query.trim() && (
              <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-(--color-accent)/60 bg-white text-left shadow-lg">
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
            <h2 className="text-3xl font-extrabold">Explore by Category</h2>
          </div>

          <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
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
                  className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border border-(--color-accent)/40 bg-(--color-card) p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-(--color-primary)/40 hover:shadow-lg sm:w-auto"
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
              <h2 className="text-3xl font-extrabold">Popular Near You</h2>
              <p className="mt-1 text-sm text-(--color-text-secondary)">
                Discover the places everyone is craving.
              </p>
            </div>
            <Button variant="secondary" size="md" onClick={() => navigate("/order-now")}>
              View All
            </Button>
          </div>

          {loadingRestaurants ? (
            <SkeletonGrid count={4} className="sm:grid-cols-2 lg:grid-cols-4" />
          ) : featuredRestaurants.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredRestaurants.map((r) => (
                <RestaurantCard key={r._id} restaurant={r} onOpen={handleRestaurantClick} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<FaBowlFood />}
              title="No restaurants are live yet"
              description="Check back soon — new kitchens are joining Craving all the time."
            />
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
              Cravings Come With Rewards
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
                <Card
                  key={offer.title}
                  interactive
                  className="flex flex-col justify-between p-6"
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
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-5 self-start"
                    onClick={() => navigate("/order-now")}
                  >
                    Claim Now
                  </Button>
                </Card>
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
            <h2 className="text-3xl font-extrabold">Why Craving?</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <Card key={item.title} interactive className="p-6 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--color-background) text-2xl text-(--color-primary) shadow-sm">
                  {item.icon}
                </span>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  {item.text}
                </p>
              </Card>
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
            <h2 className="text-3xl font-extrabold">From Craving to Doorstep</h2>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-stretch">
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.step}>
                <Card interactive className="flex-1 p-6 text-center">
                  <span className="text-4xl font-black text-(--color-primary)">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-(--color-text-secondary)">
                    {s.text}
                  </p>
                </Card>
                {idx < STEPS.length - 1 && (
                  <div className="flex items-center justify-center text-(--color-accent) sm:rotate-0">
                    <FaArrowRightLong className="hidden text-2xl sm:block" aria-hidden="true" />
                    <FaArrowRightLong className="block rotate-90 text-2xl sm:hidden" aria-hidden="true" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER EXPERIENCE */}
      <section
        ref={experienceRef}
        className="fade-in-section bg-(--color-section-light) px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-full bg-linear-to-br from-(--color-primary) via-(--color-secondary) to-(--color-accent) shadow-xl sm:h-72 sm:w-72 lg:order-2">
            <div className="flex h-[82%] w-[82%] items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
              <FaBowlFood className="text-7xl text-white drop-shadow-sm sm:text-8xl" aria-hidden="true" />
            </div>
          </div>

          <div className="lg:order-1">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Your Favorite Food, Just a Few Clicks Away
            </h2>
            <p className="mt-3 max-w-md text-(--color-text-secondary)">
              From browsing to your doorstep, Craving keeps every step simple
              so you can focus on the part that matters most — enjoying your
              meal.
            </p>
            <ul className="mt-6 space-y-3">
              {EXPERIENCE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm font-medium">
                  <FaCircleCheck className="shrink-0 text-(--color-primary)" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={() => navigate("/order-now")} className="mt-7">
              Start Ordering
            </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        ref={ctaRef}
        className="fade-in-section px-4 pb-20 pt-16 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-r from-(--color-primary) to-(--color-secondary) px-6 py-14 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--color-accent)/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to Satisfy Your Craving?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Your next delicious meal is just a few clicks away.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/order-now")}
              className="mt-7 !bg-white !text-(--color-primary) hover:!bg-white/90"
            >
              Explore Restaurants
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;