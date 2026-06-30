import { useState } from "react";
import { Button } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import CardItem from "../cardItem/cardItem.jsx"

const ItemsCarousel = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);

  const itemsToShow = 5

  const maxIndex = Math.max(items.length - itemsToShow, 0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const itemWidth = 100 / itemsToShow;

  return (
    <div className="position-relative">
      <div style={{ overflow: "hidden" }}>
        <div
          className="w-100 d-flex"
          style={{
            transform: `translateX(-${startIndex * itemWidth}%)`,
            transition: "transform 0.3s ease",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{ flex: `0 0 ${itemWidth}%`, paddingInline: "8px", minWidth: 0 }}
            >
              <CardItem item={item}/>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="position-absolute top-50 translate-middle-y rounded-circle"
        style={{ backgroundColor: "var(--secondary)", border: "none", width: 36, height: 36, left: -38 }}
      >
        <ChevronLeft />
      </Button>

      <Button
        onClick={handleNext}
        disabled={startIndex >= maxIndex}
        className="position-absolute top-50 translate-middle-y rounded-circle"
        style={{ backgroundColor: "var(--secondary)", border: "none", width: 36, height: 36, right: -38 }}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default ItemsCarousel;