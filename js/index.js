function checkTask(taskId) {
    if (taskId === "modify-style") {
        const element = document.getElementById("task-area");

        setInterval(() => {
            const computedStyle = getComputedStyle(element);

            if (computedStyle.backgroundColor !== "rgb(255, 255, 255)") { // Detects style change
                document.getElementById("result").innerText = "✅ Task Complete!";
                localStorage.setItem(taskId, "complete");
                updateTaskList(); // Update index.html if visited
            }
        }, 1000);
    }
}