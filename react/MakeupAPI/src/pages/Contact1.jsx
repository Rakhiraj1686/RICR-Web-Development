import React, { useState } from "react";

const Contact1 = () => {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
    religion: "",
    gender: "",
    skill: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let temp = contactData.skill;
      if (checked) {
        temp.push(value);
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      } else {
        temp = Object.values(temp); //Convert to Array
        temp = temp.filter((word) => word !== value); //Remove the Undersired Value
        setContactData((previousData) => ({ ...previousData, [name]: temp }));
      }
    } else {
      setContactData((previousData) => ({ ...previousData, [name]: value }));
    }
  };

  const handleClearForm = () => {
    setContactData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      subject: "",
      message: "",
      religion: "",
      gender: "",
      skill: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(contactData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
    handleClearForm();
  };

  return (
    <>
      <div className="flex justify-center mt-40">
        <div className="text-center border-3 p-2 rounded-2xl">
          <h1 className="text-4xl font-bold my-1 mb-3">Contact Us</h1>
          <div className="container">
            <form onReset={handleClearForm} onSubmit={handleSubmit}>
              <div className="mb-3 flex">
                <label htmlFor="fullName " className="w-25">Full Name :</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={contactData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="text-primary border rounded-2xl p-1.5 w-120"
                />
              </div>

              <div className="mb-3 flex">
                <label htmlFor="email " className="w-25">Email :</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={contactData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="text-primary border rounded-2xl p-1.5 w-120"
                />
              </div>

              <div className="mb-3 flex">
                <label htmlFor="phone" className="w-25">Phone : </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={contactData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className="text-primary border rounded-2xl p-1.5 w-120"
                />
              </div>

              <div className="mb-3 flex">
                <label htmlFor="city" className="w-25">City : </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={contactData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="text-primary border rounded-2xl p-1.5 w-120"
                />
              </div>

              <div className="mb-3 flex">
                <label htmlFor="subject" className="w-25">Subject : </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={contactData.subject}
                  onChange={handleChange}
                  placeholder="Enter your subject"
                  className="text-primary border rounded-2xl p-1.5 w-120"
                />
              </div>

              <div className="mb-3 flex">
                <label htmlFor="religion" className="w-25">Religion : </label>
                <select
                  name="religion"
                  id="religion"
                  onChange={handleChange}
                  value={contactData.religion}
                  className="border rounded-2xl p-1.5 w-120"
                >
                  <option value="">--Select Religion--</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="christianity">Christianity</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="jainism">Jainism</option>
                  <option value="sikhism">Sikhism</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-3 flex gap-3">
                <label htmlFor="gender" className="w-25">Gender : </label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={contactData.gender === "male"}
                  className=""
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={contactData.gender === "female"}
                />{" "}
                Female
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                  checked={contactData.gender === "other"}
                />{" "}
                Other
              </div>

              <div className="mb-3 flex gap-3">
                <label htmlFor="skill" className="w-25">Skill known : </label>
                <input
                  type="checkbox"
                  name="skill"
                  value="html"
                  onChange={handleChange}
                  checked={
                    Object.values(contactData.skill).find(
                      (word) => word === "html"
                    )
                      ? true
                      : false
                  }
                />{" "}
                HTML
                <input
                  type="checkbox"
                  name="skill"
                  value="css"
                  onChange={handleChange}
                  checked={
                    Object.values(contactData.skill).find(
                      (word) => word === "css"
                    )
                      ? true
                      : false
                  }
                />{" "}
                CSS
                <input
                  type="checkbox"
                  name="skill"
                  value="js"
                  onChange={handleChange}
                  checked={
                    Object.values(contactData.skill).find(
                      (word) => word === "js"
                    )
                      ? true
                      : false
                  }
                />{" "}
                JS
                <input
                  type="checkbox"
                  name="skill"
                  value="react"
                  onChange={handleChange}
                  checked={Object.values(contactData.skill).includes("react")}
                />{" "}
                React
              </div>

              <div className="mb-3 flex">
                <label htmlFor="message" className="w-25">Message : </label>
                <textarea
                  name="message"
                  id="message"
                  value={contactData.message}
                  onChange={handleChange}
                  placeholder="Enter your Message"
                  className="text-primary border rounded-2xl p-1.5 w-120 "
                ></textarea>
              </div>
              <div className="flex gap-4 justify-center">
                <button type="reset" className="border rounded-2xl px-3 py-2  text-red-800 cursor-pointer hover:bg-[#81243d] hover:text-white hover:rounded ">
                  Clear Form
                </button>
                <button type="submit" className="border rounded-2xl px-3 py-2  text-green-800 cursor-pointer hover:bg-[#06662d] hover:text-white hover:rounded ">
                  {isLoading ? "Loading" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact1;
