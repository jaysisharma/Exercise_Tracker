import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://54.224.96.96:5000/exercises/')
      .then(response => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  function deleteExercise(id) {
    axios.delete('http://54.224.96.96:5000/exercises/'+id)
      .then(res => console.log(res.data));
    
    setExercises(exercises.filter(el => el._id !== id));
  }

  function exerciseList() {
    return exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
    })
  }

  return (
    <div>
      <h3>Logged Exercises List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { exerciseList() }
        </tbody>
      </table>
    </div>
  )
}

export default ExercisesList;

