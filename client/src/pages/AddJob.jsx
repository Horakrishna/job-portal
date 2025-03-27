import Quill from "quill";
import React, { useEffect, useRef, useState } from "react";
import { JobCategories, JobLocations } from "../assets/assets";
const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Dhaka");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  // Editor ref
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // initiate Quill
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">
      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input
          className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded outline-none"
          type="text"
          placeholder="Type Here"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef}></div>
      </div>
      {/* Drop down items */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-6">
        <div>
          <p className="mb-2">Job Category</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Location</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="mb-2">Job Level</p>
          <select
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>
      <div className="">
        <p className="mb-2">Job Salary</p>
        <input
          className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
          onChange={(e) => setSalary(e.target.value)}
          type="Number"
          placeholder="25000"
          min={0}
        />
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white rounded">
        Add
      </button>
    </form>
  );
};

export default AddJob;
