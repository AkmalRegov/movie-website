import React, { useRef, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const DynamicRatings: React.FC = () => {
  const [activeItems, setActiveItems] = useState(-1);
  const [hoverActiveItems, setHoverActiveItems] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const totalCount = [1, 2, 3, 4, 5];
  const precision = 1;

  //   const handleClick = (index: number) => {
  //     setActiveItems(index);
  //     console.log(`activeItems is: ${activeItems}`);
  //   };

  function calculateRating(e: React.MouseEvent) {
    const { width, left } = ratingContainerRef.current.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    const numberInItems = percent * totalCount.length;
    const nearestNumber = Math.round((numberInItems + precision / 2) / precision) * precision;
    return Number(nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0));
  }

  const handleClick = (e: React.MouseEvent) => {
    setIsHovered(false);
    setActiveItems(calculateRating(e));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setIsHovered(true);
    setHoverActiveItems(calculateRating(e));
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    setHoverActiveItems(-1);
    setIsHovered(false);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px", gap: "0.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            position: "relative",
            cursor: "pointer",
            textAlign: "left",
          }}
          ref={ratingContainerRef}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {totalCount.map((arr, index) => {
            //half-rating logic doesn't work...
            const activeState = isHovered ? hoverActiveItems : activeItems;

            const showEmptyIcon = activeState === -1 || activeState < index + 1;

            const isActiveRating = activeState !== 1;
            const isRatingWithPrecision = activeState % 1 !== 0;
            const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
            const showRatingWithPrecision =
              isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;
            // const showRatingWithPrecision = true;
            // console.log(`showRatingWithPrecision is: ${showRatingWithPrecision}`);
            // console.log(`${(activeState % 1) * 100}`);

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : "0%",
                    overflow: "hidden",
                    position: "absolute",
                  }}
                >
                  <AiFillStar size={20} />
                </div>
                <div
                  style={{
                    color: showEmptyIcon ? "gray" : "inherit",
                  }}
                >
                  {/* <AiOutlineStar size={20} /> */}
                  {showEmptyIcon ? <AiOutlineStar size={20} /> : <AiFillStar size={20} />}
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => setActiveItems(-1)}>Reset</button>
      </div>
    </>
  );
};
