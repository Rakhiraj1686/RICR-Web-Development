import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaShareNodes,
  FaMagnifyingGlass,
  FaLocationDot,
  FaUtensils,
  FaBowlFood,
  FaTriangleExclamation,
  FaStore,
} from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../Config/Api";
import toast from "react-hot-toast";

const RestaurantDisplayMenu = () => {
  const { isLogin, role } = useAuth();
  const navigate = useNavigate();
  const data = useLocation().state;

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart"));
    } catch {
      return null;
    }
  });
  const [cartFlag, setCartFlag] = useState([]);
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [menuSearch, setMenuSearch] = useState("");

  const menuSectionRef = useRef(null);

  const fetchMenuItems = async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await api.get(`/public/restaurant/menu/${data._id}`);
      setMenuItems(res.data.data || []);
    } catch (error) {
      console.log(error);
      setLoadError(true);
      toast.error("Unable to load the menu right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
    setCartFlag([]);
  };

  const handleAddToCart = (NewItem) => {
    if (cart) {
      if (cart.restaurantID === NewItem.restaurantID._id) {
        setCart((prev) => ({
          ...prev,
          cartItem: [...prev.cartItem, { ...NewItem, quantity: 1 }],
          cartValue: Number(prev.cartValue) + Number(NewItem.price),
        }));
        setCartFlag((prev) => [...prev, NewItem._id]);
      } else {
        toast.error("Clear the cart first");
      }
    } else {
      setCart({
        restaurantID: NewItem.restaurantID._id,
        cartItem: [{ ...NewItem, quantity: 1 }],
        cartValue: Number(NewItem.price),
      });
      setCartFlag((prev) => [...prev, NewItem._id]);
    }
  };

  const handleCheckout = () => {
    isLogin && role === "customer"
      ? (localStorage.setItem("cart", JSON.stringify(cart)),
        navigate("/checkout-page"))
      : (toast.error("Please Login as Customer"), navigate("/login"));
  };

  const handleShare = async () => {
    const shareData = {
      title: data?.restaurantName,
      text: `Check out ${data?.restaurantName} on Craving`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      }
    } catch {
      // user cancelled share — no action needed
    }
  };

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    cart && localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (data?._id) fetchMenuItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?._id]);

  // Categories are derived from the real cuisine values present on this
  // restaurant's menu items — no categories are invented.
  const cuisineTabs = useMemo(() => {
    const unique = [...new Set(menuItems.map((item) => item.cuisine).filter(Boolean))];
    return ["All", ...unique];
  }, [menuItems]);

  const availableItems = useMemo(
    () => menuItems.filter((item) => item.availability === "available"),
    [menuItems],
  );

  // No "popular" flag exists in the data model, so — per the brief's
  // explicit fallback — this uses the first available items instead of
  // inventing a popularity ranking.
  const popularItems = availableItems.slice(0, 4);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCuisine = activeCuisine === "All" || item.cuisine === activeCuisine;
      const matchesSearch = item.itemName
        ?.toLowerCase()
        .includes(menuSearch.trim().toLowerCase());
      return matchesCuisine && matchesSearch;
    });
  }, [menuItems, activeCuisine, menuSearch]);

  const startingPrice = useMemo(() => {
    if (availableItems.length === 0) return null;
    return Math.min(...availableItems.map((i) => Number(i.price) || Infinity));
  }, [availableItems]);

  // ================= RESTAURANT NOT FOUND =================
  // Guards against a hard crash when this page is opened directly
  // (refresh, back button, bad link) without router state.
  if (!data) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-(--color-background) px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-(--color-primary) shadow-sm">
          <FaStore />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-(--color-text)">
          Restaurant Not Found
        </h1>
        <p className="mt-2 max-w-sm text-(--color-text-secondary)">
          The restaurant you're looking for may no longer be available.
        </p>
        <button
          onClick={() => navigate("/order-now")}
          className="mt-6 rounded-full bg-(--color-primary) px-6 py-3 font-semibold text-white transition hover:bg-(--color-primary-hover)"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative h-95 w-full overflow-hidden sm:h-110 md:h-125">
        {data.photo?.url ? (
          <img
            src={data.photo.url}
            alt={data.restaurantName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-secondary) text-8xl text-white">
            <FaBowlFood />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute bottom-0 left-0 w-full px-4 pb-8 text-white sm:px-6 sm:pb-10 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg sm:text-4xl lg:text-5xl">
              {data.restaurantName}
            </h1>
            {data.cuisine && (
              <p className="mt-2 text-white/85">
                {data.cuisine}
                {data.address ? ` • ${data.address}` : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= INFO CARD + ACTIONS ================= */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 -mt-8 flex flex-col gap-4 rounded-3xl border border-(--color-border) bg-white p-5 shadow-lg sm:-mt-10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {data.cuisine && (
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  <FaUtensils />
                </span>
                <div>
                  <p className="text-xs text-(--color-text-secondary)">Cuisine</p>
                  <p className="text-sm font-semibold">{data.cuisine}</p>
                </div>
              </div>
            )}
            {data.address && (
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  <FaLocationDot />
                </span>
                <div>
                  <p className="text-xs text-(--color-text-secondary)">Location</p>
                  <p className="text-sm font-semibold">{data.address}</p>
                </div>
              </div>
            )}
            {startingPrice !== null && Number.isFinite(startingPrice) && (
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary)">
                  ₹
                </span>
                <div>
                  <p className="text-xs text-(--color-text-secondary)">Menu starts at</p>
                  <p className="text-sm font-semibold">₹{startingPrice}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              onClick={scrollToMenu}
              className="rounded-full bg-(--color-primary) px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
            >
              View Menu
            </button>
            <button
              onClick={handleShare}
              aria-label="Share this restaurant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-border) text-(--color-text-secondary) transition hover:border-(--color-primary) hover:text-(--color-primary)"
            >
              <FaShareNodes />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MENU SECTION ================= */}
      <div ref={menuSectionRef} className="bg-(--color-background) py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Explore Our Menu</h2>
            <p className="mt-1 text-(--color-text-secondary)">Choose something delicious.</p>
          </div>

          {/* Search this restaurant — frontend-only filter, no new backend search API */}
          <div className="mx-auto mb-6 max-w-md">
            <div className="flex items-center gap-2 rounded-full border border-(--color-border) bg-white px-4 py-2.5 shadow-sm focus-within:border-(--color-primary)">
              <FaMagnifyingGlass className="text-(--color-text-secondary)" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search this restaurant"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          {/* Category navigation */}
          {!loading && !loadError && cuisineTabs.length > 1 && (
            <div className="sticky top-14.25 z-20 -mx-4 mb-8 overflow-x-auto bg-(--color-background)/95 px-4 py-3 backdrop-blur-sm sm:top-16.25">
              <div className="mx-auto flex max-w-6xl gap-2">
                {cuisineTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCuisine(tab)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                      activeCuisine === tab
                        ? "bg-(--color-primary) text-white"
                        : "border border-(--color-border) bg-white text-(--color-text-secondary) hover:border-(--color-primary) hover:text-(--color-primary)"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading skeletons */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-72 animate-pulse rounded-3xl bg-white" />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && loadError && (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-(--color-border) bg-white py-16 text-center">
              <FaTriangleExclamation className="text-3xl text-(--color-primary)" />
              <h3 className="mt-4 text-xl font-bold">Unable to load restaurant</h3>
              <p className="mt-1 text-(--color-text-secondary)">Please try again.</p>
              <button
                onClick={fetchMenuItems}
                className="mt-5 rounded-full bg-(--color-primary) px-6 py-2.5 font-semibold text-white transition hover:bg-(--color-primary-hover)"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !loadError && (
            <>
              {/* Popular at this Restaurant — uses first available items since
                  no popularity data exists in the menu model. */}
              {activeCuisine === "All" && !menuSearch && popularItems.length > 0 && (
                <div className="mb-12">
                  <h3 className="mb-4 text-xl font-bold">Popular at this Restaurant</h3>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {popularItems.map((item) => (
                      <FoodCard
                        key={item._id}
                        item={item}
                        added={cartFlag.includes(item._id)}
                        onAdd={() => handleAddToCart(item)}
                        compact
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredItems.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item) => (
                    <FoodCard
                      key={item._id}
                      item={item}
                      added={cartFlag.includes(item._id)}
                      onAdd={() => handleAddToCart(item)}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-(--color-border) bg-white py-16 text-center text-(--color-text-secondary)">
                  {menuSearch
                    ? "No dishes match your search."
                    : "No menu items available right now."}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ================= FLOATING CART ================= */}
      {cart && cart.cartItem?.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[95%] max-w-xl -translate-x-1/2">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-(--color-text) px-5 py-4 text-white shadow-2xl sm:px-8 sm:py-5">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold sm:text-base">
                {cart.cartItem.length} {cart.cartItem.length === 1 ? "item" : "items"} · ₹{cart.cartValue}
              </span>
              <button
                onClick={handleClearCart}
                aria-label="Clear cart"
                className="rounded-lg p-2 transition hover:bg-white/10"
              >
                <FaRegTrashAlt size={16} />
              </button>
            </div>
            <button
              onClick={handleCheckout}
              className="shrink-0 rounded-xl bg-(--color-primary) px-5 py-2 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover)"
            >
              Checkout →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const FoodCard = ({ item, added, onAdd, compact }) => (
  <div
    className={`overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
      item.availability !== "available" ? "opacity-60" : ""
    }`}
  >
    <div className={`relative overflow-hidden ${compact ? "h-32" : "h-44"}`}>
      {item.images?.[0]?.url ? (
        <img
          src={item.images[0].url}
          alt={item.itemName}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-(--color-background) text-3xl text-(--color-primary)">
          <FaBowlFood />
        </div>
      )}
      <span
        className="absolute left-3 top-3 h-4 w-4 rounded-sm border-2"
        style={{
          borderColor: item.type === "veg" ? "#22c55e" : "#ef4444",
        }}
        aria-label={item.type}
        title={item.type}
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            backgroundColor: item.type === "veg" ? "#22c55e" : "#ef4444",
            transform: "scale(0.45)",
          }}
        />
      </span>
      {item.availability !== "available" && (
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase text-white">
          {item.availability}
        </span>
      )}
    </div>

    <div className="p-4">
      <h3 className="truncate font-bold text-(--color-text)">{item.itemName}</h3>
      {!compact && item.description && (
        <p className="mt-1 line-clamp-2 text-sm text-(--color-text-secondary)">
          {item.description}
        </p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-extrabold text-(--color-text)">₹{item.price}</span>
        <button
          onClick={onAdd}
          disabled={added || item.availability !== "available"}
          className="rounded-lg bg-(--color-primary) px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:bg-(--color-accent)"
        >
          {added ? "Added ✓" : "+ Add"}
        </button>
      </div>
    </div>
  </div>
);

export default RestaurantDisplayMenu;