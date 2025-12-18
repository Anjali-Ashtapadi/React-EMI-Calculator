import React from "react";
import { Pie } from "react-chartjs-2";
import {Chart as Chartjs, ArcElement, Tooltip, Legend} from "chart.js";

Chartjs.register(ArcElement, Tooltip, Legend);

function PieChart({principal, interest}){
  const data = {
    labels:["Principal amount","Interest Payable"],
    datasets:[
      {
        data:[principal, interest],
        backgroundColor:["#007bff","#ff6384"]
      }
    ]
  }

  return <Pie data={data}/>;


}
export default PieChart