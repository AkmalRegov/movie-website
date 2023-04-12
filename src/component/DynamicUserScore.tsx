import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SCircleWrapperSvg = styled.svg`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transform: rotate(-90deg);
`;

const SBaseCircle = styled.circle`
  fill: transparent;
  stroke-width: ${(props) => props.strokeWidth};
  stroke: #ddd;
`;

const SProgressIndicatorCircle = styled.circle`
  fill: transparent;
  stroke-width: ${(props) => props.strokeWidth};
  stroke: #07c;
  stroke-dasharray: ${(props) => props.strokeDasharray};
  stroke-dashoffset: ${(props) => props.strokeDashoffset};
`;

export const DynamicUserScore: React.FC<{
  size: number;
  strokeWidth: number;
  progress?: number;
  children?: React.ReactNode;
}> = ({ size, strokeWidth, progress, children }) => {
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
    console.log(`progress is: ${progress}`);
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
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <SCircleWrapperSvg width={size} height={size}>
          <SBaseCircle
            cx={circleCenter}
            cy={circleCenter}
            r={circleRadius}
            strokeWidth={strokeWidth}
          />
          <SProgressIndicatorCircle
            cx={circleCenter}
            cy={circleCenter}
            r={circleRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={progress ? `${circleDashArray}px` : ""}
            strokeDashoffset={progress ? `${circleDashOffset}px` : ""}
          />
        </SCircleWrapperSvg>
        {children}
      </div>
    </>
  );
};
