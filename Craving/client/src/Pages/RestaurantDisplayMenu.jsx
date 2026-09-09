import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaShareNodes,
  FaLocationDot,
  FaUtensils,
  FaBowlFood,
  FaStore,
} from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import api from "../Config/Api";
import toast from "react-hot-toast";
import {
  Button,
  IconButton,
  Badge,
  SearchInput,
  QuantitySelector,
  PriceDisplay,
  SkeletonGrid,
  EmptyState,
  ErrorState,
} from "../Components/ui";

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

  // Cart quantity mutations all live here so FoodCard stays presentational.
  const handleAddToCart = (item) => {
    if (cart && cart.restaurantID !== item.restaurantID._id) {
      toast.error("Clear the cart first");
      return;
    }
    setCart((prev) => {
      if (!prev) {
        return {
          restaurantID: item.restaurantID._id,
          cartItem: [{ ...item, quantity: 1 }],
          cartValue: Number(item.price),
        };
      }
      return {
        ...prev,
        cartItem: [...prev.cartItem, { ...item, quantity: 1 }],
        cartValue: Number(prev.cartValue) + Number(item.price),
      };
    });
  };

  const handleUpdateQuantity = (itemId, nextQuantity) => {
    setCart((prev) => {
      if (!prev) return prev;
      const line = prev.cartItem.find((i) => i._id === itemId);
      if (!line) return prev;
      const delta = nextQuantity - line.quantity;
      return {
        ...prev,
        cartItem: prev.cartItem.map((i) =>
          i._id === itemId ? { ...i, quantity: nextQuantity } : i
        ),
        cartValue: Number(prev.cartValue) + delta * Number(line.price),
      };
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => {
      if (!prev) return prev;
      const line = prev.cartItem.find((i) => i._id === itemId);
      if (!line) return prev;
      const remaining = prev.cartItem.filter((i) => i._id !== itemId);
      if (remaining.length === 0) {
        localStorage.removeItem("cart");
        return null;
      }
      return {
        ...prev,
        cartItem: remaining,
        cartValue: Number(prev.cartValue) - line.quantity * Number(line.price),
      };
    });
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  const handleCheckout = () => {
    if (isLogin && role === "customer") {
      localStorage.setItem("cart", JSON.stringify(cart));
      navigate("/checkout-page");
    } else {
      toast.error("Please Login as Customer");
      navigate("/login");
    }
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
    if (cart) localStorage.setItem("cart", JSON.stringify(cart));
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
    [menuItems]
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

  const quantityInCart = (itemId) =>
    cart?.cartItem?.find((i) => i._id === itemId)?.quantity || 0;

  // ================= RESTAURANT NOT FOUND =================
  // Guards against a hard crash when this page is opened directly
  // (refresh, back button, bad link) without router state.
  if (!data) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-(--color-background) px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-(--color-primary) shadow-sm">
          <FaStore />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-(--color-text)">Restaurant Not Found</h1>
        <p className="mt-2 max-w-sm text-(--color-text-secondary)">
          The restaurant you're looking for may no longer be available.
        </p>
        <Button size="lg" className="mt-6" onClick={() => navigate("/order-now")}>
          Browse Restaurants
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <div className="relative h-95 w-full overflow-hidden sm:h-110 md:h-125">
        {data.photo?.url ? (
          <img src={data.photo.url} alt={data.restaurantName} className="h-full w-full object-cover" />
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
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-background) text-(--color-primary) font-bold">
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
            <Button onClick={scrollToMenu}>View Menu</Button>
            <IconButton
              icon={<FaShareNodes />}
              label="Share this restaurant"
              variant="outline"
              onClick={handleShare}
            />
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
            <SearchInput
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              onClear={() => setMenuSearch("")}
              placeholder="Search this restaurant"
            />
          </div>

          {/* Category navigation */}
          {!loading && !loadError && cuisineTabs.length > 1 && (
            <div className="sticky top-14.25 z-20 -mx-4 mb-8 overflow-x-auto bg-(--color-background)/95 px-4 py-3 backdrop-blur-sm scrollbar-hide sm:top-16.25">
              <div className="mx-auto flex max-w-6xl gap-2">
                {cuisineTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCuisine(tab)}
                    className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
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
          {loading && <SkeletonGrid count={6} className="sm:grid-cols-2 lg:grid-cols-3" />}

          {/* Error state */}
          {!loading && loadError && (
            <ErrorState
              title="Unable to load restaurant"
              description="Please check your connection and try again."
              onRetry={fetchMenuItems}
              className="rounded-3xl border border-dashed border-(--color-border) bg-white"
            />
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
                        quantity={quantityInCart(item._id)}
                        onAdd={() => handleAddToCart(item)}
                        onUpdateQuantity={(qty) => handleUpdateQuantity(item._id, qty)}
                        onRemove={() => handleRemoveFromCart(item._id)}
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
                      quantity={quantityInCart(item._id)}
                      onAdd={() => handleAddToCart(item)}
                      onUpdateQuantity={(qty) => handleUpdateQuantity(item._id, qty)}
                      onRemove={() => handleRemoveFromCart(item._id)}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<FaBowlFood />}
                  title="No dishes found"
                  description={
                    menuSearch
                      ? "No dishes match your search."
                      : "No menu items available right now."
                  }
                  className="rounded-3xl border border-dashed border-(--color-border) bg-white"
                />
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
                {cart.cartItem.length} {cart.cartItem.length === 1 ? "item" : "items"} · ₹
                {cart.cartValue}
              </span>
              <IconButton
                icon={<FaRegTrashAlt size={15} />}
                label="Clear cart"
                variant="ghost-inverse"
                size="sm"
                onClick={handleClearCart}
              />
            </div>
            <Button size="sm" onClick={handleCheckout}>
              Checkout →
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const FoodCard = ({ item, quantity, onAdd, onUpdateQuantity, onRemove, compact }) => {
  const isUnavailable = item.availability !== "available";

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-(--color-border) bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        isUnavailable ? "opacity-60" : ""
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
          className="absolute left-3 top-3 flex h-4 w-4 items-center justify-center rounded-sm border-2"
          style={{ borderColor: item.type === "veg" ? "var(--color-veg)" : "var(--color-nonveg)" }}
          aria-label={item.type}
          title={item.type}
        >
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: item.type === "veg" ? "var(--color-veg)" : "var(--color-nonveg)" }}
          />
        </span>
        {isUnavailable && (
          <Badge variant="dark" className="absolute right-3 top-3 uppercase">
            {item.availability}
          </Badge>
        )}
      </div>

      <div className="p-4">
        <h3 className="truncate font-bold text-(--color-text)">{item.itemName}</h3>
        {!compact && item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-(--color-text-secondary)">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between gap-2">
          <PriceDisplay amount={item.price} />
          {quantity > 0 ? (
            <QuantitySelector
              size="sm"
              quantity={quantity}
              onChange={onUpdateQuantity}
              onRemove={onRemove}
            />
          ) : (
            <Button size="sm" onClick={onAdd} disabled={isUnavailable}>
              + Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDisplayMenu;
