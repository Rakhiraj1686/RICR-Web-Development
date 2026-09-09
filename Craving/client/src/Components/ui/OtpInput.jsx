import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

/**
 * Six-box OTP entry. Typing a digit auto-advances focus; Backspace on an
 * empty box moves back a box; pasting a 6-digit code fills every box at
 * once. Also renders the "Resend code in 0:30" countdown / "Resend code"
 * button, so callers just wire up `onResend`.
 */
const OtpInput = ({
  length = 6,
  value,
  onChange,
  onResend,
  resendSeconds = 30,
  disabled = false,
  error,
}) => {
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const setDigit = (index, char) => {
    const next = [...digits];
    next[index] = char;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (index, e) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    // Handles both single keystrokes and fast typing that lands >1 char.
    const chars = raw.split("");
    const next = [...digits];
    let cursor = index;
    for (const ch of chars) {
      if (cursor >= length) break;
      next[cursor] = ch;
      cursor += 1;
    }
    onChange(next.join("").slice(0, length));
    const focusTarget = Math.min(cursor, length - 1);
    inputsRef.current[focusTarget]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    e.preventDefault();
    onChange(pasted);
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    onResend?.();
    setSecondsLeft(resendSeconds);
  };

  return (
    <div>
      <div className="flex justify-between gap-2" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={cn(
              "focus-ring h-12 w-11 rounded-[var(--radius-md)] border text-center text-lg font-bold text-(--color-text) transition-colors sm:h-14 sm:w-12",
              error
                ? "border-(--color-danger)"
                : "border-(--color-border-strong) focus:border-(--color-primary)",
              disabled && "cursor-not-allowed bg-(--color-section-light)"
            )}
          />
        ))}
      </div>

      {error && <p className="mt-2 text-xs font-medium text-(--color-danger)">{error}</p>}

      <div className="mt-3 text-center text-sm">
        {secondsLeft > 0 ? (
          <span className="text-(--color-text-secondary)">
            Resend code in 0:{secondsLeft.toString().padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-(--color-primary) hover:text-(--color-primary-hover) hover:underline"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
};

export default OtpInput;
