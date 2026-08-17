import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const ExceptionList = ({ userId }) => {
  const [exceptions, setExceptions] = useState([]);

  useEffect(() => {
    const fetchExceptions = async () => {
      try {
        const res = await API.get(`/exceptions/${userId}`);
        setExceptions(res.data);
      } catch (err) {
        alert('Error fetching exceptions: ' + err.response.data.error);
      }
    };
    fetchExceptions();
  }, [userId]);

  return (
    <div>
      <h3>Exceptions</h3>
      <ul>
        {exceptions.map((exc) => (
          <li key={exc.id}>
            Reason: {exc.reason} | Comments: {exc.comments} | Date: {new Date(exc.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExceptionList;
