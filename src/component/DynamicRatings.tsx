import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const DynamicRatings: React.FC = () => {
  const [activeItems, setActiveItems] = useState(-1);
  const totalCount = [1, 2, 3, 4, 5];

  const handleClick = (index: number) => {
    setActiveItems(index);
    console.log(`activeItems is: ${activeItems}`);
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
        >
          {totalCount.map((arr, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(index)}
              >
                <div
                  style={{
                    display: "flex",
                    maxWidth: "fit-content",
                    width: index <= activeItems ? "100%" : "0%",
                    overflow: "hidden",
                    position: "absolute",
                  }}
                >
                  <AiFillStar size={20} />
                </div>
                <div
                  style={{ display: "flex", width: "fit-content", position: "relative", bottom: 0 }}
                >
                  <AiOutlineStar size={20} />
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
