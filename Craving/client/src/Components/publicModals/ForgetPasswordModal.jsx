import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { Modal, Input, Button, OtpInput } from "../ui";
import { FaCircleCheck, FaEnvelope, FaLock } from "react-icons/fa6";

const STEPS = [
  { id: "email", label: "Email" },
  { id: "otp", label: "Verify" },
  { id: "password", label: "New password" },
];

/**
 * Reset-password flow, split into three clear steps instead of one form
 * that silently grows fields as you go. Same three API calls as before
 * (genOtp / verifyOtp / forgetPassword) — only the presentation changed.
 */
const ForgetPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState("email"); // email -> otp -> password -> done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Enter your registered email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/genOtp", { email });
      toast.success(res.data.message);
      setStep("otp");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to send the code. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await api.post("/auth/genOtp", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to resend the code.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/verifyOtp", { email, otp });
      toast.success(res.data.message);
      setStep("password");
    } catch (err) {
      setError(err?.response?.data?.message || "That code didn't match. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== cfNewPassword) {
      setError("New password and confirm password must match.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/forgetPassword", {
        email,
        otp,
        newPassword,
        cfNewPassword,
      });
      toast.success(res.data.message);
      setStep("done");
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't update your password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={step === "done" ? undefined : "Reset password"} size="sm">
      {step !== "done" && (
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i <= stepIndex
                    ? "bg-(--color-primary) text-white"
                    : "bg-(--color-section-light) text-(--color-text-muted)"
                }`}
              >
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full ${
                    i < stepIndex ? "bg-(--color-primary)" : "bg-(--color-border)"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
          <p className="text-sm text-(--color-text-secondary)">
            Enter the email on your account and we'll send you a 6-digit code.
          </p>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            iconLeft={<FaEnvelope />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            disabled={loading}
            autoFocus
          />
          <Button type="submit" fullWidth loading={loading}>
            Send code
          </Button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-4" noValidate>
          <p className="text-sm text-(--color-text-secondary)">
            Enter the 6-digit code sent to <span className="font-semibold text-(--color-text)">{email}</span>.
          </p>
          <OtpInput value={otp} onChange={setOtp} onResend={handleResendOtp} error={error} disabled={loading} />
          <Button type="submit" fullWidth loading={loading}>
            Verify code
          </Button>
        </form>
      )}

      {step === "password" && (
        <form onSubmit={handleUpdatePassword} className="space-y-4" noValidate>
          <Input
            label="New password"
            type="password"
            placeholder="Create a new password"
            iconLeft={<FaLock />}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <Input
            label="Confirm new password"
            type="password"
            placeholder="Re-enter your new password"
            iconLeft={<FaLock />}
            value={cfNewPassword}
            onChange={(e) => setCfNewPassword(e.target.value)}
            error={error}
            disabled={loading}
          />
          <Button type="submit" fullWidth loading={loading}>
            Update password
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-success-soft) text-2xl text-(--color-success)">
            <FaCircleCheck />
          </span>
          <h3 className="mt-4 text-lg font-bold text-(--color-text)">Password updated</h3>
          <p className="mt-1.5 text-sm text-(--color-text-secondary)">
            You can now log in with your new password.
          </p>
          <Button className="mt-6" fullWidth onClick={onClose}>
            Back to login
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ForgetPasswordModal;
