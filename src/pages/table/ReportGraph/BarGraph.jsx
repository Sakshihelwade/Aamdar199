import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const BarGraph = ({ height = 400, year, village }) => {
  const [graphData, setGraphData] = useState([]);
  const [party, setParty] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [votes, setVotes] = useState([]);
  
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  const getGraphData = () => {
    axios.get(`${base_url}/GraphAPI?year=${year}&village=${village}`)
      .then((resp) => {
        const candidates = resp.data[0]?.candidates || []; // Handle case where candidates might be undefined
        setGraphData(candidates);
        
        // Extract party names, percentages, and votes
        const partyNames = candidates.map(candidate => candidate.name);
        const percentages = candidates.map(candidate => candidate.percentage);
        const votes = candidates.map(candidate => candidate.votes);
        
        // Set the extracted data to state
        setParty(partyNames);
        setPercentage(percentages);
        setVotes(votes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGraphData();
  }, [village, year]); // API will be called whenever `village` or `year` changes

  // Update series and options based on the data fetched
  const series = [
    {
      name: "एकूण मतदार",
      data: votes, // Set the votes array for the series data
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "45%",
      },
    },
    xaxis: {
      categories: party.length ? party : ["No Data"], // Handle empty categories
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " मतदार";
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex }) {
        return `${percentage[seriesIndex] || 0}%`; // Default to 0% if no percentage
      },
      style: {
        colors: ['#000000'], 
        fontSize: '12px',
      },
    },
    colors: ["#007bff"],
  };

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default BarGraph;
