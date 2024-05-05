// Hexagon.js
export default function Hexagon({ x, y, size, color, className, index }) {
  const points = [
    [size * 0.5, 0],
    [size * 1.5, 0],
    [size * 2, (size * Math.sqrt(3)) / 2],
    [size * 1.5, size * Math.sqrt(3)],
    [size * 0.5, size * Math.sqrt(3)],
    [0, (size * Math.sqrt(3)) / 2],
  ]
    .map((point) => point.join(","))
    .join(" ");
  return (
    <>
    <polygon
      points={points}
      fill={color}
      transform={`translate(${x},${y})`}
      style={{
        stroke: "transparent",
        strokeWidth: 3,
      }}
      className={className}
      id={"hexagon_"+index}
    >
    </polygon>
    <text fill="white"
        x={x+0.6*size}
        y={y+size}
    >
        {/* {index} */}
    </text>
    </>
  );
}
