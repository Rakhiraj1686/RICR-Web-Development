import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../Config/Api";
import {
  FaMagnifyingGlass,
  FaXmark,
  FaLocationDot,
  FaBowlFood,
  FaArrowRightLong,
  FaSliders,
  FaChevronDown,
  FaTriangleExclamation,
} from "react-icons/fa6";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "newest", label: "Newest First" },
];

const OrderNow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState(location.state?.search || "");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sortBoxRef = useRef(null);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/public/allRestaurants");
      setRestaurants(res.data.data || []);
    } catch (err) {
      console.log(err);
      setError(true);
      toast.error(err?.response?.data?.message || "Unable to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sortBoxRef.current && !sortBoxRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset how many cards are shown whenever the active filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCategory, sortBy]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        restaurants
          .map((r) => r.cuisine?.trim())
          .filter((c) => c && c !== "N/A"),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    const term = query.trim().toLowerCase();

    let list = restaurants.filter((r) => {
      const matchesCategory =
        activeCategory === "All" || r.cuisine?.trim() === activeCategory;
      const matchesSearch =
        !term ||
        r.restaurantName?.toLowerCase().includes(term) ||
        r.cuisine?.toLowerCase().includes(term) ||
        r.address?.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "name-asc") {
      list = [...list].sort((a, b) =>
        (a.restaurantName || "").localeCompare(b.restaurantName || ""),
      );
    } else if (sortBy === "newest") {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    return list;
  }, [restaurants, query, activeCategory, sortBy]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);
  const hasMore = visibleCount < filteredRestaurants.length;

  const handleRestaurantClick = (restaurantInfo) => {
    navigate("/restaurantMenu", { state: restaurantInfo });
  };

  const handleClearFilters = () => {
    setQuery("");
    setActiveCategory("All");
    setSortBy("recommended");
  };

  const activeSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || "Recommended";

  return (
    <main className="min-h-screen bg-(--color-background) px-4 pb-20 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-(--color-primary)">
            Explore Restaurants
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Find Your Next Favorite Place to Eat
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-(--color-text-secondary)">
            Discover delicious food from restaurants around you.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="flex items-center gap-2 rounded-full border border-(--color-accent) bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-(--color-primary)">
            <FaMagnifyingGlass
              className="ml-2 shrink-0 text-(--color-text-secondary)"
              aria-hidden="true"
            />
            <label htmlFor="restaurant-search" className="sr-only">
              Search restaurants, cuisines or dishes
            </label>
            <input
              id="restaurant-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search restaurants, cuisines or dishes..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-(--color-text) outline-none sm:text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-(--color-text-secondary) transition hover:bg-(--color-background) hover:text-(--color-text)"
              >
                <FaXmark />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTERS + SORT */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "border-(--color-primary) bg-(--color-primary) text-white"
                    : "border-(--color-border) bg-white text-(--color-text) hover:border-(--color-primary)/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div ref={sortBoxRef} className="relative shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSortOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className="flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-4 py-2 text-sm font-semibold text-(--color-text) shadow-sm transition hover:border-(--color-primary)/50"
            >
              <FaSliders className="text-(--color-text-secondary)" aria-hidden="true" />
              Sort by: {activeSortLabel}
              <FaChevronDown className="text-xs text-(--color-text-secondary)" aria-hidden="true" />
            </button>

            {sortOpen && (
              <ul
                role="listbox"
                className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-(--color-border) bg-white py-1 shadow-lg"
              >
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sortBy === opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition hover:bg-(--color-background) ${
                        sortBy === opt.value
                          ? "font-semibold text-(--color-primary)"
                          : "text-(--color-text)"
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RESULT COUNT */}
        {!loading && !error && (
          <p className="mb-4 text-sm font-medium text-(--color-text-secondary)">
            {filteredRestaurants.length}{" "}
            {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
            found
          </p>
        )}

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-sm"
              >
                <div className="h-44 animate-pulse bg-(--color-section-light)" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-(--color-section-light)" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-(--color-section-light)" />
                  <div className="h-3 w-2/3 animate-pulse rounded bg-(--color-section-light)" />
                  <div className="h-9 w-full animate-pulse rounded-full bg-(--color-section-light)" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-(--color-border) bg-white p-10 text-center">
            <FaTriangleExclamation
              className="mx-auto mb-3 text-3xl text-(--color-primary)"
              aria-hidden="true"
            />
            <h2 className="text-lg font-bold">We couldn't load restaurants.</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Please try again.
            </p>
            <button
              type="button"
              onClick={fetchAllRestaurants}
              className="mt-5 rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
            >
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredRestaurants.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-(--color-accent) bg-white p-10 text-center">
            <FaBowlFood className="mx-auto mb-3 text-3xl text-(--color-primary)" aria-hidden="true" />
            <h2 className="text-lg font-bold">No restaurants found</h2>
            <p className="mt-1 text-sm text-(--color-text-secondary)">
              Try changing your search or filters.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-5 rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* RESTAURANT GRID */}
        {!loading && !error && visibleRestaurants.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleRestaurants.map((r) => (
                <article
                  key={r._id}
                  onClick={() => handleRestaurantClick(r)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden bg-(--color-section-light)">
                    {r.photo?.url ? (
                      <img
                        src={r.photo.url}
                        alt={`${r.restaurantName || "Restaurant"} storefront`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl text-(--color-primary)">
                        <FaBowlFood aria-hidden="true" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 p-4">
                    <h3 className="truncate text-lg font-bold">
                      {r.restaurantName}
                    </h3>
                    <p className="truncate text-sm text-(--color-text-secondary)">
                      {r.cuisine}
                    </p>
                    {r.address && (
                      <p className="flex items-center gap-1 truncate text-xs text-(--color-text-secondary)">
                        <FaLocationDot className="shrink-0" aria-hidden="true" />
                        {r.address}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRestaurantClick(r);
                      }}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-(--color-primary) py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
                    >
                      View Menu
                      <FaArrowRightLong className="text-xs transition group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="rounded-full border border-(--color-primary) px-8 py-2.5 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default OrderNow;