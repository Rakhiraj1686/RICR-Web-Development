import React, { useEffect, useMemo, useState } from "react";
import { FaUsers, FaBan, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../Config/Api";
import { SearchInput, SkeletonRow, EmptyState, ErrorState, Avatar, Badge, Button, ConfirmationModal } from "../ui";

const ROLE_TABS = [
  { key: "customer", label: "Customers" },
  { key: "manager", label: "Restaurants" },
  { key: "partner", label: "Riders" },
];

const AdminPeople = () => {
  const [activeRole, setActiveRole] = useState("customer");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [pendingAction, setPendingAction] = useState(null); // { user, nextStatus }
  const [actioning, setActioning] = useState(false);

  const fetchUsers = async (role) => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get(`/admin/users/${role}`);
      setUsers(Array.isArray(res?.data?.data) ? res.data.data : []);
    } catch (err) {
      console.log(err);
      setError(true);
      toast.error(err?.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(activeRole);
    setSearch("");
  }, [activeRole]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.fullName?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.mobileNumber?.includes(term) ||
        u.restaurantName?.toLowerCase().includes(term)
    );
  }, [users, search]);

  const confirmToggleStatus = (user) => {
    const nextStatus = user.isActive === "blocked" ? "active" : "blocked";
    setPendingAction({ user, nextStatus });
  };

  const handleConfirmToggle = async () => {
    if (!pendingAction) return;
    setActioning(true);
    try {
      const res = await api.patch(`/admin/users/${pendingAction.user._id}/status`, {
        isActive: pendingAction.nextStatus,
      });
      toast.success(res?.data?.message || "Status updated");
      setUsers((prev) =>
        prev.map((u) =>
          u._id === pendingAction.user._id ? { ...u, isActive: pendingAction.nextStatus } : u
        )
      );
      setPendingAction(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't update this account.");
    } finally {
      setActioning(false);
    }
  };

  return (
    <div className="min-h-full overflow-y-auto bg-(--color-background)">
      <div className="mx-auto max-w-400 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-(--color-text) sm:text-4xl">
            Users & Partners
          </h1>
          <p className="mt-2 text-sm text-(--color-text-secondary) sm:text-base">
            Manage every account on the platform — block accounts that violate policy,
            restore them any time.
          </p>
        </div>

        <div className="rounded-[28px] border border-(--color-border) bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-(--color-border) p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {ROLE_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveRole(tab.key)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                    activeRole === tab.key
                      ? "bg-(--color-primary) text-white shadow-md"
                      : "text-(--color-text-secondary) hover:bg-(--color-background) hover:text-(--color-text)"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              placeholder="Search by name, email, phone..."
              className="sm:max-w-xs"
            />
          </div>

          <div className="p-5 sm:p-6">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} columns={4} />
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load users"
                description="Please check your connection and try again."
                onRetry={() => fetchUsers(activeRole)}
              />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<FaUsers />}
                title="No accounts found"
                description={search ? "Try a different search." : "No accounts in this category yet."}
              />
            ) : (
              <div className="divide-y divide-(--color-border)">
                {filtered.map((u) => (
                  <div
                    key={u._id}
                    className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar src={u.photo?.url} name={u.fullName || u.restaurantName} />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-(--color-text)">
                          {u.restaurantName || u.fullName}
                        </p>
                        <p className="truncate text-xs text-(--color-text-secondary)">
                          {u.email} {u.mobileNumber ? `· ${u.mobileNumber}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <Badge variant={u.isActive === "blocked" ? "danger" : "success"}>
                        {u.isActive === "blocked" ? "Blocked" : "Active"}
                      </Badge>
                      <Button
                        size="sm"
                        variant={u.isActive === "blocked" ? "primary" : "outline"}
                        onClick={() => confirmToggleStatus(u)}
                        iconLeft={u.isActive === "blocked" ? <FaCheck /> : <FaBan />}
                      >
                        {u.isActive === "blocked" ? "Unblock" : "Block"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        onConfirm={handleConfirmToggle}
        loading={actioning}
        danger={pendingAction?.nextStatus === "blocked"}
        title={pendingAction?.nextStatus === "blocked" ? "Block this account?" : "Unblock this account?"}
        description={
          pendingAction?.nextStatus === "blocked"
            ? `${pendingAction?.user?.fullName || pendingAction?.user?.restaurantName} won't be able to log in until you unblock them.`
            : `${pendingAction?.user?.fullName || pendingAction?.user?.restaurantName} will be able to log in again.`
        }
        confirmLabel={pendingAction?.nextStatus === "blocked" ? "Block" : "Unblock"}
      />
    </div>
  );
};

export default AdminPeople;
