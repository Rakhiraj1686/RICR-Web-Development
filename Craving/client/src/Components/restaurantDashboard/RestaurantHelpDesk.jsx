import React, { useRef, useState } from "react";
import {
  FaLifeRing,
  FaPhoneAlt,
  FaEnvelope,
  FaBoxOpen,
  FaUtensils,
  FaWallet,
  FaUserShield,
  FaChevronDown,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { useAuth } from "../../context/AuthContext";
import { Card, Input, Button } from "../ui";

// Same placeholder contact details used everywhere else in the app.
const SUPPORT_PHONE = "+91 98765 43210";
const SUPPORT_EMAIL = "support@craving.app";

const ISSUE_CATEGORIES = [
  { title: "Orders", subtitle: "Cancellations, disputes, order issues", icon: <FaBoxOpen />, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { title: "Menu", subtitle: "Item uploads, pricing, availability", icon: <FaUtensils />, iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  { title: "Payout", subtitle: "Earnings, settlement questions", icon: <FaWallet />, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { title: "Account", subtitle: "Login, profile, restaurant details", icon: <FaUserShield />, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
];

// Kept to answers about features that actually exist in this app —
// no claims about ticket SLAs or live agents that aren't real.
const FAQS = [
  {
    question: "How do I update my menu?",
    answer: "Go to the Menu tab to add, edit, or toggle availability of your dishes.",
  },
  {
    question: "How do I see my earnings?",
    answer: "The Earnings tab shows revenue from your delivered, paid orders and recent transactions.",
  },
  {
    question: "How do I respond to a new order?",
    answer: "Open the Orders tab — new orders appear as Pending and can be accepted or refused from there.",
  },
];

const RestaurantHelpDesk = () => {
  const { user } = useAuth();
  const formRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.restaurantName || user?.fullName || "",
    email: user?.email || "",
    subject: "",
    query: "",
  });
  const [errors, setErrors] = useState({});

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const handleCategoryClick = (title) => {
    setForm((prev) => ({ ...prev, subject: title }));
    scrollToForm();
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    if (!form.subject.trim()) next.subject = "Let us know what this is about.";
    if (!form.query.trim()) next.query = "Please describe the issue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await api.post("/public/new-contact", form);
      toast.success(res?.data?.message || "Thanks for reaching out — we'll get back to you soon.");
      setForm({ fullName: user?.restaurantName || user?.fullName || "", email: user?.email || "", subject: "", query: "" });
      setErrors({});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-(--color-background) p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-400 space-y-5">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-[28px] bg-(--color-text) p-6 shadow-xl sm:p-8">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-(--color-primary)/20 blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-orange-300">
              <FaLifeRing />
              Restaurant Support
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Help Desk</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
              Reach our team about orders, menu, payouts, or your account — we'll follow up by
              email.
            </p>
          </div>
        </div>

        {/* CONTACT CHANNELS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card interactive className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg">
              <FaPhoneAlt />
            </div>
            <h3 className="mt-4 font-bold text-(--color-text)">Call Support</h3>
            <p className="mt-1.5 text-sm text-(--color-text-secondary)">{SUPPORT_PHONE}</p>
            <a href={`tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`} className="focus-ring mt-4 inline-flex h-8 items-center justify-center rounded-[var(--radius-pill)] border border-(--color-border-strong) px-3 text-xs font-semibold text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)">
              Call Now
            </a>
          </Card>
          <Card interactive className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500 text-lg">
              <FaEnvelope />
            </div>
            <h3 className="mt-4 font-bold text-(--color-text)">Email Support</h3>
            <p className="mt-1.5 text-sm text-(--color-text-secondary)">{SUPPORT_EMAIL}</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="focus-ring mt-4 inline-flex h-8 items-center justify-center rounded-[var(--radius-pill)] border border-(--color-border-strong) px-3 text-xs font-semibold text-(--color-text) hover:border-(--color-primary) hover:text-(--color-primary)">
              Send Email
            </a>
          </Card>
          <Card interactive className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
              <FaPaperPlane />
            </div>
            <h3 className="mt-4 font-bold text-(--color-text)">Message Us</h3>
            <p className="mt-1.5 text-sm text-(--color-text-secondary)">Usually replies within a day</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={scrollToForm}>
              Go to form
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* LEFT: CATEGORIES + FAQ */}
          <div className="space-y-5">
            <Card className="p-5">
              <h2 className="mb-4 text-lg font-bold text-(--color-text)">What's this about?</h2>
              <div className="space-y-2">
                {ISSUE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.title}
                    type="button"
                    onClick={() => handleCategoryClick(cat.title)}
                    className="focus-ring flex w-full items-center gap-3 rounded-xl border border-(--color-border) p-3 text-left transition hover:border-(--color-primary)/40 hover:bg-(--color-section-light)"
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cat.iconBg} ${cat.iconColor}`}>
                      {cat.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-(--color-text)">{cat.title}</span>
                      <span className="block truncate text-xs text-(--color-text-secondary)">{cat.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="mb-3 text-lg font-bold text-(--color-text)">Frequently asked</h2>
              <div className="divide-y divide-(--color-border)">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={faq.question}>
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="focus-ring flex w-full items-center justify-between gap-3 py-3 text-left"
                      >
                        <span className="text-sm font-semibold text-(--color-text)">{faq.question}</span>
                        <FaChevronDown className={`shrink-0 text-xs text-(--color-text-secondary) transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && <p className="pb-3 text-sm text-(--color-text-secondary)">{faq.answer}</p>}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <Card ref={formRef} className="p-5 sm:p-6">
            <h2 className="text-lg font-bold text-(--color-text)">Send us a message</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">We typically reply within 24 hours.</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <Input label="Restaurant / contact name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} disabled={submitting} />
              <Input label="Email address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} disabled={submitting} />
              <Input label="Subject" name="subject" placeholder="e.g. Payout" value={form.subject} onChange={handleChange} error={errors.subject} disabled={submitting} />
              <div>
                <label htmlFor="restaurant-helpdesk-query" className="mb-1.5 block text-sm font-semibold text-(--color-text)">
                  How can we help?
                </label>
                <textarea
                  id="restaurant-helpdesk-query"
                  name="query"
                  rows={5}
                  value={form.query}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Describe the issue, including any order or menu item if relevant."
                  className={`focus-ring w-full rounded-[var(--radius-md)] border bg-(--color-card) p-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) ${
                    errors.query ? "border-(--color-danger)" : "border-(--color-border-strong) focus:border-(--color-primary)"
                  }`}
                />
                {errors.query && <p className="mt-1.5 text-xs font-medium text-(--color-danger)">{errors.query}</p>}
              </div>
              <Button type="submit" fullWidth loading={submitting} iconRight={<FaPaperPlane size={12} />}>
                Send message
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHelpDesk;
