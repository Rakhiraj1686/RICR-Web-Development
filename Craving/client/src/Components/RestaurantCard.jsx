import React from "react";
import { FaBowlFood, FaLocationDot } from "react-icons/fa6";
import { Card, Badge, Button } from "./ui";

/**
 * Restaurant card used on Home ("Popular Near You") and the restaurant
 * discovery page. Only renders fields the API actually returns
 * (restaurantName, cuisine, address, photo) — no invented rating/delivery
 * time/price numbers, since the backend doesn't provide them yet. Add
 * those fields here (not as a second card component) once the API does.
 */
const RestaurantCard = ({ restaurant, onOpen }) => {
  const { restaurantName, cuisine, address, photo } = restaurant;

  return (
    <Card
      interactive
      className="group cursor-pointer overflow-hidden"
      onClick={() => onOpen(restaurant)}
    >
      <div className="relative h-40 overflow-hidden bg-(--color-section-light) sm:h-44">
        {photo?.url ? (
          <img
            src={photo.url}
            alt={`${restaurantName || "Restaurant"} storefront`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl text-(--color-primary)">
            <FaBowlFood aria-hidden="true" />
          </div>
        )}
        <Badge variant="dark" className="absolute right-3 top-3">
          Open now
        </Badge>
      </div>

      <div className="space-y-1.5 p-4">
        <h3 className="truncate text-base font-bold text-(--color-text)">{restaurantName}</h3>
        {cuisine && <p className="truncate text-sm text-(--color-text-secondary)">{cuisine}</p>}
        {address && (
          <p className="flex items-center gap-1 truncate text-xs text-(--color-text-muted)">
            <FaLocationDot className="shrink-0" aria-hidden="true" />
            {address}
          </p>
        )}

        <Button
          size="sm"
          fullWidth
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(restaurant);
          }}
        >
          View menu
        </Button>
      </div>
    </Card>
  );
};

export default RestaurantCard;
