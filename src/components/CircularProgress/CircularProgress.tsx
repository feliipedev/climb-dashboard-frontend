import { useState, useEffect } from "react";
interface Props {
  percentage: number;
}

const CircularProgress = ({ percentage }: Props): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const viewBox = `0 0 ${150} ${150}`;
  const radius = (150 - 10) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <>
      {percentage === 100 ? (
        <svg
          width={150}
          height={150}
          viewBox={viewBox}
          style={{ marginTop: 20, marginBottom: 60 }}
        >
          <circle
            fill="#F5F5F5"
            stroke="#F0FAFA"
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${10}px`}
          ></circle>
          <circle
            fill="none"
            stroke="#79C6C0"
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${10}px`}
            transform={`rotate(-90 ${150 / 2} ${150 / 2})`}
            strokeDasharray={[dash, circumference - dash] as any}
            strokeLinecap="round"
            style={{
              transition: "all 0.5s",
            }}
          ></circle>
          <text
            fill="#6EAEA9"
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
      ) : (
        <svg
          width={150}
          height={150}
          viewBox={viewBox}
          style={{ marginTop: 20, marginBottom: 60 }}
        >
          <circle
            fill="#F5F5F5"
            stroke="#F0FAFA"
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${10}px`}
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
            cx={150 / 2}
            cy={150 / 2}
            r={radius}
            strokeWidth={`${10}px`}
            transform={`rotate(-90 ${150 / 2} ${150 / 2})`}
            strokeDasharray={[dash, circumference - dash] as any}
            strokeLinecap="round"
            style={{
              transition: "all 0.5s",
            }}
          ></circle>
          <text
            fill="#6EAEA9"
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
      )}
    </>
  );
};

export default CircularProgress;
