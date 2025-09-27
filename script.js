// 1. Percentage Calculator (Subject-wise)
function addSubject() {
  const container = document.getElementById('subjectInputs');
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input type="number" class="obtained" placeholder="Obtained Marks" min="0" />
    <button class="delete-btn" onclick="deleteSubject(this)">Delete</button>
  `;
  container.appendChild(row);
}

function deleteSubject(btn) {
  const container = document.getElementById('subjectInputs');
  if (container.children.length > 1) {
    btn.parentElement.remove();
  } else {
    alert('At least one subject is required.');
  }
}

function showTotalMarksInput() {
  const obtainedMarks = document.querySelectorAll('.obtained');

  for (let input of obtainedMarks) {
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 0) {
      alert('Please enter valid obtained marks (>= 0) for all subjects.');
      return;
    }
  }

  // Show total marks input section
  document.getElementById('totalMarksContainer').style.display = 'block';
  document.getElementById('result1').innerHTML = '';
}

function calculatePercentage() {
  const obtainedMarks = document.querySelectorAll('.obtained');
  let sumObtained = 0;

  for (let input of obtainedMarks) {
    sumObtained += parseFloat(input.value);
  }

  const totalMax = parseFloat(document.getElementById('totalMaxMarks').value);
  if (isNaN(totalMax) || totalMax <= 0 || sumObtained > totalMax) {
    alert('Please enter a valid total maximum marks (>= sum of obtained marks).');
    return;
  }

  const percentage = (sumObtained / totalMax) * 100;
  const cgpa = percentage / 9.5;

  document.getElementById('result1').innerHTML = `
    Total Obtained Marks: ${sumObtained} / ${totalMax} <br>
    Percentage: ${percentage.toFixed(2)}% <br>
    CGPA: ${cgpa.toFixed(2)}
  `;
}

// 2. Semester-wise Percentage & CGPA Calculator
function addSemester() {
  const container = document.getElementById('semesterInputs');
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input type="number" class="semesterPercent" placeholder="Semester Percentage" min="0" max="100" />
    <button class="delete-btn" onclick="deleteSemester(this)">Delete</button>
  `;
  container.appendChild(row);
}

function deleteSemester(btn) {
  const container = document.getElementById('semesterInputs');
  if (container.children.length > 1) {
    btn.parentElement.remove();
  } else {
    alert('At least one semester is required.');
  }
}

function calculateSemesterCGPA() {
  const semesterInputs = document.querySelectorAll('.semesterPercent');
  let sum = 0;
  let count = semesterInputs.length;

  for (let input of semesterInputs) {
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert('Please enter valid percentages between 0 and 100 for all semesters.');
      return;
    }
    sum += val;
  }

  const avg = sum / count;
  const cgpa = avg / 9.5;

  document.getElementById('result2').innerHTML = `
    Semesters: ${count} <br>
    Average Percentage: ${avg.toFixed(2)}% <br>
    CGPA: ${cgpa.toFixed(2)}
  `;
}
