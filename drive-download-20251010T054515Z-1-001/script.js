function validateName() {
  let name = document.getElementById("name");
  let error = document.getElementById("nameError");
  if (name.value.trim().length < 3) {
    error.textContent = "Name must be at least 3 characters.";
    error.className = "error invalid";
    name.focus();
    return false;
  }
  error.textContent = "✔ Name is valid";
  error.className = "error valid";
  return true;
}

function validateEmail() {
  let email = document.getElementById("email");
  let error = document.getElementById("emailError");
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|in)$/;
  if (!pattern.test(email.value.trim())) {
    error.textContent = "Enter a valid email ending with .com, .edu, or .in";
    error.className = "error invalid";
    email.focus();
    return false;
  }
  error.textContent = "✔ Email is valid";
  error.className = "error valid";
  return true;
}

function validateMobile() {
  let mobile = document.getElementById("mobile");
  let error = document.getElementById("mobileError");
  let pattern = /^[0-9]{10}$/;
  if (!pattern.test(mobile.value.trim())) {
    error.textContent = "Enter a valid 10-digit mobile number.";
    error.className = "error invalid";
    mobile.focus();
    return false;
  }
  error.textContent = "✔ Mobile number is valid";
  error.className = "error valid";
  return true;
}

function validateDob() {
  let dob = document.getElementById("dob");
  let error = document.getElementById("dobError");
  if (!dob.value) {
    error.textContent = "Please select your Date of Birth.";
    error.className = "error invalid";
    dob.focus();
    return false;
  }
  error.textContent = "✔ Date of Birth selected";
  error.className = "error valid";
  return true;
}

function validateCity() {
  let city = document.getElementById("city");
  let error = document.getElementById("cityError");
  if (city.value === "") {
    error.textContent = "Please select a city.";
    error.className = "error invalid";
    city.focus();
    return false;
  }
  error.textContent = "✔ City selected";
  error.className = "error valid";
  return true;
}

// Final form validation before submission
document.getElementById("userForm").addEventListener("submit", function(e) {
  if (!validateName() || !validateEmail() || !validateMobile() || !validateDob() || !validateCity()) {
    e.preventDefault();
    alert("Please correct errors before submitting.");
  } else {
    alert("Form Submitted Successfully!");
  }
});
