// SUBJECT FUNCTIONS

function addSubject() {
  const container = document.getElementById('subjectInputs');
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input type="number" class="obtained" placeholder="Obtained Marks" min="0">
    <button class="delete-btn" onclick="deleteSubject(this)">Delete</button>
  `;
  container.appendChild(row);
}

function deleteSubject(btn) {
  const container = document.getElementById('subjectInputs');
  if (container.children.length > 1) {
    btn.parentElement.remove();
  } else {
    alert("At least one subject required");
  }
}

function showTotalMarksInput() {
  document.getElementById('totalMarksContainer').style.display = "block";
}

function calculatePercentage() {
  const obtainedMarks = document.querySelectorAll('.obtained');
  let sum = 0;

  for (let input of obtainedMarks) {
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 0) {
      alert("Enter valid marks");
      return;
    }
    sum += val;
  }

  const totalMax = parseFloat(document.getElementById('totalMaxMarks').value);
  if (isNaN(totalMax) || totalMax <= 0 || sum > totalMax) {
    alert("Invalid total maximum marks");
    return;
  }

  const percentage = (sum / totalMax) * 100;
  const cgpa = percentage / 9.5;

  let grade, message;

  if (percentage >= 90) {
    grade = "A+";
    message = "Outstanding Performance 🎉";
  } else if (percentage >= 75) {
    grade = "A";
    message = "Very Good 👏";
  } else if (percentage >= 60) {
    grade = "B";
    message = "Good 👍";
  } else if (percentage >= 40) {
    grade = "C";
    message = "Needs Improvement";
  } else {
    grade = "F";
    message = "Failed ❌";
  }

  document.getElementById('result1').innerHTML = `
    <div class="result-box">
      Total Marks: ${sum} / ${totalMax} <br>
      Percentage: ${percentage.toFixed(2)}% <br>
      CGPA: ${cgpa.toFixed(2)} <br>
      Grade: ${grade} <br>
      ${message}
      <div class="progress-bar">
        <div class="progress" style="width:${percentage}%"></div>
      </div>
    </div>
  `;

  localStorage.setItem("lastPercentage", percentage.toFixed(2));
}

function resetCalculator() {
  document.querySelectorAll('input').forEach(i => i.value = "");
  document.getElementById('result1').innerHTML = "";
  document.getElementById('totalMarksContainer').style.display = "none";
}

// SEMESTER FUNCTIONS

function addSemester() {
  const container = document.getElementById('semesterInputs');
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input type="number" class="semesterPercent" placeholder="Semester Percentage" min="0" max="100">
    <button class="delete-btn" onclick="deleteSemester(this)">Delete</button>
  `;
  container.appendChild(row);
}

function deleteSemester(btn) {
  const container = document.getElementById('semesterInputs');
  if (container.children.length > 1) {
    btn.parentElement.remove();
  } else {
    alert("At least one semester required");
  }
}

function calculateSemesterCGPA() {
  const inputs = document.querySelectorAll('.semesterPercent');
  let sum = 0;

  for (let input of inputs) {
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert("Enter valid semester percentage");
      return;
    }
    sum += val;
  }

  const avg = sum / inputs.length;
  const cgpa = avg / 9.5;

  document.getElementById('result2').innerHTML = `
    <div class="result-box">
      Semesters: ${inputs.length} <br>
      Average Percentage: ${avg.toFixed(2)}% <br>
      CGPA: ${cgpa.toFixed(2)}
      <div class="progress-bar">
        <div class="progress" style="width:${avg}%"></div>
      </div>
    </div>
  `;
}
