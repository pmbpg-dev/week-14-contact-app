import { array, boolean, object, string } from "yup";

const phoneRegex = /^(\+98|0)?9\d{9}$/;

export const contactSchema = object().shape({
  name: string().trim().min(3).required("Required"),
  phone: string()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Required"),
  email: string().email("Please enter a valid email").required("Required"),
  job: string().required("Required"),
  gender: string().trim().required("Required"),
  fav: boolean(),
});

export const groupSchema = object().shape({
  name: string().trim().min(3).required("Required"),
  members: array().min(1, "Please select at least one contact"),
});
