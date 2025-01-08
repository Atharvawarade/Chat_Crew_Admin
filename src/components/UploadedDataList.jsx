import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Assuming Firebase is set up in this file

const UploadedDataList = () => {
  const [uploadedData, setUploadedData] = useState([]);

  useEffect(() => {
    const fetchUploadedData = async () => {
      const querySnapshot = await getDocs(collection(db, 'UploadedData'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setUploadedData(data);
    };
    
    fetchUploadedData();
  }, []);

  return (
    <div className="uploaded-data-list">
      <h4>Uploaded Data</h4>
      {uploadedData.length > 0 ? (
        <ul>
          {uploadedData.map((data, index) => (
            <li key={index} className="uploaded-data-item">
              <h5>{data.institutionName}</h5>
              <p><strong>Contact:</strong> {data.contact}</p>
              <p><strong>Courses Offered:</strong> {data.coursesOffered}</p>
              <p><strong>Eligibility:</strong> {data.eligibility}</p>
              <p><strong>Documents Required:</strong> {data.documents}</p>
              <p><strong>Fee:</strong> ₹{data.fee}</p>
              <p><strong>Start Date:</strong> {data.startDate}</p>
              <p><strong>End Date:</strong> {data.endDate}</p>
              <p><strong>Notes:</strong> {data.notes}</p>
              <p><strong>Procedure:</strong> {data.procedure}</p>
              <p><strong>Timestamp:</strong> {data.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data uploaded yet.</p>
      )}
    </div>
  );
};

export default UploadedDataList;
