import React, { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/Components/Hero";
export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [gender, setGender] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedAge, setEditedAge] = useState("");
  const [editedGender, setEditedGender] = useState("");

  // Function to handle editing
  const handleEdit = (id, name, age, gender) => {
    // Populate the edited values with existing data
    setEditedName(name);
    setEditedAge(age);
    setEditedGender(gender);

    // Now you can display the edit form and allow the user to modify the data
  };
  // Create new data entry
  const createData = async () => {
    try {
      const response = await fetch("http://localhost:3002", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, gender }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  // Delete data entry
  // Update the handleDelete function to send a DELETE request
  const handleDelete = async (name) => {
    try {
      const response = await fetch(`http://localhost:3002/${name}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  // const handleEdit = (id, name, age, gender) => {
  //   // Populate the edited values with existing data
  //   setEditedName(name);
  //   setEditedAge(age);
  //   setEditedGender(gender);

  //   // Now you can display the edit form and allow the user to modify the data
  // };
  const submitEdit = async () => {
    try {
      const response = await fetch(`http://localhost:3002/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editedName,
          age: editedAge,
          gender: editedGender,
        }),
      });
      // Handle response and update data if needed
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };
  

  // Fetch initial data on component mount

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createData(); // Create new data
  };

  return (
    <div>
      {/* <Hero> */}
      <div className="flex justify-center items-center bg-gray-500 ">
        <div className="w-[1000px] h-[1560px] border border-black bg-gray-300 flex flex-col items-center justify-evenly ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col  w-[850px] h-[200px] shadow-xl border border-black gap-[20px] p-[30px] rounded-md items-center">
              <h1 className="text-2xl">FORM</h1>
              <div className="gap-[30px] flex">
                <input
                  className="border rounded-md border-black p-2"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  className="border rounded-md border-black p-2"
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
                <input
                  className="border rounded-md border-black p-2"
                  type="text"
                  placeholder="Enter your gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-[80px] bg-blue-400 text-white h-[30px] border rounded-md hover:scale-95 hover:duration-500 hover:blue-500 hover:text-black duration-500"
              >
                SUBMIT
              </button>
            </div>
          </form>

          <div className="w-[850px] h-[1000px] border border-black  gap-[10px] rounded-md shadow-xl ">
            <div className="flex flex-col gap-[15px]">
              {/* user information */}
              <div className="gap-[10px] flex justify-center items-center  flex-col">
                <div className="flex w-[800px] h-[50px] border-4 border-white bg-blue-400 shadow-xl rounded-lg justify-center items-center ">
                  <p className="border-4 rounded-md border-white p-2 text-white">
                    USER'S INFORMATION
                  </p>
                </div>
                <div className=" flex w-[796px] h-[100px]   bg-blue-400 border-4 border-white rounded-lg shadow-xl justify-center items-center">
                  <div className="items-center flex justify-center  gap-[12px] text-white ">
                    <p className="items-center flex justify-center w-[100px] h-[80px]  border-4 border-white bg-red-300 text-2xl font-bold">
                      №
                    </p>
                    <p className="items-center flex justify-center w-[220px] h-[80px] border-4 border-white bg-red-300 text-2xl font-bold">
                      NAME
                    </p>
                    <p className="  items-center flex justify-center w-[220px] h-[80px] border-4 border-white bg-red-300 text-2xl font-bold">
                      AGE
                    </p>
                    <p className="w-[220px] h-[80px] items-center flex justify-center border-4 border-white bg-red-300 text-2xl font-bold">
                      GENDER
                    </p>
                  </div>
                </div>
              </div>
              {/* data avj bgaa heseg */}

              <div className="flex items-center justify-center ">
                <div className="container w-[810px] h-[850px] border-white  overflow-x-scroll border-4 ">
                  {data.map((element) => (
                    <div key={element.id} className="flex flex-col ">
                      <div className=" flex w-[800px] h-[150px]   bg-blue-400 border-2  border-black flex-col  gap-[20px] rounded-2xl shadow-xl justify-center items-center">
                        <div className="items-center flex justify-center  gap-[12px] text-white p-2">
                          <p className="items-center flex justify-center w-[100px] h-[50px]  border-2 bg-red-300">
                            №
                          </p>
                          <p className="items-center flex justify-center w-[220px] h-[50px]  border-2 bg-red-300">
                            {element.name}
                          </p>
                          <p className="  items-center flex justify-center w-[220px] h-[50px]  border-2 bg-red-300">
                            {element.age}
                          </p>
                          <p className="w-[220px] h-[50px] items-center flex justify-center border-2 bg-red-300">
                            {element.gender}
                          </p>
                        </div>
                        <div className="flex gap-[50px]">
                          <button
                            className="text-center w-[130px] shadow-xl text-white rounded-md hover:bg-slate-200 hover:duration-500 hover:text-black h-[30px] border-2"
                            onClick={() => handleDelete(element.id)}
                          >
                            DELETE
                          </button>

                          <button className="text-center w-[130px] text-white shadow-xl rounded-md hover:bg-slate-200  hover:duration-500 hover:text-black h-[30px] border-2 "
                                    onClick={() => handleEdit(element.id)}>
                            EDIT
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Hero> */}
    </div>
  );
}
