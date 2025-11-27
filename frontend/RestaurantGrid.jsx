import RestaurantCard from "./RestaurantCard";

export default function RestaurantGrid({ restaurants }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
      {restaurants.map((r) => (
        <RestaurantCard key={r._id} rest={r} />
      ))}
    </div>
  );
}
