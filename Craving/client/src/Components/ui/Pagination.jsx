import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { cn } from "../../utils/cn";

/** Simple numbered pagination for admin tables and order lists. */
const Pagination = ({ page, totalPages, onChange, className = "" }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1", className)}>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-(--color-text) hover:bg-(--color-section-light) disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronLeft size={13} />
      </button>

      {pages.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && pages[i - 1] !== p - 1 && <span className="px-1 text-(--color-text-muted)">…</span>}
          <button
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "focus-ring flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
              p === page
                ? "bg-(--color-primary) text-white"
                : "text-(--color-text) hover:bg-(--color-section-light)"
            )}
          >
            {p}
          </button>
        </React.Fragment>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-(--color-text) hover:bg-(--color-section-light) disabled:cursor-not-allowed disabled:opacity-40"
      >
        <FaChevronRight size={13} />
      </button>
    </nav>
  );
};

export default Pagination;
