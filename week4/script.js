// ==========================================
// STUDENT MANAGEMENT DASHBOARD
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const addStudentBtn =
    document.getElementById("addStudentBtn");

const studentModal =
    document.getElementById("studentModal");

const closeModalBtn =
    document.getElementById("closeModalBtn");

const cancelBtn =
    document.getElementById("cancelBtn");

const studentForm =
    document.getElementById("studentForm");

const modalTitle =
    document.getElementById("modalTitle");

const rollNumber =
    document.getElementById("rollNumber");

const studentName =
    document.getElementById("studentName");

const studentEmail =
    document.getElementById("studentEmail");

const studentCourse =
    document.getElementById("studentCourse");

const studentYear =
    document.getElementById("studentYear");

const studentGender =
    document.getElementById("studentGender");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchInput =
    document.getElementById("searchInput");

const courseFilter =
    document.getElementById("courseFilter");

const genderFilter =
    document.getElementById("genderFilter");

const clearFiltersBtn =
    document.getElementById("clearFiltersBtn");

const emptyState =
    document.getElementById("emptyState");

const showingText =
    document.getElementById("showingText");

const totalStudents =
    document.getElementById("totalStudents");

const totalCourses =
    document.getElementById("totalCourses");

const femaleStudents =
    document.getElementById("femaleStudents");

const maleStudents =
    document.getElementById("maleStudents");


// ==========================================
// VARIABLES
// ==========================================

let students = [];

let editingStudentId = null;


// ==========================================
// LOAD DATA FROM LOCAL STORAGE
// ==========================================

function loadStudents() {

    const savedStudents =
        localStorage.getItem("students");


    if (savedStudents) {

        students = JSON.parse(savedStudents);

    }


    displayStudents(students);

    updateStatistics();

}


// ==========================================
// SAVE DATA TO LOCAL STORAGE
// ==========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ==========================================
// OPEN MODAL
// ==========================================

function openModal() {

    studentModal.classList.remove("hidden");

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    studentModal.classList.add("hidden");

    studentForm.reset();

    editingStudentId = null;

    modalTitle.textContent =
        "Add Student";

}


// ==========================================
// ADD STUDENT BUTTON
// ==========================================

addStudentBtn.addEventListener(
    "click",
    function() {

        closeModal();

        openModal();

    }
);


// ==========================================
// CLOSE BUTTON
// ==========================================

closeModalBtn.addEventListener(
    "click",
    closeModal
);


cancelBtn.addEventListener(
    "click",
    closeModal
);


// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

studentModal.addEventListener(
    "click",
    function(event) {

        if (event.target === studentModal) {

            closeModal();

        }

    }
);


// ==========================================
// FORM SUBMIT
// ==========================================

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // Get values
        const roll =
            rollNumber.value.trim();

        const name =
            studentName.value.trim();

        const email =
            studentEmail.value.trim();

        const course =
            studentCourse.value;

        const year =
            studentYear.value;

        const gender =
            studentGender.value;


        // ======================================
        // VALIDATION
        // ======================================

        if (
            roll === "" ||
            name === "" ||
            email === "" ||
            course === "" ||
            year === "" ||
            gender === ""
        ) {

            alert(
                "Please fill all fields."
            );

            return;

        }


        // ======================================
        // EDIT STUDENT
        // ======================================

        if (editingStudentId !== null) {

            const studentIndex =
                students.findIndex(
                    function(student) {

                        return student.id ===
                            editingStudentId;

                    }
                );


            if (studentIndex !== -1) {

                students[studentIndex] = {

                    id: editingStudentId,

                    roll: roll,

                    name: name,

                    email: email,

                    course: course,

                    year: year,

                    gender: gender

                };

            }

        }


        // ======================================
        // ADD NEW STUDENT
        // ======================================

        else {

            const newStudent = {

                id: Date.now(),

                roll: roll,

                name: name,

                email: email,

                course: course,

                year: year,

                gender: gender

            };


            students.push(newStudent);

        }


        // Save data
        saveStudents();


        // Update display
        displayStudents(students);

        updateStatistics();


        // Close modal
        closeModal();

    }
);


// ==========================================
// DISPLAY STUDENTS
// ==========================================

