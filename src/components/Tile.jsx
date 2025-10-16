const getTileColor = (value) => {
  const colors = {
    0: "bg-gray-200",
    2: "bg-amber-100",
    4: "bg-amber-200",
    8: "bg-orange-300",
    16: "bg-orange-400",
    32: "bg-orange-500",
    64: "bg-red-400",
    128: "bg-yellow-400",
    256: "bg-yellow-500",
    512: "bg-yellow-600",
    1024: "bg-emerald-400",
    2048: "bg-emerald-600",
  };
  return colors[value] || "bg-gray-800";
};
const getTileTextColor = (value) => {
  return value > 4 ? "text-white" : "text-gray-700";
};
const Tile = ({ value }) => {
  return (
    <div
      className={`${getTileColor(value)} ${getTileTextColor(
        value
      )} flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-200 aspect-square shadow-md`}
    >
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
