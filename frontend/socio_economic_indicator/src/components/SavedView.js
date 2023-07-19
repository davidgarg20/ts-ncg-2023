import React from "react";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";

const SavedView = ({ viewData }) => {
  const onDeleteView = async () => {
    const response = await fetch(`http://localhost:8080/view/${viewData.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("View deleted");
      redirect("/views");
    }
  };

  return (
    <div>
      <h2>Saved View</h2>
      <p>Name: {viewData.name}</p>
      <p>Country: {viewData.country}</p>
      <p>Indicator: {viewData.indicator}</p>
      <p>ChartType: {viewData.chartType}</p>
      <p>Start Date: {viewData.startDate}</p>
      <p>End Date: {viewData.endDate}</p>
      <button onClick={onDeleteView}> Delete View </button>
      <Link to={`/view/edit/${viewData.id}`}> Edit View </Link>
    </div>
  );
};

export default SavedView;
