import Contact from "../models/contactModel.js";

export const NewContact = async (req, res, next) => {
  try {
    const { fullName, email, subject, query } = req.body;

    if (!fullName || !email || !subject || !query) {
      const error = new Error("All Field Required");
      error.statusCode = 400;
      return;
    }

    //save data to database
    const newContact = await Contact.create({
      fullName,
      email,
      subject,
      query,
    });

    //send response to frontend
    console.log(newContact);
    res.status(201).json({ message: "Thanks for Contacting us. We will Get Back to you in 24 Hours" });
  } catch (error) {
    next(error);
  }
};
