import React, { useRef, useState } from "react";
import {
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaComments,
  FaBoxOpen,
  FaWallet,
  FaUserShield,
  FaBolt,
  FaChevronDown,
  FaPaperPlane,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { useAuth } from "../../context/AuthContext";
import { Card, Input, Button } from "../ui";

// Same placeholder contact details already used site-wide (Footer / public
// Contact page) — not a new/different number invented for this page.
const SUPPORT_PHONE = "+91 98765 43210";
const SUPPORT_EMAIL = "support@craving.app";

const SUPPORT_CHANNELS = [
  {
    title: "Call Support",
    description: "Talk directly with our team for urgent delivery or payment concerns.",
    value: SUPPORT_PHONE,
    icon: <FaPhoneAlt />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    buttonLabel: "Call Now",
    href: `tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`,
  },
  {
    title: "Email Support",
    description: "Send full issue details for a written response within 24 hours.",
    value: SUPPORT_EMAIL,
    icon: <FaEnvelope />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    buttonLabel: "Send Email",
    href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    title: "Message Us",
    description: "Fill in the form below and our team will get back to you.",
    value: "Usually replies within a day",
    icon: <FaComments />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    buttonLabel: "Go to form",
    scrollTo: true,
  },
];

const ISSUE_CATEGORIES = [
  {
    title: "Order Issues",
    subtitle: "Late delivery, wrong item or cancellation",
    icon: <FaBoxOpen />,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Payment Issues",
    subtitle: "Failed payment, refund or duplicate charge",
    icon: <FaWallet />,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Account Issues",
    subtitle: "Login, profile update or security concern",
    icon: <FaUserShield />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

// Rewritten to only describe features the app actually has — the previous
// version claimed "live rider and restaurant updates", which doesn't exist;
// tracking here means the status timeline in Orders → Track Order.
const FAQS = [
  {
    question: "How can I track my order?",
    answer:
      "Open the Orders tab, find your order, and select Track Order to see its current status — placed, preparing, on the way, or delivered.",
  },
  {
    question: "How do I request a refund?",
    answer:
      "Message us using the form below with your order number and the issue, and our support team will follow up on the refund.",
  },
  {
    question: "How can I update my account details?",
    answer: "Go to the Profile tab and use Edit Profile to update your name, phone, or photo.",
  },
];

const UserHelpdesk = () => {
  const { user } = useAuth();
  const formRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      setForm({ fullName: user?.fullName || "", email: user?.email || "", subject: "", query: "" });
      setErrors({});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Couldn't send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-[#f7f8fa] p-4 sm:p-5 lg:p-6">
      <div className="mx-auto max-w-[1300px] space-y-5">
        {/* ================= HEADER ================= */}
        <Card className="relative overflow-hidden p-5 sm:p-7">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-(--color-section-light) to-transparent opacity-70" />
          <div className="relative max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-(--color-primary) text-white shadow-sm">
                <FaHeadset />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--color-primary)">
                Help Center
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
              How can we help you?
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-(--color-text-secondary)">
              Get assistance with orders, payments, and account questions through our
              support channels below.
            </p>
          </div>
        </Card>

        {/* ================= SUPPORT CHANNELS ================= */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SUPPORT_CHANNELS.map((channel) => (
            <Card key={channel.title} interactive className="flex flex-col p-5">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${channel.iconBg} ${channel.iconColor}`}>
                {channel.icon}
              </div>
              <h3 className="mt-4 font-bold text-(--color-text)">{channel.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-(--color-text-secondary)">
                {channel.description}
              </p>
              <p className="mt-3 text-sm font-semibold text-(--color-text)">{channel.value}</p>
              {channel.scrollTo ? (
                <Button variant="outline" size="sm" className="mt-4" onClick={scrollToForm}>
                  {channel.buttonLabel}
                </Button>
              ) : (
                <a
                  href={channel.href}
                  className="focus-ring mt-4 inline-flex h-8 items-center justify-center rounded-[var(--radius-pill)] border border-(--color-border-strong) px-3 text-xs font-semibold text-(--color-text) transition hover:border-(--color-primary) hover:text-(--color-primary)"
                >
                  {channel.buttonLabel}
                </a>
              )}
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.2fr]">
          {/* ================= LEFT: CATEGORIES + FAQ ================= */}
          <div className="space-y-5">
            <Card className="p-5">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-(--color-text)">
                <FaBolt className="text-(--color-primary)" />
                What's this about?
              </h2>
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
                      <span className="block truncate text-xs text-(--color-text-secondary)">
                        {cat.subtitle}
                      </span>
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
                        <span className="text-sm font-semibold text-(--color-text)">
                          {faq.question}
                        </span>
                        <FaChevronDown
                          className={`shrink-0 text-xs text-(--color-text-secondary) transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pb-3 text-sm text-(--color-text-secondary)">{faq.answer}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* ================= RIGHT: CONTACT FORM ================= */}
          <Card ref={formRef} className="p-5 sm:p-6">
            <h2 className="text-lg font-bold text-(--color-text)">Send us a message</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              We typically reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <Input
                label="Your name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
                disabled={submitting}
              />
              <Input
                label="Email address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                disabled={submitting}
              />
              <Input
                label="Subject"
                name="subject"
                placeholder="e.g. Order Issues"
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={submitting}
              />
              <div>
                <label htmlFor="helpdesk-query" className="mb-1.5 block text-sm font-semibold text-(--color-text)">
                  How can we help?
                </label>
                <textarea
                  id="helpdesk-query"
                  name="query"
                  rows={5}
                  value={form.query}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Describe the issue, including any order number if relevant."
                  className={`focus-ring w-full rounded-[var(--radius-md)] border bg-(--color-card) p-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) ${
                    errors.query ? "border-(--color-danger)" : "border-(--color-border-strong) focus:border-(--color-primary)"
                  }`}
                />
                {errors.query && (
                  <p className="mt-1.5 text-xs font-medium text-(--color-danger)">{errors.query}</p>
                )}
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

export default UserHelpdesk;
