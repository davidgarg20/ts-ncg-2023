import React, { useEffect, useState } from "react";
import SavedView from "./SavedView";

const Views = () => {
  const [viewData, setViewData] = useState([]);
  async function fetchViewData() {
    const response = await fetch("http://localhost:8080/view");
    const data = await response.json();
    setViewData(data);
  }

  useEffect(() => {
    fetchViewData();
  }, []);

  return (
    <div>
      <h1>Saved Views</h1>
      {viewData.map((view) => {
        return <SavedView viewData={view} />;
      })}
    </div>
  );
};

export default Views;
