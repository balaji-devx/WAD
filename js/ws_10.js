
function setValidationResult(inputElement, errorElementId, isValid, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    
    
    inputElement.classList.remove('invalid', 'valid');
    
    if (isValid) {
        
        errorElement.textContent = '✔';
        errorElement.className = 'success-message';
        inputElement.classList.add('valid');
        return true;
    } else {
        
        errorElement.textContent = errorMessage;
        errorElement.className = 'error-message';
        inputElement.classList.add('invalid');
        return false;
    }
}


let isFormValid = false;



function validateName() {
    const input = document.getElementById('name');
    const value = input.value.trim();
    
    const regex = /^[a-zA-Z\s]+$/;

    const isValid = value.length > 0 && regex.test(value);
    return setValidationResult(input, 'nameError', isValid, 
        'Name must contain only alphabets and cannot be empty.');
}

function validateEmail() {
    const input = document.getElementById('email');
    const value = input.value.trim();
    
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|in)$/;

    const isValid = regex.test(value);
    return setValidationResult(input, 'emailError', isValid, 
        'Must be a valid email ending with .com, .edu, or .in.');
}

function validatePassword() {
    const input = document.getElementById('password');
    const value = input.value;
    
    const lengthValid = value.length >= 6;
    const numberValid = /[0-9]/.test(value);
    
    const isValid = lengthValid && numberValid;
    return setValidationResult(input, 'passwordError', isValid, 
        'Password must be at least 6 characters and contain one number.');
}

function validateMobile() {
    const input = document.getElementById('mobile');
    const value = input.value.trim();
    
    const regex = /^[0-9]{10}$/;

    const isValid = regex.test(value);
    return setValidationResult(input, 'mobileError', isValid, 
        'Mobile number must be exactly 10 digits.');
}

function validateDob() {
    const input = document.getElementById('dob');
    const value = input.value;
    
    
    const isValid = value !== '';
    return setValidationResult(input, 'dobError', isValid, 
        'Date of Birth must be selected.');
}


function validateRating() {
    const ratingGroup = document.getElementById('ratingGroup');
    const errorElement = document.getElementById('ratingError');
    const ratingInputs = ratingGroup.querySelectorAll('input[name="rating"]');
    
    let isSelected = false;
    ratingInputs.forEach(input => {
        if (input.checked) {
            isSelected = true;
        }
    });

    
    if (isSelected) {
        errorElement.textContent = '✔';
        errorElement.className = 'success-message';
        return true;
    } else {
        errorElement.textContent = 'Please select a feedback rating.';
        errorElement.className = 'error-message';
        return false;
    }
}

/
function validateForm() {
    
    const nameValid = validateName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const mobileValid = validateMobile();
    const dobValid = validateDob();
    const ratingValid = validateRating();
    
    
    
    isFormValid = nameValid && emailValid && passwordValid && mobileValid && dobValid && ratingValid;

    if (!isFormValid) {
        
        console.error("Form validation failed. Please check the fields marked in red.");
    }
    
    
    return isFormValid;
}


function displayData() {
    const form = document.getElementById('userForm');
    
    
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const mobile = form.mobile.value;
    const dob = form.dob.value;
    
    
    const ratingElement = form.querySelector('input[name="rating"]:checked');
    const rating = ratingElement ? ratingElement.value : 'Not Rated';

    
    const selectedInterests = [];
    form.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        selectedInterests.push(checkbox.value);
    });
    const interestsString = selectedInterests.length > 0 ? selectedInterests.join(', ') : 'None selected';
    
    
    const alertMessage = 
        "--- Form Data ---\n" +
        `Name: ${name}\n` +
        `Email ID: ${email}\n` +
        `Password: ${password}\n` +
        `Mobile Number: ${mobile}\n` +
        `Date of Birth: ${dob}\n` +
        `Rating: ${rating}\n` +
        `Interests: ${interestsString}`;

   
    window.alert(alertMessage);
}


function resetFormState() {
    const errors = document.querySelectorAll('.error-message, .success-message');
    errors.forEach(el => {
        el.textContent = '';
        el.className = 'error-message'; 
    });

    const inputs = document.querySelectorAll('input.invalid, input.valid');
    inputs.forEach(el => {
        el.classList.remove('invalid', 'valid');
    });

    isFormValid = false;
    console.log("Form and validation state reset.");
}


document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('ratingGroup').addEventListener('change', validateRating);
    
});
