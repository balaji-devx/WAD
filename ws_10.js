
        // Global state to track if all fields are valid
        let validationState = {
            name: false,
            email: false,
            password: false,
            mobile: false,
            dob: false,
            rating: false,
            interests: false
        };
        
        // --- Utility Functions ---

        /** Sets error message and validation visual state */
        function setError(fieldId, message) {
            const input = document.getElementById(fieldId);
            const errorSpan = document.getElementById(fieldId + 'Error');
            const successSpan = document.getElementById(fieldId + 'Success');

            if (input) {
                input.classList.remove('valid-input');
            }
            if (errorSpan) {
                errorSpan.textContent = message;
            }
            if (successSpan) {
                successSpan.textContent = '';
            }
            validationState[fieldId] = false;
        }

        /** Sets success visual state */
        function setSuccess(fieldId) {
            const input = document.getElementById(fieldId);
            const errorSpan = document.getElementById(fieldId + 'Error');
            const successSpan = document.getElementById(fieldId + 'Success');

            if (input) {
                input.classList.add('valid-input');
            }
            if (errorSpan) {
                errorSpan.textContent = '';
            }
            if (successSpan) {
                successSpan.textContent = '✔';
            }
            validationState[fieldId] = true;
        }

        /** Handles custom modal/alert display */
        function showModal(dataText) {
            document.getElementById('modalData').textContent = dataText;
            document.getElementById('customAlertModal').style.display = 'block';
        }

        /** Closes custom modal/alert display */
        function closeModal() {
            document.getElementById('customAlertModal').style.display = 'none';
        }

        // --- Validation Logic ---

        function validateName() {
            const nameInput = document.getElementById('name');
            const name = nameInput.value.trim();
            const nameRegex = /^[A-Za-z\s]+$/;

            if (name === '') {
                setError('name', 'Name cannot be empty.');
            } else if (!nameRegex.test(name)) {
                setError('name', 'Name can only contain alphabets and spaces.');
            } else {
                setSuccess('name');
            }
        }

        function validateEmail() {
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            // Valid email ending with .com, .edu, or .in
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu|in)$/i;

            if (email === '') {
                setError('email', 'Email ID cannot be empty.');
            } else if (!emailRegex.test(email)) {
                setError('email', 'Must be a valid email ending with .com, .edu, or .in.');
            } else {
                setSuccess('email');
            }
        }

        function validatePassword() {
            const passwordInput = document.getElementById('password');
            const password = passwordInput.value;
            // Min 6 characters, must contain at least one number
            const numberRegex = /[0-9]/;

            if (password.length < 6) {
                setError('password', 'Password must be a minimum of 6 characters.');
            } else if (!numberRegex.test(password)) {
                setError('password', 'Password must contain at least one number.');
            } else {
                setSuccess('password');
            }
        }

        function validateMobile() {
            const mobileInput = document.getElementById('mobile');
            const mobile = mobileInput.value.trim();
            // Exactly 10 digits
            const mobileRegex = /^\d{10}$/;

            if (mobile === '') {
                setError('mobile', 'Mobile number cannot be empty.');
            } else if (!mobileRegex.test(mobile)) {
                setError('mobile', 'Mobile number must be exactly 10 digits.');
            } else {
                setSuccess('mobile');
            }
        }

        function validateDob() {
            const dobInput = document.getElementById('dob');
            const dob = dobInput.value;

            if (dob === '') {
                setError('dob', 'Date of Birth must be selected.');
            } else {
                // Optional: Check if the date is in the past, but the requirement is only to be chosen.
                setSuccess('dob');
            }
        }

        function validateRating() {
            const ratingRadios = document.querySelectorAll('input[name="rating"]:checked');
            
            if (ratingRadios.length === 0) {
                setError('rating', 'Please select a star rating (1 to 5).');
                // Since rating is a group, we hide success tick
                document.getElementById('ratingError').nextElementSibling.textContent = '';
            } else {
                validationState.rating = true;
                document.getElementById('ratingError').textContent = '';
                // Since rating is a group, we show a success indicator on the group label if needed, but here we just clear the error.
            }
            return validationState.rating;
        }

        function validateInterests() {
            const interestsCheckboxes = document.querySelectorAll('input[name="interest"]:checked');
            
            if (interestsCheckboxes.length === 0) {
                setError('interests', 'Please select at least one interest.');
                // Since interests is a group, we hide success tick
                document.getElementById('interestsError').nextElementSibling.textContent = '';
            } else {
                validationState.interests = true;
                document.getElementById('interestsError').textContent = '';
                // Since interests is a group, we show a success indicator on the group label if needed, but here we just clear the error.
            }
            return validationState.interests;
        }
        
        /** Runs all validations manually (used on submit) */
        function validateAllFields() {
            validateName();
            validateEmail();
            validatePassword();
            validateMobile();
            validateDob();
            validateRating();
            validateInterests();
            
            return Object.values(validationState).every(isValid => isValid);
        }

        // --- Form Handlers ---

        /** Handles the 'Display Details' button click */
        function displayFormData() {
            const formData = collectFormData();
            const dataString = 
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Password: ${formData.password.replace(/./g, '*')}\n` + // Mask password
                `Mobile: ${formData.mobile}\n` +
                `Date of Birth: ${formData.dob}\n` +
                `Rating: ${formData.rating} ⭐\n` +
                `Interests: ${formData.interests.join(', ')}`;
            
            showModal(dataString);
        }
        
        /** Collects all form data into an object */
        function collectFormData() {
            const form = document.getElementById('userForm');
            const formData = new FormData(form);
            const data = {};

            // Collect simple fields
            data.name = formData.get('name') || 'N/A';
            data.email = formData.get('email') || 'N/A';
            data.password = formData.get('password') || 'N/A';
            data.mobile = formData.get('mobile') || 'N/A';
            data.dob = formData.get('dob') || 'N/A';
            data.rating = formData.get('rating') || 'N/A';
            
            // Collect selected interests
            const interests = [];
            document.querySelectorAll('input[name="interest"]:checked').forEach(cb => {
                interests.push(cb.value);
            });
            data.interests = interests;
            
            return data;
        }

        /** Handles the main form submission logic */
        function handleFormSubmission(event) {
            event.preventDefault(); 

            if (validateAllFields()) {
                const formData = collectFormData();
                
                // Store required data in sessionStorage to simulate passing data to success.html
                sessionStorage.setItem('submittedData', JSON.stringify(formData));
                
                // Simulate redirection to success.html by changing the URL/history state
                window.history.pushState({}, '', '?status=success');
                
                // Render the success view
                renderPageBasedOnUrl();
                
                // Show the required alert box with summary data after successful submission
                const alertMessage = 
                    `Form Submitted Successfully!\n\n` +
                    `Name: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Rating: ${formData.rating} ⭐\n` +
                    `Selected Interests: ${formData.interests.join(', ')}`;
                    
                showModal(alertMessage);
            } else {
                // Focus on the first invalid field
                for (const fieldId in validationState) {
                    if (validationState[fieldId] === false) {
                        const inputElement = document.getElementById(fieldId);
                        if (inputElement) {
                            inputElement.focus();
                            break;
                        }
                    }
                }
            }
            return false;
        }

        /** Clears all validation visuals and state on reset */
        function resetFormState() {
            // Reset validation state object
            for (const key in validationState) {
                validationState[key] = false;
            }
            
            // Clear visual feedback
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            document.querySelectorAll('.success-tick').forEach(el => el.textContent = '');
            document.querySelectorAll('input').forEach(el => el.classList.remove('valid-input'));
            
            // For groups, run validation to clear errors if they rely on state checks
            validateRating();
            validateInterests();
        }

        // --- Initialization and Page Rendering ---

        /** Generates the 1-5 star radio buttons dynamically */
        function generateStarRatings() {
            const group = document.getElementById('ratingGroup');
            if (!group) return;

            for (let i = 1; i <= 5; i++) {
                const label = document.createElement('label');
                label.classList.add('rating-label');
                label.innerHTML = `
                    <input type="radio" name="rating" value="${i}">
                    <span class="star" aria-label="${i} star">${'⭐'.repeat(i)}</span>
                `;
                group.appendChild(label);
            }
        }
        
        /** Renders either the form or the success page based on URL status */
        function renderPageBasedOnUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const isSuccess = urlParams.get('status') === 'success';

            const formView = document.getElementById('formView');
            const successView = document.getElementById('successView');

            if (isSuccess) {
                // Render success view
                formView.style.display = 'none';
                successView.style.display = 'block';
                
                // The prompt required the alert on success.html, which is handled in handleFormSubmission
                
            } else {
                // Render form view
                formView.style.display = 'block';
                successView.style.display = 'none';
            }
        }
        
        // Add event listener to handle back/forward button navigation
        window.addEventListener('popstate', renderPageBasedOnUrl);

        // Run on page load
        document.addEventListener('DOMContentLoaded', () => {
            generateStarRatings();
            renderPageBasedOnUrl();
        });
