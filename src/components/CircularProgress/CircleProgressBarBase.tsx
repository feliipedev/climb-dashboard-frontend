import { useState, useEffect } from "react";

type Props = {
  percentage: number;
};

const CircularProgressBarBase = ({
  percentage,
}: Props): JSX.Element => {
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
          fill="#79C6C0"
          fontSize="18px"
          fontFamily="Poppins"
          fontStyle="normal"
          fontWeight="400"
          x="50%"
          y="50%"
          dy="10px"
          textAnchor="middle"
        >
          {`R$ 18.589,63`}
        </text>
      </svg>
    </>
  );
};

export default CircularProgressBarBase;
