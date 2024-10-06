import React from "react";
import * as d3 from "d3";

// A separate component for downloading the star map
const StarMapDownloader = ({ svgRef }) => {
  // Function to download the star map as a PNG image
  const downloadStarMap = () => {
    const svgElement = d3.select(svgRef.current).node(); // Get the SVG element
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement); // Convert the SVG to a string

    const canvas = document.createElement("canvas"); // Create a canvas element
    const context = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      canvas.width = svgElement.clientWidth; // Set canvas size based on SVG dimensions
      canvas.height = svgElement.clientHeight;
      context.drawImage(img, 0, 0); // Draw the SVG image on the canvas
      URL.revokeObjectURL(url); // Revoke the object URL

      // Create a link to download the image
      const a = document.createElement("a");
      a.download = "starmap.png"; // Filename
      a.href = canvas.toDataURL("image/png"); // Convert the canvas to a PNG
      a.click(); // Trigger the download
    };

    img.src = url; // Set the image source to the SVG Blob URL
  };

  return (
    <button onClick={downloadStarMap} style={{ marginBottom: "10px" }}>
      Download Star Map
    </button>
  );
};

export default StarMapDownloader;
