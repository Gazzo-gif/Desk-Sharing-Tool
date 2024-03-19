import React from "react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function ColumnGraph(props) {
  // Define state to hold the received value
  const [receivedValue, setReceivedValue] = useState("");
  useEffect(() => {
    setReceivedValue(props.value);
  }, [receivedValue]);

  const data = [
    ["Day of the Week", "Hours", { role: "style" }],
    ["Monday", getRandomInt(7, 20), "gold"], // RGB value
    ["Tuesday", getRandomInt(7, 20), "gold"], // English color name
    ["Wednesday", getRandomInt(7, 20), "gold"],
    ["Thursday", getRandomInt(7, 20), "gold"], // CSS-style declaration
    ["Friday", getRandomInt(7, 20), "gold"],
  ];

  // Function to generate random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    // console.log(data);
  }, [data]);
  return (
    <Chart
      chartType="ColumnChart"
      width="100%"
      height="400px"
      data={data}
      //   className="column"
    />
  );
}
