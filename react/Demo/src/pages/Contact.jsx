import React, { useState } from "react";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClearForm = () => {
    setFullName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/jokes/random"
      );
      setTimeout(() => {
        const data = {
          fullName,
          email,
          message,
        };
        console.log(data);
      }, 5000);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }

    // alert("Please first Fill the data");
    handleClearForm();
  };

  return (
    <>
     <h5 className="text-center my-3">This is Contact</h5>
      <div className="d-flex justify-content-center p-3">
        <div className=" border rounded border-secondary  p-5 w-50">
          <form onReset={handleClearForm} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" className="w-25">
                Full Name :
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Name"
                className="text-primary border rounded p-2 w-75 "
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="w-25">
                Email :
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter yout Email"
                className="text-primary border rounded p-2 w-75"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="w-25">
                Message :
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your Message"
                className="text-primary border rounded p-2 w-75"
                required
              ></textarea>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="reset"
                className="btn btn-danger border rounded px-3 py-2"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="btn btn-success border rounded px-3 py-2"
              >
                {isLoading ? "Loading" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
