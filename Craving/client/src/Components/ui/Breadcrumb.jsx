import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

/** `items` is [{ label, to? }] — the last item (no `to`) renders as plain
 * text for the current page. */
const Breadcrumb = ({ items = [], className = "" }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-(--color-text-secondary)">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="hover:text-(--color-primary)">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-(--color-text)">{item.label}</span>
          )}
          {i < items.length - 1 && <FaChevronRight size={9} className="text-(--color-text-muted)" />}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
