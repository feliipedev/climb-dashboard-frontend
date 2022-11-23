import { useState, useEffect } from "react";

const CircularProgress = ({
  size,
  strokeWidth,
  percentage,
  color,
}: any): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        style={{ marginTop: 20, marginBottom: 60 }}
      >
        <circle
          fill="#F5F5F5"
          stroke="#F0FAFA"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        ></circle>
        <defs>
          <clipPath id="cut-off">
            <rect x="0" y="50" width="100" height="100" />
          </clipPath>
          <linearGradient id="gradient">
            <stop offset="0" stop-color="#6EAEA9"></stop>
            <stop offset="100%" stop-color="#6EAEA9" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <circle
          fill="none"
          stroke="url(#gradient)"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, circumference - dash] as any}
          strokeLinecap="round"
          style={{
            transition: "all 0.5s",
          }}
        ></circle>
        <text
          fill={color}
          fontSize="32px"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight="bold"
          x="50%"
          y="50%"
          dy="10px"
          textAnchor="middle"
        >
          {`${percentage}%`}
        </text>
      </svg>
    </>
  );
};

export default CircularProgress;
