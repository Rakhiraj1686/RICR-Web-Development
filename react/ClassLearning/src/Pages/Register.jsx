import React, { useState } from "react";
// import toast from "react-hot-toast";

const Register = () => {
    // const [formData,setFormData] = useState();




    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     isLoading(true);
    //     try{
    //         console.log(formData);
    //         toast.success("Registation Successfull")
    //         handle
    //     }
    // }

  return (
    <>
      <div className="flex justify-center p-2 text-blue-900 mt-6">
        <h1 className="text-4xl font-bold ">Registation Form</h1>
      </div>
      <div className="p-10">
        <div>
          <div className="border border-blue-600 rounded shadow mx-3 pt-5 mt-4 pb-2 ">
            <span className="px-2 text-blue-500 ">Personal Information</span>z
            <div className="mx-2 flex gap-4 pt-3 ">
              <label htmlFor="FullName" className="w-60 gap-3">
                FullName :
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className="border border-gray-300 rounded shadow-2xs w-7xl focus:ring focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mx-2 flex gap-4 pt-3 ">
              <label htmlFor="email" className="gap-3 w-60">
                Email :
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-gray-300 rounded shadow-2xs w-7xl"
              />
            </div>
            <div className="mx-2 flex gap-4 pt-3">
              <label htmlFor="mobileNumber" className="gap-3 w-60 ">
                Mobile Number :
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                className="border border-gray-300 rounded shadow-2xs w-7xl"
              />
            </div>
            <div className="mx-2 flex gap-4 pt-3 ">
              <label htmlFor="D.O.B" className="gap-3 w-60">
                D.O.B :
              </label>
              <input
                type="date"
                name="D.O.B"
                id="D.O.B"
                className="border border-gray-300 rounded shadow-2xs w-7xl"
              />
            </div>
          </div>
        </div>

        {/* Academic Details */}

        <div className="border border-blue-600 rounded shadow p-3 pt-5 mx-3 mt-4">
          <span className="px-2 text-blue-500">Academic Details</span>

          <div className="mx-2 flex gap-4 pt-3 ">
            <label htmlFor="qualification" className="gap-3 w-60">
              Qualification :
            </label>
            <select
              name="qualification"
              id="qualification"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            >
              <option value="">--Select Qualification</option>
              <option value="10">Secondary Schooling</option>
              <option value="12">Senior Secondary Schooling</option>
              <option value="UG">Graduation</option>
              <option value="PG">Post Graduation</option>
              <option value="PHD">P.hd</option>
            </select>
          </div>
          <div className="mx-2 flex gap-4 pt-3 ">
            <label htmlFor="score" className="gap-3 w-60">
              Percentage / Grade :
            </label>
            <input
              type="text"
              name="score"
              id="score"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
        </div>

        {/* course Information */}
        <div className="border border-blue-600 rounded shadow p-3 mx-3 pt-5 mt-3">
          <span className="px-2 text-blue-500">Course Information</span>

          <div className="mx-2 flex gap-4 pt-3 ">
            <label htmlFor="course" className="gap-3 w-60">
              Available Courses :
            </label>
            <select
              name="course"
              id="course"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            >
              <option value="">--Select Course</option>
              <option value="FSD">Full Stack Development</option>
              <option value="DS">Data Science</option>
              <option value="DA">Data Analytics</option>
              <option value="J-DSA">Java DSA</option>
              <option value="P-DSA">Python DSA</option>
            </select>
          </div>
          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="batch" className="gap-3 w-60">
              Perfered Batch :
            </label>
            <div className="flex gap-3">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="morning"
                  id="morning"
                  value="morning"
                />
                <span>Morning</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="afternoon"
                  id="afternoon"
                  value="afternoon"
                />
                <span>Afternoon</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="evening"
                  id="evening"
                  value="evening"
                />
                <span>Evening</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="weekends"
                  id="weekends"
                  value="weekends"
                />
                <span>Weekends</span>
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="border border-blue-600 rounded mx-3 shadow p-3 pt-5 mt-3">
          <span className="px-2 text-blue-500">Address</span>

          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="address" className="gap-3 w-60 ">
              Residentail Address :
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="city" className="gap-3 w-60">
              City :
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="Pincode" className="gap-3 w-60">
              Pin Code:
            </label>
            <input
              type="tel"
              name="pinCode"
              id="pinCode"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
        </div>

        {/* Graduation Details */}
        <div className="border border-blue-600 rounded mx-3 shadow p-3 pt-5 mt-3">
          <span className="px-2 text-blue-500">Graduation Details</span>

          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="graduationName" className="gap-3 w-60">
              Graduation Name:
            </label>
            <input
              type="text"
              name="graduationName"
              id="graduationName"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="graduationNumber" className="gap-3 w-60">
              Graduation Number:
            </label>
            <input
              type="text"
              name="graduationNumber"
              id="graduationNumber"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="border border-blue-600 rounded mx-3 shadow p-3 pt-5 mt-3">
          <span className="px-2 text-blue-500">Additional Information</span>

          <div className="mx-2 flex  gap-4 pt-3 ">
            <label htmlFor="coachingInfo" className="gap-3 w-60">
              How did you hear about us?:
            </label>
            <select
              name="coachingInfo"
              id="coachingInfo"
              className="border border-gray-300 rounded shadow-2xs w-7xl"
            >
              <option value="">--Select</option>
              <option value="Friend">Friends</option>
              <option value="ads">Online Ads</option>
              <option value="newspaper">Newspaper</option>
              <option value="socialMedia">Social Media</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Button */}

        <div className="text-center p-3 mt-2">
          <button
            className="border px-5 pt-2 py-2 rounded-xl bg-blue-400 text-white"
            type="submit"
          >
            Sumbit
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
