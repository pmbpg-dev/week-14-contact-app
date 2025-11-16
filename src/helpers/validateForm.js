const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
const phoneRegex = /^(\+98|0)?9\d{9}$/;

//----------------------------------------------
function validateForm(name, value) {
  if (name === "gender") return;
  if (name === "fav") return;
  // -----validate name & other input ------------
  if (!value.trim()) return `${name} is required`;
  // -----validate email-------------------
  if (name === "email" && !emailRegex.test(value)) return "Invalid email";
  // --------validate phone number------------
  if (name === "phone" && !phoneRegex.test(value))
    return "Invalid phone number";
  return "";
}

export default validateForm;
