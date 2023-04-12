import React, { useState, useEffect, useRef } from "react";

export const DynamicUserScore: React.FC<{
  size: number;
  strokeWidth: number;
  progress?: number;
}> = ({ size, strokeWidth, progress }) => {
  const [circleCenter, setCircleCenter] = useState(0);
  const [circleRadius, setCircleRadius] = useState(0);
  const [circleDashArray, setCircleDashArray] = useState(0);
  const [circleDashOffset, setCircleDashOffset] = useState(0);
  const callOnce = useRef(false);

  function getCircleTrackAndIndicatorSize(
    size: number,
    strokeWidth: number,
    progress: number | undefined,
  ) {
    var center = size / 2;
    var radius = center - strokeWidth;
    setCircleCenter(center);
    setCircleRadius(radius);
    if (progress === undefined) return;
    var arcLengthForDashArray = 2 * 3.14 * radius;
    var arcOffsetForDashOffset = arcLengthForDashArray * ((100 - progress) / 100);
    console.log(arcLengthForDashArray);
    console.log(arcOffsetForDashOffset);
    setCircleDashArray(arcLengthForDashArray);
    setCircleDashOffset(arcOffsetForDashOffset);
  }

  useEffect(() => {
    if (callOnce.current) return;
    getCircleTrackAndIndicatorSize(size, strokeWidth, progress);
    callOnce.current = true;
  }, []);

  return (
    <>
      <div>
        <svg style={{ width: size, height: size }}>
          <circle
            cx={circleCenter}
            cy={circleCenter}
            r={circleRadius}
            fill="transparent"
            strokeWidth={strokeWidth}
            stroke="#ddd"
          />
          <circle
            cx={circleCenter}
            cy={circleCenter}
            r={circleRadius}
            fill="transparent"
            strokeWidth={strokeWidth}
            stroke="#07c"
            strokeDasharray={progress ? `${circleDashArray}px` : ""}
            strokeDashoffset={progress ? `${circleDashOffset}px` : ""}
          />
        </svg>
      </div>
    </>
  );
};
