const form = document.querySelector("form");
const course = document.querySelector("#course");
const task = document.querySelector("#tasks");
const date = document.querySelector("#date");
const priority = document.querySelector("#priority");
const taskList = document.querySelector(".task-list");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (
        course.value === "" ||
        task.value === "" ||
        date.value === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    // Remove "No tasks yet."
    const empty = taskList.querySelector("p");
    if (empty) {
        empty.remove();
    }

    const card = document.createElement("div");
    card.classList.add("task-card");

    card.innerHTML = `
        <h3>${course.value}</h3>
        <p><strong>Task:</strong> ${task.value}</p>
        <p><strong>Due:</strong> ${date.value}</p>
        <p><strong>Priority:</strong> ${priority.value}</p>
    <div class="task-buttons">
        <button class="complete">Complete</button>
        <button class="delete">Delete</button>
    </div>
    `;

    taskList.appendChild(card);

    form.reset();
});

taskList.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete")) {

        let card = event.target.parentElement.parentElement;
        card.remove();

        if (taskList.querySelectorAll(".task-card").length === 0) {
            taskList.innerHTML = `
                <h2>My Tasks</h2>
                <p>No tasks yet.</p>
            `;
        }
    }

    if (event.target.classList.contains("complete")) {

        let card = event.target.parentElement.parentElement;

        card.style.background = "#d1fae5";
        card.style.borderLeft = "6px solid green";

        event.target.textContent = "Completed";
        event.target.disabled = true;
    }

});