function displayStudents(studentList) {

    studentTableBody.innerHTML = "";


    // ======================================
    // EMPTY STATE
    // ======================================

    if (studentList.length === 0) {

        emptyState.classList.remove(
            "hidden"
        );

        showingText.textContent =
            "Showing 0 students";

        return;

    }


    emptyState.classList.add(
        "hidden"
    );


    // ======================================
    // CREATE TABLE ROWS
    // ======================================

    studentList.forEach(
        function(student) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${student.roll}
                </td>

                <td>
                    <strong>
                        ${student.name}
                    </strong>
                </td>

                <td>
                    ${student.email}
                </td>

                <td>

                    <span class="course-badge">
                        ${student.course}
                    </span>

                </td>

                <td>
                    ${student.year}
                </td>

                <td>
                    ${student.gender}
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-btn"
                            onclick="editStudent(${student.id})"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})"
                        >
                            Delete
                        </button>

                    </div>

                </td>

            `;


            studentTableBody.appendChild(row);

        }
    );


    showingText.textContent =
        `Showing ${studentList.length} student${studentList.length !== 1 ? "s" : ""}`;

}


// ==========================================
// EDIT STUDENT
// ==========================================

function editStudent(id) {

    const student =
        students.find(
            function(student) {

                return student.id === id;

            }
        );


    if (!student) {

        return;

    }


    // Fill form
    rollNumber.value =
        student.roll;

    studentName.value =
        student.name;

    studentEmail.value =
        student.email;

    studentCourse.value =
        student.course;

    studentYear.value =
        student.year;

    studentGender.value =
        student.gender;


    // Set editing ID
    editingStudentId =
        student.id;


    // Change modal title
    modalTitle.textContent =
        "Edit Student";


    // Open modal
    openModal();

}


// ==========================================
// DELETE STUDENT
// ==========================================

function deleteStudent(id) {

    const student =
        students.find(
            function(student) {

                return student.id === id;

            }
        );


    if (!student) {

        return;

    }


    const confirmation =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmation) {

        return;

    }


    students =
        students.filter(
            function(student) {

                return student.id !== id;

            }
        );


    // Save changes
    saveStudents();


    // Update display
    displayStudents(students);

    updateStatistics();

}


// ==========================================
// SEARCH
// ==========================================

searchInput.addEventListener(
    "input",
    applyFilters
);


// ==========================================
// COURSE FILTER
// ==========================================

courseFilter.addEventListener(
    "change",
    applyFilters
);


// ==========================================
// GENDER FILTER
// ==========================================

genderFilter.addEventListener(
    "change",
    applyFilters
);


// ==========================================
// APPLY SEARCH + FILTERS
// ==========================================

function applyFilters() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCourse =
        courseFilter.value;


    const selectedGender =
        genderFilter.value;


    const filteredStudents =
        students.filter(
            function(student) {


                // Search condition

                const matchesSearch =

                    student.name
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    student.email
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    student.roll
                        .toLowerCase()
                        .includes(searchTerm);


                // Course condition

                const matchesCourse =

                    selectedCourse === "all"

                    ||

                    student.course ===
                    selectedCourse;


                // Gender condition

                const matchesGender =

                    selectedGender === "all"

                    ||

                    student.gender ===
                    selectedGender;


                return (

                    matchesSearch &&

                    matchesCourse &&

                    matchesGender

                );

            }
        );


    displayStudents(
        filteredStudents
    );

}


// ==========================================
// CLEAR FILTERS
// ==========================================

clearFiltersBtn.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        courseFilter.value = "all";

        genderFilter.value = "all";

        displayStudents(students);

    }
);


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics() {


    // Total students

    totalStudents.textContent =
        students.length;


    // Unique courses

    const courses =
        new Set(
            students.map(
                function(student) {

                    return student.course;

                }
            )
        );


    totalCourses.textContent =
        courses.size;


    // Female students

    const femaleCount =
        students.filter(
            function(student) {

                return student.gender ===
                    "Female";

            }
        ).length;


    femaleStudents.textContent =
        femaleCount;


    // Male students

    const maleCount =
        students.filter(
            function(student) {

                return student.gender ===
                    "Male";

            }
        ).length;


    maleStudents.textContent =
        maleCount;

}


// ==========================================
// START APPLICATION
// ==========================================

loadStudents();