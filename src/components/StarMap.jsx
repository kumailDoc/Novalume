import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const StarMap = () => {
  const [dots, setDots] = useState([]);
  const [clickedDots, setClickedDots] = useState([]); // To store clicked dots
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
    setClickedDots([]); // Reset clicked dots when generating new dots
  };

  // Function to handle dot click
  const handleDotClick = (dot, index) => {
    setClickedDots((prevClickedDots) => {
      const newClickedDots = [...prevClickedDots, dot];

      if (newClickedDots.length === 2) {
        // When two dots are clicked, draw a line between them
        drawLine(newClickedDots[0], newClickedDots[1]);
        return [newClickedDots[1]]; // Keep the second dot to continue connecting to the next one
      }

      // Change the clicked dot's color to blue
      const svgElement = d3.select(svgRef.current);
      svgElement
        .select(`#dot-${index}`)
        .attr("fill", "blue");

      return newClickedDots; // Otherwise, continue adding clicked dots
    });
  };

  // Function to draw a line between two dots
  const drawLine = (dot1, dot2) => {
    const svgElement = d3.select(svgRef.current);

    svgElement
      .append("line")
      .attr("x1", dot1.x)
      .attr("y1", dot1.y)
      .attr("x2", dot2.x)
      .attr("y2", dot2.y)
      .attr("stroke", "white")
      .attr("stroke-width", 2);
  };

  // useEffect to run the random dot generation on first load
  useEffect(() => {
    generateRandomDots(100); // Generates 100 random dots when the component mounts
  }, []);

  // Effect to render dots on the canvas using D3
  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    // Clear existing dots and lines
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
      .attr("fill", "white")
      .attr("id", (d, i) => `dot-${i}`) // Assign unique IDs to each dot using index
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        const index = dots.indexOf(d); // Find the index of the clicked dot
        handleDotClick(d, index); // Pass dot and its index to handler
      });
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
