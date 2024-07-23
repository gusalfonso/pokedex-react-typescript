import { useEffect, useRef } from "react";
import { HorizontalBarChartProps } from "./types";
import * as d3 from "d3";

function HorizontalBarChart({ stats }: HorizontalBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return;
    // if (!svgRef.current) return;

    const data = [
      { label: "HP", value: stats.hp },
      { label: "Attack", value: stats.attack },
      { label: "Defense", value: stats.defense },
      { label: "Speed", value: stats.speed },
      { label: "Weight", value: stats.weight },
      { label: "Height", value: stats.height },
    ];

    const margin = { top: 20, right: 20, bottom: 20, left: 70 };
    const width = 300 - margin.left - margin.right;
    const height = 275 - margin.top - margin.bottom; // Ajustar si es necesario

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + 10 + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0]) // Manejar valores nulos
      .range([0, width]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, height])
      .padding(0.1);

    // Draw bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", (d) => yScale(d.label) || 0) // Manejar valores nulos
      .attr("width", (d) => xScale(d.value))
      .attr("height", yScale.bandwidth())
      .attr("fill", "#4CAF50");

    // Add labels
    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => xScale(d.value) + 10)
      .attr("y", (d) => (yScale(d.label) || 0) + yScale.bandwidth() / 2)
      .attr("dy", ".35em")
      .text((d) => d.value)
      .style("font-size", "12px")
      .style("fill", "#333");

    svg
      .append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(yScale).tickSize(0));

    // Hide the x-axis (remove it)
    svg.selectAll(".x-axis").remove();

    // Style axes
    svg.selectAll(".y-axis path").style("display", "none");
    svg.selectAll(".y-axis line").style("stroke", "#ddd");

    return () => {
      d3.select(svgElement).selectAll("*").remove();
    };
  }, [stats]);

  return <svg ref={svgRef}></svg>;
}

export default HorizontalBarChart;
