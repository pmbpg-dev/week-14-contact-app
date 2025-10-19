function validateForm(name, value) {
  // -----validate name & other input ------------
  if (!value.trim()) return `${name} is required`;
  // -----validate email-------------------
  if (name === "email" && !value.includes("@")) return "Invalid email";
  // --------validate phone number------------
  if (name === "phone" && isNaN(value)) return "Phone must be a number";
  return "";
}

export default validateForm;
