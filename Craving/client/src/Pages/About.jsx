import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBowlFood,
  FaBolt,
  FaHeart,
  FaLock,
  FaStar,
  FaTruckFast,
  FaCompass,
  FaCartShopping,
  FaUtensils,
  FaShop,
  FaMotorcycle,
  FaLeaf,
  FaClock,
} from "react-icons/fa6";

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

const FEATURES = [
  {
    title: "Variety",
    text: "Discover a wide range of cuisines and dishes from restaurants near you.",
    icon: <FaUtensils />,
  },
  {
    title: "Fast & Convenient",
    text: "Order your favorite food in just a few clicks, whenever a craving hits.",
    icon: <FaBolt />,
  },
  {
    title: "Quality",
    text: "Connect with restaurants that care about great food and consistent quality.",
    icon: <FaHeart />,
  },
  {
    title: "Secure",
    text: "Enjoy a safe, reliable ordering and payment experience every time.",
    icon: <FaLock />,
  },
];

const STEPS = [
  {
    step: "01",
    title: "Discover",
    text: "Browse restaurants and dishes you'll love, sorted by what you're craving.",
    icon: <FaCompass />,
  },
  {
    step: "02",
    title: "Order",
    text: "Choose your favorites, add them to your cart, and check out in seconds.",
    icon: <FaCartShopping />,
  },
  {
    step: "03",
    title: "Enjoy",
    text: "Sit back while your order makes its way straight to your door.",
    icon: <FaBowlFood />,
  },
];

const HIGHLIGHTS = [
  { label: "Local Restaurants", icon: <FaShop /> },
  { label: "Fresh Food", icon: <FaLeaf /> },
  { label: "Easy Ordering", icon: <FaBolt /> },
  { label: "Reliable Delivery", icon: <FaTruckFast /> },
];

