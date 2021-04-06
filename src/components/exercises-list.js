import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Exercise(props) {
  return (
    <div>
      <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
          <Link to={"/edit/" + props.exercise._id}>edit</Link> |
          <a
            href="#"
            onClick={() => {
              props.deleteExercise(props.exercise._id);
            }}
          >
            delete
          </a>
        </td>
      </tr>
    </div>
  );
}

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    setExercises({
      exercises: exercises.filter((el) => el._id !== id),
    });
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
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
          {exercises.map((currentexercise) => (
            <Exercise
              exercise={currentexercise}
              deleteExercise={handleDelete}
              key={currentexercise._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExerciseList;
