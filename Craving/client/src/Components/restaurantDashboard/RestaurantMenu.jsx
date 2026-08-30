import React, { useEffect, useMemo, useState } from "react";
import AdditemMenuModal from "./modals/AddMenuItemModal";
import ViewItemModal from "./modals/ViewItemsModal";
import EditItemsModal from "./modals/EditItemsModal";
import DeleteMenuItemModal from "./modals/DeleteMenuItemModal";
import {
  FaMagnifyingGlass,
  FaCirclePlus,
  FaEye,
  FaPen,
  FaTrash,
  FaBowlFood,
  FaLayerGroup,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../Config/Api";

const PAGE_SIZE = 8;

const RestaurantMenu = () => {
  const [isAddItem, setIsAddItem] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchMenuItem = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/restaurant/menuItems");
      setMenuItems(res.data.data || []);
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error(error?.response?.data?.message || "Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAddItem && !isEditItemModalOpen) fetchMenuItem();
  }, [isAddItem, isEditItemModalOpen]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeCategory]);

  // "removed" is the app's soft-delete state — hide it from the active management view.
  const activeItems = useMemo(
    () => menuItems.filter((item) => item.availability !== "removed"),
    [menuItems],
  );

  const stats = useMemo(() => {
    const available = activeItems.filter(
      (i) => i.availability === "available",
    ).length;
    const categories = new Set(
      activeItems.map((i) => i.cuisine?.trim()).filter(Boolean),
    );
    return {
      total: activeItems.length,
      available,
      unavailable: activeItems.length - available,
      categories: categories.size,
    };
  }, [activeItems]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(activeItems.map((i) => i.cuisine?.trim()).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
    return ["All", ...unique];
  }, [activeItems]);

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    return activeItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.cuisine?.trim() === activeCategory;
      const matchesSearch =
        !term ||
        item.itemName?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.cuisine?.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeItems, query, activeCategory]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleClearFilters = () => {
    setQuery("");
    setActiveCategory("All");
  };

  // Reused by both the quick-toggle and the delete confirmation — the update
  // endpoint requires every field to be resent, so we rebuild the full payload.
  const buildFormData = (item, overrides = {}) => {
    const data = { ...item, ...overrides };
    const form = new FormData();
    form.append("itemName", data.itemName);
    form.append("description", data.description);
    form.append("price", data.price);
    form.append("servingSize", data.servingSize);
    form.append("cuisine", data.cuisine);
    form.append("type", data.type);
    form.append("preparationTime", data.preparationTime);
    form.append("availability", data.availability);
    return form;
  };

  const handleToggleAvailability = async (item) => {
    const nextAvailability =
      item.availability === "available" ? "unavailable" : "available";
    setTogglingId(item._id);
    try {
      const form = buildFormData(item, { availability: nextAvailability });
      await api.put(`/restaurant/updateMenuItem/${item._id}`, form);
      setMenuItems((prev) =>
        prev.map((m) =>
          m._id === item._id ? { ...m, availability: nextAvailability } : m,
        ),
      );
      toast.success(
        nextAvailability === "available"
          ? "Marked as available"
          : "Marked as unavailable",
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Unable to update availability",
      );
    } finally {
      setTogglingId(null);
    }
  };

  const handleDeleted = (itemId) => {
    setMenuItems((prev) => prev.filter((m) => m._id !== itemId));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen w-full overflow-auto bg-linear-to-br from-(--color-section-light) via-(--color-background) to-(--color-section-light) p-4 sm:p-6">
      {/* PAGE HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-(--color-border) bg-white/70 p-5 shadow-xl backdrop-blur-sm sm:p-6">
        <div className="pointer-events-none absolute -top-14 -right-12 h-44 w-44 rounded-full bg-(--color-secondary)/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-8 h-48 w-48 rounded-full bg-(--color-primary)/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
              Menu Management
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-(--color-text) sm:text-3xl">
              Your Menu
            </h1>
            <p className="mt-1 text-sm font-medium text-(--color-text-secondary)">
              Manage your dishes, prices, categories and availability.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-(--color-primary) bg-(--color-primary) px-5 py-3 text-base font-bold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-primary-hover) hover:shadow-xl"
            onClick={() => setIsAddItem(true)}
          >
            <FaCirclePlus className="text-xl" />
            <span>Add Menu Item</span>
          </button>
        </div>
      </div>

      {/* STATS */}
      {!loading && !error && activeItems.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Items", value: stats.total, icon: <FaBowlFood /> },
            {
              label: "Available",
              value: stats.available,
              icon: <FaCircleCheck />,
            },
            {
              label: "Unavailable",
              value: stats.unavailable,
              icon: <FaCircleXmark />,
            },
            {
              label: "Categories",
              value: stats.categories,
              icon: <FaLayerGroup />,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-(--color-border) bg-white/85 p-4 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary)/10 text-(--color-primary)">
                {card.icon}
              </span>
              <p className="mt-2 text-2xl font-black text-(--color-text)">
                {card.value}
              </p>
              <p className="text-xs font-semibold text-(--color-text-secondary)">
                {card.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* SEARCH + CATEGORY FILTER */}
      {!loading && !error && menuItems.length > 0 && (
        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-(--color-border) bg-white/80 p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-(--color-primary)">
            <FaMagnifyingGlass
              className="shrink-0 text-(--color-text-secondary)"
              aria-hidden="true"
            />
            <label htmlFor="menu-search" className="sr-only">
              Search dishes
            </label>
            <input
              id="menu-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes..."
              className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-(--color-text) outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-(--color-text-secondary) hover:text-(--color-text)"
              >
                <FaXmark />
              </button>
            )}
          </div>

          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`shrink-0 snap-start rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                  activeCategory === cat
                    ? "border-(--color-primary) bg-(--color-primary) text-white"
                    : "border-(--color-border) bg-white text-(--color-text) hover:border-(--color-primary)/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* LOADING SKELETONS */}
      {loading && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm"
            >
              <div className="h-36 animate-pulse bg-(--color-section-light)" />
              <div className="space-y-2.5 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-(--color-section-light)" />
                <div className="h-3 w-full animate-pulse rounded bg-(--color-section-light)" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-(--color-section-light)" />
                <div className="flex gap-2 pt-1">
                  <div className="h-8 flex-1 animate-pulse rounded-xl bg-(--color-section-light)" />
                  <div className="h-8 flex-1 animate-pulse rounded-xl bg-(--color-section-light)" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {!loading && error && (
        <div className="mx-auto mt-8 max-w-md rounded-3xl border border-dashed border-(--color-border) bg-white p-10 text-center">
          <FaTriangleExclamation
            className="mx-auto mb-3 text-3xl text-(--color-primary)"
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold text-(--color-text)">
            Unable to load your menu
          </h2>
          <p className="mt-1 text-sm text-(--color-text-secondary)">
            Something went wrong while loading your dishes.
          </p>
          <button
            type="button"
            onClick={fetchMenuItem}
            className="mt-5 rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
          >
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY MENU STATE */}
      {!loading && !error && menuItems.length === 0 && (
        <div className="mx-auto mt-8 max-w-md rounded-3xl border border-dashed border-(--color-accent) bg-white p-10 text-center">
          <FaBowlFood className="mx-auto mb-3 text-4xl text-(--color-primary)" aria-hidden="true" />
          <h2 className="text-lg font-bold text-(--color-text)">
            Your menu is empty
          </h2>
          <p className="mt-1 text-sm text-(--color-text-secondary)">
            Start adding delicious dishes to your restaurant menu.
          </p>
          <button
            type="button"
            onClick={() => setIsAddItem(true)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-primary) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
          >
            <FaCirclePlus /> Add Your First Dish
          </button>
        </div>
      )}

      {/* NO SEARCH RESULTS */}
      {!loading && !error && menuItems.length > 0 && filteredItems.length === 0 && (
        <div className="mx-auto mt-8 max-w-md rounded-3xl border border-dashed border-(--color-border) bg-white p-10 text-center">
          <FaMagnifyingGlass className="mx-auto mb-3 text-3xl text-(--color-primary)" aria-hidden="true" />
          <h2 className="text-lg font-bold text-(--color-text)">
            No dishes found
          </h2>
          <p className="mt-1 text-sm text-(--color-text-secondary)">
            Try another search or category.
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

      {/* MENU GRID */}
      {!loading && !error && visibleItems.length > 0 && (
        <>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((item) => (
              <article
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-(--color-border) bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-36 overflow-hidden bg-(--color-section-light)">
                  {item.images?.[0]?.url ? (
                    <img
                      src={item.images[0].url}
                      alt={item.itemName}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl text-(--color-primary)">
                      <FaBowlFood aria-hidden="true" />
                    </div>
                  )}
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold capitalize text-(--color-text)">
                    {item.cuisine}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-1 font-bold text-(--color-text)">
                      {item.itemName}
                    </h3>
                    <span className="shrink-0 font-black text-(--color-primary)">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs text-(--color-text-secondary)">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(item)}
                    disabled={togglingId === item._id}
                    aria-pressed={item.availability === "available"}
                    className={`mt-2 flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      item.availability === "available"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {item.availability === "available" ? (
                      <FaCircleCheck aria-hidden="true" />
                    ) : (
                      <FaCircleXmark aria-hidden="true" />
                    )}
                    {togglingId === item._id
                      ? "Updating..."
                      : item.availability === "available"
                        ? "Available"
                        : "Unavailable"}
                  </button>

                  <div className="mt-auto flex gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsViewItemModalOpen(true);
                      }}
                      title="View Item"
                      className="flex h-9 flex-1 items-center justify-center rounded-xl border border-(--color-border) text-(--color-text-secondary) transition hover:bg-(--color-background)"
                    >
                      <FaEye />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditItemModalOpen(true);
                      }}
                      title="Edit Item"
                      className="flex h-9 flex-1 items-center justify-center rounded-xl border border-(--color-border) text-(--color-primary) transition hover:bg-(--color-background)"
                    >
                      <FaPen />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      title="Delete Item"
                      className="flex h-9 flex-1 items-center justify-center rounded-xl border border-(--color-border) text-red-600 transition hover:bg-red-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 flex justify-center">
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

      {isAddItem && <AdditemMenuModal onClose={() => setIsAddItem(false)} />}

      {isViewItemModalOpen && (
        <ViewItemModal
          onClose={() => setIsViewItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
      {isEditItemModalOpen && (
        <EditItemsModal
          onClose={() => setIsEditItemModalOpen(false)}
          selectedItem={selectedItem}
        />
      )}
      {deleteTarget && (
        <DeleteMenuItemModal
          selectedItem={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={handleDeleted}
          buildFormData={buildFormData}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;