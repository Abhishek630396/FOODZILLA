export default function RestaurantCard({ rest }) {
  return (
    <div className="max-w-xs bg-white rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all p-3">
      <img
        src={rest.image}
        alt={rest.name}
        className="w-full h-32 object-cover rounded-lg"
      />

      <h2 className="text-lg font-bold mt-2">{rest.name}</h2>
      <p className="text-sm text-gray-600">{rest.cuisine}</p>

      <div className="flex justify-between mt-2">
        <span className="text-yellow-600 font-semibold">⭐ {rest.rating}</span>
        <span className="text-green-600 font-bold">₹ {rest.price}</span>
      </div>
    </div>
  );
}
