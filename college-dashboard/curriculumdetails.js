// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlYQQ502DzaJfdZQU4-Uw5m94tF5KYWBc",
  authDomain: "student-assistance-chatbot.firebaseapp.com",
  databaseURL: "https://student-assistance-chatbot-default-rtdb.firebaseio.com/",
  projectId: "student-assistance-chatbot",
  storageBucket: "student-assistance-chatbot.appspot.com",
  messagingSenderId: "580188102556",
  appId: "1:580188102556:web:f3b221ec0222495786b259",
  measurementId: "G-1D5NCR4SFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log("Firebase initialized successfully");

// Dynamically load CSS
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "admissionform.css"; // Path to your CSS file
document.head.appendChild(cssLink);

export default function loadCurriculumDetails(container) {
  const html = `
    <div class="container">
      <h5>Submit Curriculum Details</h5>
      <form id="curriculumForm" enctype="multipart/form-data">
        <div class="row g-3">
          <!-- Program Name -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="programType" class="text">Type of Program</label>
              <select id="programType" class="input" required>
                <option value="">Select</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Diploma">Diploma</option>
                <option value="Certification">Certification</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="coolinput">
              <label for="programName" class="text">Program Name:</label>
              <input type="text" id="programName" class="input" placeholder="Enter program name" required />
            </div>
          </div>

          <!-- Duration -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="duration" class="text">Duration (In years):</label>
              <input type="number" id="duration" class="input" placeholder="Enter program duration (In years)" required />
            </div>
          </div>

          <!-- Framework -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="framework" class="text">Framework</label>
              <select id="framework" class="input" required>
                <option value="">Select</option>
                <option value="Semester">Semester</option>
                <option value="Trimester">Trimester</option>
              </select>
            </div>
          </div>

          <!-- Total Credits -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="totalCredits" class="text">Total Credits Required</label>
              <input type="number" id="totalCredits" class="input" placeholder="Enter total credits" required>
            </div>
          </div>

          <!-- Fixed Default Course -->
          <div class="col-md-6">
            <div class="coolinput">
              <label for="CourseName1" class="text">Course Name (Course 1)</label>
              <input type="text" id="CourseName1" class="input" placeholder="Enter Course Name" required />
            </div>  
          </div>

          <div class="col-md-6">
            <div class="coolinput">
              <label for="CourseDuration1" class="text">Course Duration</label>
              <input type="number" id="CourseDuration1" class="input" placeholder="Enter Course Duration" required />
            </div>    
          </div>

          <div class="col-md-6">
            <div class="coolinput">
              <label for="SyllabusOutline1" class="text">Syllabus Outline</label>
              <input type="text" id="SyllabusOutline1" class="input" placeholder="Enter Syllabus Outline" required />
            </div>    
          </div>

          <div class="col-md-6">
            <div class="coolinput">
              <label for="LearningObjectives1" class="text">Learning Objectives</label>
              <input type="text" id="LearningObjectives1" class="input" placeholder="Enter Learning Objectives" required />
            </div>    
          </div>

          <!-- Additional Courses Section -->
          <div class="col-md-12" id="courseDetailsContainer">
            <button type="button" id="addCourse" class="btn btn-secondary btn-sm">Add Course</button>
          </div>

          <div class="col-md-12">
            <div class="coolinput">
                <label for="TeachingMethodology" class="text">Teaching Methodology</label>
                <div id="teachingModes" class="teachingModes d-flex justify-content-around align-items-center">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="lectureCheckbox" value="Lectures">
                    <label class="form-check-label" for="lectureCheckbox">Lectures</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="labsCheckbox" value="Labs">
                    <label class="form-check-label" for="labsCheckbox">Labs</label>
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="onlineCheckbox" value="Online">
                    <label class="form-check-label" for="onlineCheckbox">Online</label>
                </div>
                </div>
            </div>
          </div>

          <div class="col-md-8">
            <div class="coolinput">
                <label for="examTypes" class="text">Examination Types</label>
                <div id="examTypes" class="examTypes d-flex justify-content-between align-items-center flex-wrap">
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="summerSemesterCheckbox" value="Summer Semester">
                        <label class="form-check-label" for="summerSemesterCheckbox">Summer Semester</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="winterSemesterCheckbox" value="Winter Semester">
                        <label class="form-check-label" for="winterSemesterCheckbox">Winter Semester</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="remedialExamCheckbox" value="Remedial Exam">
                        <label class="form-check-label" for="remedialExamCheckbox">Remedial Exam</label>
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="supplementaryExamCheckbox" value="Supplementary Exam">
                        <label class="form-check-label" for="supplementaryExamCheckbox">Supplementary Exam</label>
                    </div>
                </div>
            </div>
          </div>



          <div class="col-md-4">
            <div class="coolinput">
              <label for="gradingSystem" class="text">Grading System</label>
              <select id="gradingSystem" class="input" required>
                <option value="">Select</option>
                <option value="Undergraduate">CGPA</option>
                <option value="Postgraduate">Percentage</option>
              </select>
            </div>    
          </div>


          <div class="col-md-12">
            <div class="coolinput">
              <label for="assessmentWeightage" class="text">Assessment Weightage</label>
              <input type="text" class="input" id="assessmentWeightage" placeholder="Assessment Weightage" required>
            </div>    
          </div>



          <!-- Upload Curriculum File -->
          <div class="col-md-12">
            <div class="coolinput">
              <label for="curriculumFile" class="text">Upload Curriculum File:</label>
              <input type="file" id="curriculumFile" class="input" required />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-3">
            <button type="submit" class="btn btn-primary w-5">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `;

  container.innerHTML = html;

  // Add course functionality
  document.getElementById("addCourse").addEventListener("click", () => {
    const courseDetailsContainer = document.getElementById("courseDetailsContainer");

    // Count existing courses to assign a new course number
    const currentCourses = courseDetailsContainer.querySelectorAll(".course-detail");
    const courseNumber = currentCourses.length + 2; // Start numbering from "Course 2"

    // Create a new course block
    const courseDiv = document.createElement("div");
    courseDiv.className = "course-detail";
    courseDiv.innerHTML = `
      <div class="row g-3">
        <div class="col-md-6">
          <div class="coolinput">
            <label for="CourseName${courseNumber}" class="text">Course Name (Course ${courseNumber})</label>
            <input type="text" id="CourseName${courseNumber}" class="input" placeholder="Enter Course Name" required />
          </div>
        </div>
        <div class="col-md-6">
          <div class="coolinput">
            <label for="CourseDuration${courseNumber}" class="text">Course Duration</label>
            <input type="number" id="CourseDuration${courseNumber}" class="input" placeholder="Enter Course Duration" required />
          </div>
        </div>
        <div class="col-md-6">
          <div class="coolinput">
            <label for="SyllabusOutline${courseNumber}" class="text">Syllabus Outline</label>
            <input type="text" id="SyllabusOutline${courseNumber}" class="input" placeholder="Enter Syllabus Outline" required />
          </div>
        </div>
        <div class="col-md-6">
          <div class="coolinput">
            <label for="LearningObjectives${courseNumber}" class="text">Learning Objectives</label>
            <input type="text" id="LearningObjectives${courseNumber}" class="input" placeholder="Enter Learning Objectives" required />
          </div>
        </div>
        <div class="col-md-2">
          <button type="button" class="btn btn-sm removeCourse">Remove</button>
        </div>
      </div>
    `;

    // Append the new course block
    courseDetailsContainer.appendChild(courseDiv);

    // Add functionality to remove this course
    courseDiv.querySelector(".removeCourse").addEventListener("click", () => {
      courseDetailsContainer.removeChild(courseDiv);
    });
  });

  // Form submission handler
  document.getElementById("curriculumForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Form submission started");

    const programName = document.getElementById("programName").value;
    const duration = document.getElementById("duration").value;
    const programType = document.getElementById("programType").value;
    const framework = document.getElementById("framework").value;
    const totalCredits = document.getElementById("totalCredits").value;
    const curriculumFile = document.getElementById("curriculumFile").files[0];

    if (!curriculumFile) {
      console.error("No file selected");
      return alert("Please upload a curriculum file!");
    }

    const courses = Array.from(
      document.querySelectorAll(".course-detail")
    ).map((course, index) => {
      const inputs = course.querySelectorAll("input");
      return {
        courseName: inputs[0].value,
        courseDuration: inputs[1].value,
        syllabusOutline: inputs[2].value,
        learningObjectives: inputs[3].value,
      };
    });

    const formData = new FormData();
    formData.append("programName", programName);
    formData.append("duration", duration);
    formData.append("programType", programType);
    formData.append("framework", framework);
    formData.append("totalCredits", totalCredits);
    formData.append("courses", JSON.stringify(courses));
    formData.append("file", curriculumFile);

    try {
      console.log("Sending data to backend...");
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (response.ok) {
        console.log("Document uploaded successfully:", result.fileUrl);

        // Add data to Firebase
        const curriculumData = {
          programName,
          duration,
          programType,
          framework,
          totalCredits,
          courses,
          documentUrl: result.fileUrl,
        };

        console.log("Storing data in Firebase:", curriculumData);
        const curriculumRef = ref(db, "CurriculumDetails/" + programName);

        await set(curriculumRef, curriculumData);
        console.log("Data stored in Firebase successfully!");

        alert("Curriculum form submitted successfully!");
        document.getElementById("curriculumForm").reset();
      } else {
        console.error("Backend error:", result.message);
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Network or Firebase error:", error);
      alert("Network error. Please try again.");
    }
  });
}
