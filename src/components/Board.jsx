import Tile from "./Tile";

const Board = ({ board }) => {
  const size = board.length;
  return (
    <div
      className="bg-gray-400 rounded-xl p-3 gap-3 shadow-2xl"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        width:'fit-content',
      }}
    >
        {board.map((row, i) => 
            row.map((value, j) => <Tile key={`${i}-${j}`} value={value} />)
        )}
    </div>
  );
};

export default Board;
