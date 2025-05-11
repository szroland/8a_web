
const tasks = {
    "01_matyas": { 
        "title": "🤴 Mátyás (karakter formázás)"
    },
    "02_hozzavalok": { 
        "title": "🍳Hozzávalók (számozatlan listák)"
    },
    "03_csiga": { 
        "title": "🐌 Csiga (számozott listák)"
    },
    "04_csalad": {
        "title": "👨‍👩‍👧‍👦 Család (táblázatok)"
    },
    "05_sakk": {
        "title": "♟Sakk (táblázatok)"
    },
    "06_szerencsekerek": {
        "title": "🐹 Szerencsekerék (táblázatok)"
    },
    "07_album": {
        "title": "📀 Kedvenc album (táblázatok + listák)"
    },
};


function loadStyles() {
    // Dynamically load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
    //document.head.appendChild(bootstrapCSS);
}

function loadScripts() {
    const bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    document.body.appendChild(bootstrapJS);

    if (!isIndex()) {
        const taskJS = document.createElement('script');
        taskJS.src = 'js/' + getCurrentTaskId() + '.js';  
        document.body.appendChild(taskJS);
    }
}

function isIndex() {
    const task = getCurrentTaskId()
    return task === "" || task == "index";
}

function getCurrentTaskId() {
    // Get the current task ID from the file name or URL
    const pathParts = window.location.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName.split('.')[0];  // Extract task ID from file name (e.g., "task1.html")
}

function updateTaskList() {    
    const taskList = document.getElementById("task-list");
    const progressBar = document.getElementById("progress-bar");
    if (!taskList) return;

    taskList.innerHTML = "";
    let completedTasks = 0;
    let attemptedTasks = 0;
    const totalTasks = Object.keys(tasks).length;

    for (const taskId in tasks) {
        const li = document.createElement("li");
        li.classList.add("nav-item")
        const taskStatus = localStorage.getItem(taskId);
        let statusMarker = "⬜"; // Default: Not attempted (neutral)

        if (taskStatus === "complete") {
            statusMarker = "✅"; // Completed
            completedTasks++;
        } else if (taskStatus === "attempted") {
            statusMarker = "❌"; // Attempted but incomplete
            attemptedTasks++;
        }

        li.innerHTML = ` <a class="nav-link" href="${taskId}.html">${statusMarker} ${tasks[taskId].title}</a>`;
        taskList.appendChild(li);
    }

    const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = progressPercent + "%";
    progressBar.innerText = Math.round(progressPercent) + "%";
}

/*function setTitleWithEmoji(status) {
    const emojis = {
        "not_attempted": "⚪",  // White circle
        "incomplete": "⚠️",    // Warning sign
        "complete": "✅"       // Green checkmark
    };

    let baseTitle = "Task Name";  // Change this to match the task
    document.title = `${emojis[status] || "⚪"} ${baseTitle}`;
}*/


function hint(check) {
    let fs = check.feedback === null ? null : String(check.feedback)
    let s = fs ? `${check.title}: ${check.feedback}` : check.title
    let t = (check.success ? "✅":"❌") + s;
    return `<li>${t}</li>`;
}

function displayResult(checks) {

    //console.log("Checks", checks);
    let success = "";
    if (isDone(checks)) {
        success = "🚀 Kész!";
        markComplete()
    } else {
        markAttempted()
    }


    hl = checks.reduce((p, c) => p + hint(c), "");

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('container', 'mt-4', 'bg-body-tertiary');

    if (isDone(checks)) {
        taskContainer.innerHTML = success;
    } else {
        taskContainer.innerHTML = `<ul class="list-unstyled">${hl}</ul>`;
    }

    //document.body.insertBefore(taskContainer, document.body.firstChild);
    document.body.appendChild(taskContainer);
}

function nonScriptElements() {
    return Array.from(document.body.childNodes).filter(node => {
        if (node.nodeType === Node.COMMENT_NODE) return false;
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === "") return false;
        // Ignore script elements
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") return false;
        return true;
    });
}

function countNonScriptElements() {
    return nonScriptElements().length;
}

function checkSelector(title, selector, count = 1, root = document) {
    const res = root.querySelectorAll(selector)
    return {
        title,
        success: res.length >= count,
        feedback: `${res.length} / ${count}`
    }
}

function hasBorder(table) {
    if (!table.hasAttribute("border")) {
        return false;
    }
    
    let borderValue = table.getAttribute("border");
    return parseInt(borderValue, 10) >= 1;
}

function hasNonEmptyTextNode(element) {
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") {
            return true; // Found a non-empty text node
        }
    }
    return false; // No non-empty text nodes found
}

function hasOnlySpecificChildren(allowedTag) {
    return node => Array.from(node.children).every(child => child.tagName.toLowerCase() === allowedTag.toLowerCase());
}

function contains(content) {
    return node => node.innerHTML.toLowerCase().includes(content.toLowerCase())
}

function exact(content) {
    return node => node.innerHTML.trim() === content.trim()
}

function hasText(element) {
    let result = false
    for (let node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.trim() !== "") result = true;
        } else {
            return false
        }
    }
    return result;
}

function not(f) {
    return node => !(f(node))
}

function and(f1, f2) {
    return node => f1(node) && f2(node)
}

function checkContent(title, selector, content, count = 1, root = document) {
    const res = root.querySelectorAll(selector)

    let fn
    if (typeof content === "function") fn = content;
    else {
        fn = contains(content)
    }
    const found = Array.from(res).filter(fn);

    //console.log("Found", found, res);

    return {
        title,
        success: count === 0 ? found.length == 0 : found.length >= count,
        feedback: `${found.length} / ${count}`
    }

} 

function isDone(checks) {
    return checks.every(c => c.success)
}


function selectorHint(title, root, selector) {
    const res = root.querySelectorAll(selector)
    return hint(title, res.length > 0, res.length)
}


function init() {
    loadScripts();
    updateTaskList();
    loadStyles();
}

function markAttempted() {
    const taskId = getCurrentTaskId()
    localStorage.setItem(taskId, "attempted");
    updateTaskList();
}

function markComplete() {
    const taskId = getCurrentTaskId()
    localStorage.setItem(taskId, "complete");
    updateTaskList();
}

function resetProgress() {
    localStorage.clear();
    updateTaskList();
}

document.addEventListener('DOMContentLoaded', init);
