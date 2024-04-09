import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Home.css'

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get('http://localhost:5000/api/get');
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if(window.confirm('Are you sure you want to delete this contact'))
    { 
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact deleted successfully");
      setTimeout(() => loadData() , 500);
    }
  }


  return (
    <div  style={{ marginTop: '75px' }}>
    
    <h1> Discover the  profiles of your classroom champions below!</h1>
    
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Father Name</th>
            <th style={{ textAlign: 'center' }}>Mother Name</th>
            <th style={{ textAlign: 'center' }}>Age</th>
            <th style={{ textAlign: 'center' }}>Address</th>
            <th style={{ textAlign: 'center' }}>Reg. Date</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
                <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item['studentName']}</td>
                <td>{item['fatherName']}</td>
                <td>{item['motherName']}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item['regDate']}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                  
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={"/addContact"} >
    <button className='btn btn-contact'> Add Contact</button>
    </Link>
    </div>
  );
};

export default Home;
