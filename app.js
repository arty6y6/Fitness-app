function login(){
  window.location.href = "dashboard.html";
}

function goWorkout(){
  window.location.href = "workout.html";
}

function goProgress(){
  window.location.href = "progress.html";
}

function toggleTheme(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
}

(function loadTheme(){
  if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
  }
})();

function getWorkouts(){
  return JSON.parse(localStorage.getItem("workouts") || "[]");
}

function addWorkout(){
  const type = document.getElementById("type").value;
  const duration = document.getElementById("duration").value;

  const workouts = getWorkouts();
  workouts.push({type, duration, date: new Date().toISOString()});

  localStorage.setItem("workouts", JSON.stringify(workouts));
  renderWorkouts();
}

function renderWorkouts(){
  const list = document.getElementById("workoutList");
  if(!list) return;

  list.innerHTML = "";
  getWorkouts().forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.type} - ${w.duration} mins`;
    list.appendChild(li);
  });
}

function renderRecent(){
  const list = document.getElementById("recentList");
  if(!list) return;

  list.innerHTML = "";
  getWorkouts().slice(-5).reverse().forEach(w => {
    const li = document.createElement("li");
    li.textContent = `${w.type} - ${w.duration} mins`;
    list.appendChild(li);
  });
}

function renderSummary(){
  const el = document.getElementById("summary");
  if(!el) return;

  const workouts = getWorkouts();
  const total = workouts.reduce((sum,w)=> sum + Number(w.duration), 0);
  el.textContent = `Total workout time: ${total} minutes`;
}

renderWorkouts();
renderRecent();
renderSummary();
