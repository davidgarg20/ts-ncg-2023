import React, { useState } from 'react';
import { useNavigate , useParams} from 'react-router-dom';

const EditView = () => {
  // State to hold the edited view data
  const param = useParams();
  console.log(param.id);
  const [formData, setFormData] = useState({  });

  const navigate = useNavigate();

  // Function to handle changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Function to save the updated view data
  const handleSave = async () => {
    const response = await fetch("http://localhost:8080/view", {
        method: "POST",
        body: JSON.stringify(formData),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (response.ok) {
        console.log("View saved");
        navigate("/views");
    }
  };

  return (
    <div>
      <h2>Edit View</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Country:
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </label>
      <label>
        Indicator:
        <input type="text" name="indicator" value={formData.indicator} onChange={handleChange} />
      </label>
      <label>
        Start Date:
        <input type="month" name="startDate" value={formData.startDate} onChange={handleChange} />
      </label>
      <label>
        End Date:
        <input type="month" name="endDate" value={formData.endDate} onChange={handleChange} />
      </label>
      <button onClick={handleSave}>Save View</button>

    </div>
  );
};

export default EditView;