import React, { useEffect, useMemo, useState } from "react";
import transparent from "../assets/transparent.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  FaMagnifyingGlass,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaChevronDown,
  FaMoon,
  FaSun,
} from "react-icons/fa6";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Restaurants", to: "/order-now" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const DASHBOARD_ROUTE_BY_ROLE = {
  manager: "/restaurantdashboard",
  partner: "/riderdashboard",
  customer: "/userdashboard",
  admin: "/admindashboard",
};

const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart?.cartItem?.length || 0;
  } catch {
    return 0;
  }
};

const Header = () => {
  const { user, isLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartTick, setCartTick] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cartCount = useMemo(() => getCartCount(), [location.pathname, cartTick]);

  useEffect(() => {
    const syncCart = () => setCartTick((prev) => prev + 1);
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  const handleProfileClick = () => {
    const target = DASHBOARD_ROUTE_BY_ROLE[user?.role];
    if (target) navigate(target);
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-accent)/40 bg-(--color-primary) shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link to={"/"} onClick={() => setMobileOpen(false)} className="flex shrink-0 items-center gap-2">
          <img
            src={transparent}
            alt="Craving logo"
            className="h-10 w-16 object-cover invert-100 sm:h-11 sm:w-18"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                isActive(link.to)
                  ? "bg-white/15 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {theme === "dark" ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>

          <button
            type="button"
            aria-label="Search restaurants"
            onClick={() => navigate("/order-now")}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaMagnifyingGlass size={15} />
          </button>

          <button
            type="button"
            aria-label="View cart"
            onClick={() => navigate("/checkout-page")}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <FaCartShopping size={15} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-secondary) px-1 text-[10px] font-bold leading-none text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            {isLogin ? (
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex items-center gap-1.5 rounded-full bg-white/10 py-1.5 pl-3 pr-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <span className="max-w-28 truncate">
                  {user?.fullName}
                </span>
                <FaChevronDown size={10} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-full bg-(--color-secondary) px-4 py-2 text-sm font-bold text-(--color-text) transition hover:bg-(--color-secondary-hover) hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="rounded-full border border-white/70 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Register
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-(--color-primary) px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive(link.to)
                    ? "bg-white/15 text-white"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
            {isLogin ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  handleProfileClick();
                }}
                className="w-full rounded-full bg-white/10 py-2 text-sm font-semibold text-white"
              >
                {user?.fullName}'s Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                  className="flex-1 rounded-full bg-(--color-secondary) py-2 text-sm font-bold text-(--color-text) hover:bg-(--color-secondary-hover) hover:text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/register");
                  }}
                  className="flex-1 rounded-full border border-white/70 py-2 text-sm font-bold text-white hover:bg-white/10"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
