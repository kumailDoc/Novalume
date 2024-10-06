import React, { useRef, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation
import * as d3 from "d3";
import './StarMap.css';

// User to input a constellation name
const ConstellationNameInput = ({ setConstellationName }) => {
  const handleNameChange = (event) => {
    setConstellationName(event.target.value); // Update the constellation name in the parent component
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ color: "white" }}>Constellation Name: </label>
      <input type="text" onChange={handleNameChange} placeholder="Name here!" />
    </div>
  );
};

const StarMapDownloader = ({ svgRef, constellationName }) => {
  const downloadStarMap = () => {
    const svgElement = d3.select(svgRef.current).node();
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      const padding = 50;
      canvas.width = svgElement.clientWidth;
      canvas.height = svgElement.clientHeight + padding;

      // Draw the star map on the canvas
      context.drawImage(img, 0, 0);

      // Constellation name
      context.font = "20px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        constellationName || "",
        canvas.width / 2,
        canvas.height - 20
      );

      URL.revokeObjectURL(url);

      // Create a link to download the image
      const a = document.createElement("a");
      a.download = "starmap.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    img.src = url;
  };

  return (
    <button className="submit-btn" onClick={downloadStarMap} style={{ marginBottom: "10px" }}>
      Download Star Map
    </button>
  );
};

const StarMap = () => {
  const location = useLocation();
  console.log(location.state); // Log state to check if it's coming through
  const { exoplanet = "No exoplanet selected", difficulty = "No complexity selected" } = location.state || {}; // Use fallback values if state is undefined

  const [dots, setDots] = useState([]);
  const [clickedDots, setClickedDots] = useState([]);
  const [constellationName, setConstellationName] = useState("");
  const svgRef = useRef(null);
  const stars = 1500;

  // Generates random dots and clears lines
  const generateRandomDots = (numDots) => {
    const width = 1000;
    const height = 800;
    const newDots = [];

    // Clear all lines when generating new dots
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("line").remove();

    for (let i = 0; i < numDots; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      newDots.push({ x, y });
    }

    setDots(newDots);
    setClickedDots([]);
  };

  const handleDotClick = (dot, color = "#E6FFFF") => {
    setClickedDots((prevClickedDots) => {
      const newClickedDots = [...prevClickedDots, dot];

      if (newClickedDots.length === 2) {
        drawLine(newClickedDots[0], newClickedDots[1], color);
        return [newClickedDots[1]];
      }

      return newClickedDots;
    });
  };

  const drawLine = (dot1, dot2, lineColor = "white") => {
    const svgElement = d3.select(svgRef.current);

    svgElement
      .append("line")
      .attr("x1", dot1.x)
      .attr("y1", dot1.y)
      .attr("x2", dot2.x)
      .attr("y2", dot2.y)
      .attr("stroke", lineColor)
      .attr("stroke-width", 2);
  };

  useEffect(() => {
    generateRandomDots(stars);
  }, []);

  useEffect(() => {
    const svgElement = d3.select(svgRef.current);

    svgElement.selectAll("circle").remove();

    svgElement
      .selectAll("circle")
      .data(dots)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", () => Math.random())
      .attr("fill", "#FFF4CE")
      .style("opacity", () => Math.random() * 0.7 + 0.3)
      .style("cursor", "pointer")
      .on("mouseover", function () {
        d3.select(this)
          .attr("fill", "rgba(255, 255, 0, 0.5)")
          .attr("stroke", "rgba(255, 255, 0, 0.5)")
          .attr("stroke-width", 6)
          .attr("r", 5);
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("fill", "#FFF4CE")
          .attr("stroke", "none")
          .attr("r", () => Math.random() * 3 + 1)
          .style("opacity", () => Math.random() * 0.7 + 0.3);
      })
      .on("click", function (event, d) {
        const lineColor = "#E6FFFF";
        d3.select(this).attr("fill", lineColor);
        handleDotClick(d, lineColor);
      });
  }, [dots]);

  return (
    <div className="container">
      {/* Display the exoplanet and Complexity */}
      <h3>Exoplanet: {exoplanet}</h3>
      <h3>Complexity: {difficulty}</h3>

      <ConstellationNameInput setConstellationName={setConstellationName} />
      <h3>Constellation Name: {constellationName || ""}</h3>
      <div>
        <button className="submit-btn" onClick={() => generateRandomDots(stars)} style={{ marginBottom: "10px" }}>
          New Perspective
        </button>
        <StarMapDownloader svgRef={svgRef} constellationName={constellationName} />
        <svg
          ref={svgRef}
          width={1000}
          height={800}
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
