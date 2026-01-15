// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import api from "../Config/Api"

// const Contact1 = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobileNumber: "",
//    message: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleClearForm = () => {
//     setFormData({
//       fullName: "",
//       email: "",
//       mobileNumber: "",
//      message: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const res = await api.post("/public/new-contact", formData);
//       toast.success(res.data.message);
//       handleClearForm();
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message || "Unknown Error" );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-linear-to-br from-(--color-background) to-indigo-100 py-6 px-4 ">
//         <div className="max-w-xl mx-auto">
//           {/* Form Container */}
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden mt-10">
//             <form
//               onSubmit={handleSubmit}
//               onReset={handleClearForm}
//               className="p-8"
//             >
//               {/* Header */}
//               <div className="text-center mb-8">
//                 <h1 className="text-4xl font-bold text-gray-900 mb-2">
//                   Post Your Query
//                 </h1>
//               </div>
//               {/* Personal Information */}
//               <div className="mb-10">
//                 <div className="space-y-4">
//                   <div>
//                     <input
//                       type="text"
//                       name="fullName"
//                       placeholder="Enter Your Full Name"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       disabled={isLoading}
//                       required
//                       className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
//                     />
//                   </div>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter Your Email Address"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     required
//                     className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
//                   />
//                   <input
//                     type="tel"
//                     name="mobileNumber"
//                     placeholder="Enter Your Mobile Number"
//                     maxLength="10"
//                     value={formData.mobileNumber}
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     required
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
//                   />
//                   <input
//                     type="message"
//                     name="message"
//                     value={formData.message}
//                     placeholder="Enter Your Create Password"
//                     onChange={handleChange}
//                     disabled={isLoading}
//                     required
//                     className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-(--color-text) transition disabled:cursor-not-allowed"
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
//                 <button
//                   type="reset"
//                   disabled={isLoading}
//                   className="flex-1 bg-(--color-background)  text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-(--color-background) transition duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:bg-(--color-background)"
//                 >
//                   Clear Form
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="flex-1 bg-linear-to-r bg-(--color secondary) font-bold py-4 px-6 rounded-lg bg-(--color-secondary) hover:-text-(--color-text)  transition duration-300 transform hover:scale-105 shadow-lg disabled:scale-100 disabled:bg-(--color secondary) disabled:cursor-not-allowed "
//                 >
//                   {isLoading ? "Submitting" : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact1;
