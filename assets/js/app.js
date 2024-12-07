function collectData() {
    const description = document.getElementById('description').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const index = getNumberOfTasksInLocalStorage()
    return {
        index,
        description,
        date,
        time,
    }
}

function generateHTML(data) {
    const newHTML = `
        <div class="task" id="task-${data.index}" >
        <i class="bi bi-x-circle" onclick="deleteTask(${data.index})"></i>
            <div>${data.description}</div>
            <div>${data.date}</div>
            <div>${data.time}</div>
        </div>
    `

    return newHTML
}


function renderHTML(newHTML) {
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML += newHTML
}


function clearForm() {
    const tasksForm = document.getElementById('tasksForm')
    tasksForm.reset()

    const descriptionInput = document.getElementById('description')
    descriptionInput.focus()
}


function saveTaskToStorage(taskObject) {
    const currentTasksInStorageJSON = localStorage.getItem('tasks')
    const currentTasksInStorage = JSON.parse(currentTasksInStorageJSON)
    currentTasksInStorage.push(taskObject) 
    localStorage.setItem('tasks', JSON.stringify(currentTasksInStorage))
}

function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks')
    if(tasksJSON) {
        const tasks = JSON.parse(tasksJSON)
        for(const task of tasks) {
            const newHTML = generateHTML(task)
            renderHTML(newHTML)
        }
    }
}


function initStorage() {
    const currentTasksInStorageJSON = localStorage.getItem('tasks')
    if(!currentTasksInStorageJSON) {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
    
}

    

function getNumberOfTasksInLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')).length
}

function addTask(event) {
    event.preventDefault()
    const data = collectData()
    const newHTML = generateHTML(data)
    renderHTML(newHTML)
    saveTaskToStorage(data)
    clearForm()
}

function deleteTask(index) {

    const tasksJSON = localStorage.getItem('tasks')
    const tasks = JSON.parse(tasksJSON)

    const updatedTasks = tasks.filter((task) => task.index !== index)

    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    const taskElement = document.getElementById(`task-${index}`)
    if (taskElement) {
        taskElement.remove()
    }
}
function checkAndRemoveExpiredTasks() {
    const tasksJSON = localStorage.getItem('tasks')
    if (tasksJSON) {
        let tasks = JSON.parse(tasksJSON)
        const currentTime = new Date()

        const validTasks = tasks.filter((task) => {
            const taskTime = new Date(`${task.date} ${task.time}`)
            return taskTime > currentTime 
        })

        if (validTasks.length !== tasks.length) {
            localStorage.setItem('tasks', JSON.stringify(validTasks))
            renderTasks()
        }
    }
}

function renderTasks() {
    const tasksContainer = document.getElementById('tasks')
    tasksContainer.innerHTML = ''

    const tasksJSON = localStorage.getItem('tasks')
    if (tasksJSON) {
        const tasks = JSON.parse(tasksJSON)
        for (const task of tasks) {
            const newHTML = generateHTML(task)
            renderHTML(newHTML)
        }
    }
}

initStorage()
loadTasksFromLocalStorage()
checkAndRemoveExpiredTasks()