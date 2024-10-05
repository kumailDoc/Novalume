import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const StarMap = () => {
  const [dots, setDots] = useState([]);
  const svgRef = useRef(null);

  // Function to generate random dots
  const generateRandomDots = (numDots) => {
    const width = 500;
    const height = 500;
    const newDots = [];

    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      newDots.push({ x, y });
    }
    
    setDots(newDots);
  };

  // useEffect to run the random dot generation on first load
  useEffect(() => {
    generateRandomDots(100); // Generates 100 random dots when the component mounts
  }, []);

  // Effect to render dots on the canvas using D3
  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    // Clear existing dots
    svgElement.selectAll("circle").remove();

    // Draw new dots
    svgElement
      .selectAll("circle")
      .data(dots)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5)
      .attr("fill", "white");
  }, [dots]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div>
        <button
          onClick={() => generateRandomDots(100)}
          style={{ marginBottom: "10px" }}
        >
          Generate Random Dots
        </button>
        <svg
          ref={svgRef}
          width={500}
          height={500}
          style={{
            background: "black",
            border: "1px solid #ccc",
            cursor: "crosshair",
          }}
        ></svg>
      </div>
    </div>
  );
};

export default StarMap;
