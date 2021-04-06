import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [""],
  });

  const ref = useRef("userInput");

  useEffect(() => {
    // setExercise((prevValue) => {
    //   return {
    //     ...prevValue,
    //     users: ["test user"],
    //     username: "test user",
    //   };
    // });

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setExercise((prevValue) => {
            return {
              ...prevValue,
              users: response.data.map((user) => user.username),
              username: response.data[0].username,
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleChangeUsername(e) {
    setExercise((prevValue) => {
      return {
        ...prevValue,
        username: e.target.value,
      };
    });
  }

  function handleChangeDescription(e) {
    setExercise((prevValue) => {
      return {
        ...prevValue,
        description: e.target.value,
      };
    });
  }

  function handleChangeDuration(e) {
    setExercise((prevValue) => {
      return {
        ...prevValue,
        duration: e.target.value,
      };
    });
  }

  function handleChangeDate(date) {
    setExercise((prevValue) => {
      return {
        ...prevValue,
        date: date,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={ref}
            required
            className="form-control"
            value={exercise.username}
            onChange={handleChangeUsername}
          >
            {exercise.users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={handleChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={handleChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={exercise.date} onChange={handleChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
