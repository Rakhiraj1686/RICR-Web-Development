import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../Config/Api";
import {
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FaBowlFood } from "react-icons/fa6";

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

// Reuses the same placeholder contact details already shown in the site Footer,
// rather than inventing new/different ones.
const CONTACT_CARDS = [
  {
    icon: <FiMail />,
    title: "Email Us",
    text: "For general questions and support.",
    value: "support@craving.app",
  },
  {
    icon: <FiPhone />,
    title: "Call Us",
    text: "For urgent assistance.",
    value: "+91 98765 43210",
  },
  {
    icon: <FiMapPin />,
    title: "Visit Us",
    text: "Our team's home base.",
    value: "Bhopal, Madhya Pradesh, India",
  },
  {
    icon: <FiClock />,
    title: "Support Hours",
    text: "We're around most of the week.",
    value: "Mon – Sun, 9:00 AM – 9:00 PM",
  },
];

const FAQS = [
  {
    q: "How can I track my order?",
    a: "Once an order is placed, you can see its live status from the Order section of your dashboard.",
  },
  {
    q: "What should I do if my order is delayed or has an issue?",
    a: "Reach out to us using the form on this page or your dashboard's Help Desk, and our team will help sort it out.",
  },
  {
    q: "How can I cancel an order?",
    a: "Contact support as soon as possible after placing an order. Whether it can be cancelled depends on how far along the restaurant is with preparing it.",
  },
  {
    q: "How can I become a restaurant partner?",
    a: "Create an account and choose \"Restaurant Manager\" during registration to get started.",
  },
  {
    q: "How can I become a delivery partner?",
    a: "Create an account and choose \"Partner\" during registration to sign up as a rider.",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [openFaq, setOpenFaq] = useState(null);

  const cardsRef = useFadeIn();
  const formRef = useFadeIn();
  const faqRef = useFadeIn();
  const ctaRef = useFadeIn();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", subject: "", query: "" });
    setErrors({});
    setStatus("idle");
  };

  const validate = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "Please enter your name.";
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!formData.subject.trim())
      next.subject = "Please let us know what this is about.";
    if (!formData.query.trim()) next.query = "Please enter a message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitContact = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await Api.post("/public/new-contact", formData);
      toast.success(res.data.message || "Message sent successfully");
      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  return (
    <main className="overflow-x-hidden bg-(--color-background) text-(--color-text)">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-(--color-accent)/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-64 w-64 rounded-full bg-(--color-secondary)/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-(--color-accent) bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-(--color-primary)">
              Get In Touch
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              We'd Love to <span className="text-(--color-primary)">Hear From You</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-(--color-text-secondary) sm:text-lg">
              Have a question, feedback, or need help with your order? Our
              team is here to help.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="flex h-56 items-center justify-center rounded-4xl bg-linear-to-br from-(--color-primary) to-(--color-secondary) text-7xl text-white shadow-xl sm:h-64">
              <FaBowlFood />
            </div>
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-(--color-border) bg-white px-5 py-3 shadow-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                <FiCheckCircle />
              </span>
              <div>
                <p className="text-xs text-(--color-text-secondary)">Always here</p>
                <p className="text-sm font-bold">Real people, real help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO CARDS ================= */}
      <section
        ref={cardsRef}
        className="fade-in-section px-4 pb-14 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-(--color-border) bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-(--color-background) text-lg text-(--color-primary)">
                {c.icon}
              </span>
              <h3 className="mt-4 font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-(--color-text-secondary)">{c.text}</p>
              <p className="mt-3 text-sm font-semibold">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAIN CONTACT SECTION ================= */}
      <section
        ref={formRef}
        className="fade-in-section px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-4xl border border-(--color-border) shadow-sm md:grid-cols-2">
          <div className="hidden flex-col justify-center bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) p-12 text-white md:flex">
            <h2 className="text-4xl font-extrabold leading-tight">Let's Talk.</h2>
            <p className="mt-5 max-w-sm text-white/85">
              Fill out the form and we'll get back to you as soon as
              possible. Whether it's a quick question or detailed feedback,
              we want to hear it.
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 md:p-12">
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600">
                  <FiCheckCircle />
                </span>
                <h3 className="mt-5 text-2xl font-bold">
                  Message Sent Successfully!
                </h3>
                <p className="mt-2 max-w-sm text-(--color-text-secondary)">
                  Thanks for reaching out. Our team will get back to you
                  soon.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 rounded-full border border-(--color-primary) px-6 py-2.5 font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : status === "error" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl text-red-500">
                  <FiAlertCircle />
                </span>
                <h3 className="mt-5 text-2xl font-bold">Something went wrong</h3>
                <p className="mt-2 max-w-sm text-(--color-text-secondary)">
                  Please try again in a moment.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 rounded-full bg-(--color-primary) px-6 py-2.5 font-semibold text-white transition hover:bg-(--color-primary-hover) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold">Send Us a Message</h2>
                <p className="mt-2 text-(--color-text-secondary)">
                  Fill out the form and we'll get back to you as soon as
                  possible.
                </p>

                <form onSubmit={submitContact} noValidate className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your name"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={`h-14 w-full rounded-xl border-2 px-5 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.fullName
                          ? "border-red-400 focus:border-red-500"
                          : "border-(--color-border) focus:border-(--color-primary)"
                      }`}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" className="mt-1.5 text-sm text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`h-14 w-full rounded-xl border-2 px-5 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-(--color-border) focus:border-(--color-primary)"
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-semibold">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="What can we help you with?"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={`h-14 w-full rounded-xl border-2 px-5 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.subject
                          ? "border-red-400 focus:border-red-500"
                          : "border-(--color-border) focus:border-(--color-primary)"
                      }`}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-sm text-red-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="query" className="mb-2 block text-sm font-semibold">
                      Message
                    </label>
                    <textarea
                      id="query"
                      name="query"
                      rows="5"
                      placeholder="Tell us how we can help..."
                      value={formData.query}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      aria-invalid={!!errors.query}
                      aria-describedby={errors.query ? "query-error" : undefined}
                      className={`w-full resize-none rounded-xl border-2 px-5 py-4 transition focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 ${
                        errors.query
                          ? "border-red-400 focus:border-red-500"
                          : "border-(--color-border) focus:border-(--color-primary)"
                      }`}
                    />
                    {errors.query && (
                      <p id="query-error" className="mt-1.5 text-sm text-red-600">
                        {errors.query}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-(--color-primary) text-lg font-bold text-white shadow-sm transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2"
                  >
                    {status === "loading" ? (
                      "Sending..."
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section
        ref={faqRef}
        className="fade-in-section px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-(--color-primary)">
              Help Center
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-(--color-border) bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-inset"
                  >
                    {item.q}
                    <FiChevronDown
                      className={`shrink-0 text-(--color-text-secondary) transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-(--color-text-secondary)">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SUPPORT CTA ================= */}
      <section ref={ctaRef} className="fade-in-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-r from-(--color-primary) to-(--color-secondary) px-6 py-14 text-center text-white sm:px-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-(--color-accent)/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Need Help With Your Order?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              We're here to make your Craving experience better.
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

export default Contact;