const About = () => {
  const navigate = useNavigate();

  const storyRef = useFadeIn();
  const missionRef = useFadeIn();
  const featuresRef = useFadeIn();
  const stepsRef = useFadeIn();
  const highlightsRef = useFadeIn();
  const partnerRef = useFadeIn();
  const riderRef = useFadeIn();
  const experienceRef = useFadeIn();
  const ctaRef = useFadeIn();

  return (
    <main className="overflow-x-hidden bg-(--color-background) text-(--color-text)">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--color-accent)/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-52 h-64 w-64 rounded-full bg-(--color-secondary)/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-(--color-accent) bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-(--color-primary)">
              About Craving
            </p>
            <h1 className="font-[\'Fraunces\',serif] text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              More than food.
              <span className="block text-(--color-primary)">It's an experience.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              Craving connects you with the food you love, bringing delicious
              meals from local restaurants straight to your doorstep.
            </p>
            <button
              onClick={() => navigate("/order-now")}
              className="rounded-full bg-(--color-primary) px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
            >
              Explore Restaurants
            </button>
          </div>

          {/* Signature food composition — built from tokens/icons since no food photography exists in the project */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[36px] bg-linear-to-br from-(--color-primary) to-(--color-secondary) p-8 shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-10">
              <div className="flex h-44 items-center justify-center rounded-3xl bg-white/15 text-7xl text-white backdrop-blur-sm sm:h-52">
                <FaBowlFood />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white/80">
                Tonight's craving
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                Loaded Butter Chicken Bowl
              </p>
            </div>

            <div className="absolute -bottom-8 -left-6 flex items-center gap-3 rounded-2xl border border-(--color-border) bg-white px-5 py-3 shadow-lg sm:-left-10">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                <FaStar />
              </span>
              <div>
                <p className="text-xs text-(--color-text-secondary)">Top rated</p>
                <p className="text-sm font-bold">4.8 average</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 flex items-center gap-3 rounded-2xl border border-(--color-border) bg-white px-5 py-3 shadow-lg sm:-right-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                <FaTruckFast />
              </span>
              <div>
                <p className="text-xs text-(--color-text-secondary)">Delivered</p>
                <p className="text-sm font-bold">Right to your door</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section
        ref={storyRef}
        className="fade-in-section px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Our Story
            </p>
            <h2 className="mt-3 font-[\'Fraunces\',serif] text-3xl font-black tracking-tight sm:text-4xl">
              Food cravings don't wait for a schedule.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              They hit suddenly, late at night, during a work break, or on a
              lazy weekend. Craving was built to solve one simple problem:
              finding the right food, at the right time, without the effort.
            </p>
            <p className="mt-4 text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              We connect people with local restaurants they'll love, turning a
              simple craving into a meal that arrives exactly when you want
              it.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto flex h-72 w-full max-w-md items-center justify-center rounded-[36px] border border-(--color-border) bg-linear-to-br from-white via-(--color-section-light) to-(--color-background) shadow-sm sm:h-80">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white text-5xl text-(--color-primary) shadow-md sm:h-36 sm:w-36 sm:text-6xl">
                <FaHeart />
              </div>
              <span className="absolute left-6 top-6 h-3 w-3 rounded-full bg-(--color-accent)" />
              <span className="absolute bottom-8 right-10 h-4 w-4 rounded-full bg-(--color-secondary)" />
              <span className="absolute right-6 top-10 h-2 w-2 rounded-full bg-(--color-primary)" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section
        ref={missionRef}
        className="fade-in-section bg-(--color-section-light) px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-4xl bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-(--color-accent)/25 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-(--color-primary)/15 blur-2xl" />
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
            Our Mission
          </p>
          <h2 className="relative mt-3 font-[\'Fraunces\',serif] text-2xl font-black italic tracking-tight sm:text-3xl">
            "Making great food accessible, convenient and enjoyable for
            everyone."
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
            We believe ordering food should feel effortless. That means
            giving people an easy way to discover new places, and giving
            restaurants the tools to reach more customers without friction.
          </p>
        </div>
      </section>

      {/* ================= WHY CHOOSE CRAVING ================= */}
      <section
        ref={featuresRef}
        className="fade-in-section px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Why Craving
            </p>
            <h2 className="mt-2 font-[\'Fraunces\',serif] text-3xl font-black tracking-tight sm:text-4xl">
              Why Choose Craving?
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-(--color-border) bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-background) text-xl text-(--color-primary)">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-(--color-text-secondary)">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section
        ref={stepsRef}
        className="fade-in-section bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Simple Process
            </p>
            <h2 className="mt-2 font-[\'Fraunces\',serif] text-3xl font-black tracking-tight sm:text-4xl">
              From Craving to Doorstep
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {STEPS.map((s, idx) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--color-background) text-2xl text-(--color-primary)">
                  {s.icon}
                </div>
                <span className="mt-4 text-4xl font-black text-(--color-accent)">
                  {s.step}
                </span>
                <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm text-(--color-text-secondary)">
                  {s.text}
                </p>

                {idx < STEPS.length - 1 && (
                  <div className="mt-4 h-8 w-0.5 bg-(--color-border) sm:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section
        ref={highlightsRef}
        className="fade-in-section px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              What You Get
            </p>
            <h2 className="mt-2 font-[\'Fraunces\',serif] text-3xl font-black tracking-tight sm:text-4xl">
              Craving, By Design
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                className="flex flex-col items-center gap-3 rounded-2xl border border-(--color-border) bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-background) text-xl text-(--color-primary)">
                  {h.icon}
                </span>
                <span className="text-sm font-semibold">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESTAURANT PARTNERS ================= */}
      <section
        ref={partnerRef}
        className="fade-in-section px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-4xl border border-(--color-border) bg-white p-8 shadow-sm sm:p-12 lg:flex-row lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--color-background) text-xl text-(--color-primary) lg:mx-0">
              <FaShop />
            </span>
            <h2 className="mt-4 font-[\'Fraunces\',serif] text-2xl font-black tracking-tight sm:text-3xl">
              Grow Your Restaurant With Craving
            </h2>
            <p className="mt-3 text-base leading-relaxed text-(--color-text-secondary)">
              Reach more customers and manage your online orders in one
              simple dashboard, built for restaurants of every size.
            </p>
          </div>
          <button
            onClick={() => navigate("/register")}
            className="shrink-0 rounded-full bg-(--color-primary) px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-(--color-primary-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
          >
            Partner With Us
          </button>
        </div>
      </section>

      {/* ================= RIDER SECTION ================= */}
      <section
        ref={riderRef}
        className="fade-in-section px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl rounded-4xl bg-(--color-section-light) p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-(--color-primary)">
                <FaMotorcycle />
              </span>
              <h2 className="mt-4 font-[\'Fraunces\',serif] text-2xl font-black tracking-tight sm:text-3xl">
                Deliver More With Craving
              </h2>
              <p className="mt-3 text-base leading-relaxed text-(--color-text-secondary)">
                Join our rider network and turn your time into earnings, on a
                platform built to make every delivery straightforward.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="mt-6 rounded-full border border-(--color-primary) px-7 py-3 font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
              >
                Join as a Rider
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  <FaClock />
                </span>
                <div>
                  <p className="font-semibold">Flexible delivery</p>
                  <p className="text-sm text-(--color-text-secondary)">
                    Ride on your own schedule.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  <FaCartShopping />
                </span>
                <div>
                  <p className="font-semibold">Easy order management</p>
                  <p className="text-sm text-(--color-text-secondary)">
                    Clear pickup and drop-off details, every time.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  <FaLock />
                </span>
                <div>
                  <p className="font-semibold">Reliable platform</p>
                  <p className="text-sm text-(--color-text-secondary)">
                    Built to keep every delivery on track.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CUSTOMER EXPERIENCE ================= */}
      <section
        ref={experienceRef}
        className="fade-in-section px-4 py-16 text-center sm:px-6 lg:px-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
          Made Around Your Cravings
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-[\'Fraunces\',serif] text-3xl font-black italic leading-tight tracking-tight sm:text-4xl">
          Your food. Your choice. Your moment.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
          Whatever you're in the mood for, Craving is built to get you there
          faster, so the only thing left to do is enjoy it.
        </p>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section ref={ctaRef} className="fade-in-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-r from-(--color-primary) to-(--color-secondary) px-6 py-14 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--color-accent)/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-[\'Fraunces\',serif] text-3xl font-black tracking-tight sm:text-4xl">
              Ready to Satisfy Your Craving?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Discover delicious food from your favorite restaurants and
              order your next meal today.
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

export default About;