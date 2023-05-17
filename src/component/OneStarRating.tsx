import React, { useRef, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const OneStarRating: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [fixedPercentage, setFixedPercentage] = useState(0);
  const ratingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleMouseOver = (e: React.MouseEvent) => {
    const { width, left } = ratingContainerRef.current.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    percent = Number(percent.toFixed(1));
    setPercentage(percent);
    if (percent >= 0.5) setIsHovered(true);
    else setIsHovered(false);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        ref={ratingContainerRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{ width: "24px", marginLeft: "100px" }}
      >
        {isHovered ? <AiFillStar width={"50%"} size={20} /> : <AiOutlineStar size={20} />}
      </div>
      <p style={{ color: "black" }}>percentage is: {percentage}</p>
      <p style={{ color: "black" }}>
        star is: {percentage === 0 ? "empty" : percentage > 0.5 ? "full" : "half"}
      </p>
    </>
  );
};
