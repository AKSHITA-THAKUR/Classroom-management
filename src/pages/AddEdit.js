import React , {useState , useEffect}from 'react';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-toastify';
import "./AddEdit.css";


const initialState = {
     studentName : "",
     fatherName : "",
     motherName : "",
     age : "",
     address : "",
     regDate : ""
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);


    const {studentName , fatherName , motherName , age , address , regDate} = state;

    const navigate = useNavigate();

   const {id} = useParams();
   
   useEffect(() => {
   axios.get(`http://localhost:5000/api/get/${id}`)
   .then((resp) => setState({...resp.data[0]}));
   },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!studentName || !fatherName || !motherName || !age || !address || !regDate){
           alert("Please fill all the fields");
        }
        else{
          if(!id){
            axios.post("http://localhost:5000/api/post",{
              studentName,
              fatherName,
              motherName,
              age,
              address,
              regDate
            }).then(()=> {
           setState( {studentName: "", fatherName: "", motherName: "", age: "", address: "", regDate: ""});
            })
            .catch((err) => toast.error("Kindly fill all fields"));
            toast.success("Contact added successfully");
          }
          else
          {
            axios.put(`http://localhost:5000/api/update/${id}`,{
              studentName,
              fatherName,
              motherName,
              age,
              address,
              regDate
            }).then(()=> {
           setState( {studentName: "", fatherName: "", motherName: "", age: "", address: "", regDate: ""});
            })
            .catch((err) => toast.error("Kindly fill all fields"));
            toast.success("Contact updated successfully");
          }
          setTimeout(() => navigate("/"), 500);
          }

    };

    const handleInputChange = (e) => {
        const {name , value} = e.target;
        setState({...state, [name]: value});
        
    };



  return (
    <div style={{marginTop: "100px"}}>
      <form style = {{
        margin :"auto",
        padding :"15px",
        maxWidth : "500px",
        alignContent : "center"
      }}
      onSubmit = {handleSubmit}>
        <label htmlForm = "studentName"> Name</label>
        <input type="text" id='studentName' name='studentName' placeholder='Your name' value={studentName || ""} onChange = {handleInputChange} />
        <label htmlForm = "fatherName"> Father Name </label>
        <input type="text" id='fatherName' name='fatherName' placeholder='Your father name' value={fatherName || ""} onChange = {handleInputChange} />
        <label htmlForm = "motherName">Mother Name</label>
        <input type="text" id='motherName' name='motherName' placeholder='Your mother name' value={motherName || ""} onChange = {handleInputChange} />
        <label htmlForm = "age"> Age </label>
        <input type="number" id='age' name='age' placeholder='Your age' value={age || ""} onChange = {handleInputChange} />
        <label htmlForm = "address"> Address</label>
        <input type="text" id='address' name='address' placeholder='Your address' value={address || ""} onChange = {handleInputChange} />
        <label htmlForm = "regDate"> Registration Date</label>
        <input type="date" id='regDate' name='regDate' placeholder='Your Registration date' value={regDate||""} onChange = {handleInputChange} />

        <input type='submit' value={id ? "update" : "Save"}/>
        <Link to= "/">
        <input type='button' value="Go Back"/>
        </Link>
      </form>
    </div>
  )
}

export default AddEdit
