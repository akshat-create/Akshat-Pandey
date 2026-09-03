const form = document.querySelector("#studentForm");

const studentName = document.querySelector("#studentName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const dob = document.querySelector("#dob");
const course = document.querySelector("#course");
const about = document.querySelector("#about");
const photo = document.querySelector("#photo");

const studentContainer = document.querySelector("#studentContainer");
const studentCount = document.querySelector("#studentCount");

const genderInputs = document.querySelectorAll(
    'input[name="gender"]'
);

const skillInputs = document.querySelectorAll(
    'input[name="skills"]'
);

const students = [];
let nextStudentId = 1;


// =========================
// Clear Errors on Page Load
// =========================

document.querySelectorAll(".error").forEach(function (error) {
    error.textContent = "";
});


// =========================
// Form Submit
// =========================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;


    // =========================
    // Student Name Validation
    // =========================

    const name = studentName.value.trim();
    const nameRegex = /^[A-Za-z ]+$/;

    if (name === "") {
        document.querySelector("#studentNameError").textContent =
            "Student name is required.";
        isValid = false;
    }
    else if (name.length < 3) {
        document.querySelector("#studentNameError").textContent =
            "Student name must be at least 3 characters.";
        isValid = false;
    }
    else if (!nameRegex.test(name)) {
        document.querySelector("#studentNameError").textContent =
            "Student name should contain only letters and spaces.";
        isValid = false;
    }
    else {
        document.querySelector("#studentNameError").textContent = "";
    }


    // =========================
    // Email Validation
    // =========================

    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        document.querySelector("#emailError").textContent =
            "Email is required.";
        isValid = false;
    }
    else if (!emailRegex.test(emailValue)) {
        document.querySelector("#emailError").textContent =
            "Please enter a valid email address.";
        isValid = false;
    }
    else {
        document.querySelector("#emailError").textContent = "";
    }


    // =========================
    // Phone Validation
    // =========================

    const phoneValue = phone.value.trim();
    const phoneRegex = /^\d{10}$/;

    if (phoneValue === "") {
        document.querySelector("#phoneError").textContent =
            "Phone number is required.";
        isValid = false;
    }
    else if (!phoneRegex.test(phoneValue)) {
        document.querySelector("#phoneError").textContent =
            "Phone number must contain exactly 10 digits.";
        isValid = false;
    }
    else {
        document.querySelector("#phoneError").textContent = "";
    }


    // =========================
    // Date of Birth Validation
    // =========================

    const dobValue = dob.value;

    if (dobValue === "") {
        document.querySelector("#dobError").textContent =
            "Date of birth is required.";
        isValid = false;
    }
    else if (new Date(dobValue) > new Date()) {
        document.querySelector("#dobError").textContent =
            "Date of birth cannot be a future date.";
        isValid = false;
    }
    else {
        document.querySelector("#dobError").textContent = "";
    }


    // =========================
    // Gender Validation
    // =========================

    const selectedGender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!selectedGender) {
        document.querySelector("#genderError").textContent =
            "Please select your gender.";
        isValid = false;
    }
    else {
        document.querySelector("#genderError").textContent = "";
    }


    // =========================
    // Course Validation
    // =========================

    if (course.value === "") {
        document.querySelector("#courseError").textContent =
            "Please select a course.";
        isValid = false;
    }
    else {
        document.querySelector("#courseError").textContent = "";
    }


    // =========================
    // Skills Validation
    // =========================

    const selectedSkills = document.querySelectorAll(
        'input[name="skills"]:checked'
    );

    if (selectedSkills.length === 0) {
        document.querySelector("#skillsError").textContent =
            "Please select at least one skill.";
        isValid = false;
    }
    else {
        document.querySelector("#skillsError").textContent = "";
    }


    // =========================
    // About Student Validation
    // =========================

    const aboutValue = about.value.trim();

    if (aboutValue === "") {
        document.querySelector("#aboutError").textContent =
            "About student is required.";
        isValid = false;
    }
    else {
        document.querySelector("#aboutError").textContent = "";
    }


    // =========================
    // Profile Photo Validation
    // =========================

    if (photo.files.length === 0) {
        document.querySelector("#photoError").textContent =
            "Profile photo is required.";
        isValid = false;
    }
    else {
        document.querySelector("#photoError").textContent = "";
    }


    // =========================
    // Stop if Invalid
    // =========================

    if (!isValid) {
        return;
    }


    // =========================
    // Get Selected Skills
    // =========================

    const skills = Array.from(selectedSkills).map(function (skill) {
        return skill.value;
    });


    // =========================
    // Create Student Object
    // =========================

    const student = {
        id: nextStudentId,
        name: name,
        email: emailValue,
        phone: phoneValue,
        dob: dobValue,
        gender: selectedGender.value,
        course: course.value,
        skills: skills,
        about: aboutValue,
        photo: URL.createObjectURL(photo.files[0])
    };


    // =========================
    // Add Student to Array
    // =========================

    students.push(student);
    nextStudentId += 1;


    // =========================
    // Create Student Card
    // =========================

    createStudentCard(student);


    // =========================
    // Update Student Count
    // =========================

    updateStudentCount();


    // =========================
    // Reset Form
    // =========================

    form.reset();

    document.querySelectorAll(".error").forEach(function (error) {
        error.textContent = "";
    });

});


// =========================
// Create Student Card
// =========================

function createStudentCard(student) {

    const card = document.createElement("div");

    card.classList.add("student-card");

    card.dataset.id = student.id;


    // Photo
    const image = document.createElement("img");

    image.src = student.photo;
    image.alt = student.name + " profile photo";


    // Name
    const nameHeading = document.createElement("h2");

    nameHeading.textContent = student.name;


    // Email
    const emailText = document.createElement("p");

    emailText.textContent = "Email: " + student.email;


    // Phone
    const phoneText = document.createElement("p");

    phoneText.textContent = "Phone: " + student.phone;


    // DOB
    const dobText = document.createElement("p");

    dobText.textContent = "DOB: " + student.dob;


    // Gender
    const genderText = document.createElement("p");

    genderText.textContent = "Gender: " + student.gender;


    // Course
    const courseText = document.createElement("p");

    courseText.textContent = "Course: " + student.course;


    // Skills
    const skillsText = document.createElement("p");

    skillsText.textContent =
        "Skills: " + student.skills.join(", ");


    // About
    const aboutText = document.createElement("p");

    aboutText.textContent = "About: " + student.about;


    // Delete Button
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";


    // Append Everything
    card.append(
        image,
        nameHeading,
        emailText,
        phoneText,
        dobText,
        genderText,
        courseText,
        skillsText,
        aboutText,
        deleteButton
    );


    studentContainer.appendChild(card);
}


// =========================
// Update Student Count
// =========================

function updateStudentCount() {

    studentCount.textContent =
        "Total Students: " + students.length;
}


// =========================
// Delete Student - Event Delegation
// =========================

studentContainer.addEventListener("click", function (event) {

    if (!event.target.classList.contains("delete-btn")) {
        return;
    }


    // Find the selected student card
    const card = event.target.closest(".student-card");

    if (!card) {
        return;
    }


    // Get student ID
    const studentId = Number(card.dataset.id);


    // Remove student from array
    const studentIndex = students.findIndex(function (student) {
        return student.id === studentId;
    });

    if (studentIndex !== -1) {
        URL.revokeObjectURL(students[studentIndex].photo);
        students.splice(studentIndex, 1);
    }


    // Remove only selected card
    card.remove();


    // Update count
    updateStudentCount();
});
