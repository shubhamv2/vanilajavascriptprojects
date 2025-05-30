//getting todos from localstorgate
let isEdit = false


const getTodos = () => {
    return JSON.parse(localStorage.getItem('todos')) || {}
}



//logic to save todo in localstorage
const setTodo = (myTodo) => {
    try {
        const todos = getTodos()
        const id = !todos.pendingTodo?.length ? todos.pendingTodo?.length + 1 : todos.pendingTodo[todos.pendingTodo.length - 1].id + 1
        const todo = {
            id: id,
            todo: myTodo,
            date: new Date(),
            isCompleted: false,
        }

        if (isEdit) {
            isEdit = false
            const newTodos = todos?.pendingTodo.map(item => item.id === editId ? { ...item, todo: myTodo } : item)
            localStorage.setItem('todos', JSON.stringify({ ...todos, pendingTodo: newTodos }))
        } else {


            if (Object.keys(getTodos()).length === 0) {
                const todoObj = {
                    pendingTodo: [todo],
                    deleteTodo: []
                }
                localStorage.setItem('todos', JSON.stringify(todoObj))
            }
            else {
                const todoObj = {
                    ...todos,
                    pendingTodo: [...todos.pendingTodo, todo]

                }
                localStorage.setItem('todos', JSON.stringify(todoObj))
            }
        }
    }
    catch (err) {
        console.log('Error occured setting todos', err)
        throw err
    }
}



//logic to add todo by calling set todo function and show updated
const handleSubmit = (e) => {
    const inputBox = document.getElementById('input-box')
    e.preventDefault()
    if (inputBox.value) {
        setTodo(inputBox.value)
        inputBox.value = ""
        showTodos()
        const modal = document.querySelector('.modal_popup')
        modal.classList.add('showModal')
        modal.textContent = 'Todo added!'
        modal.style.width = '400px'
        modal.style.backgroundColor = 'green'
        setTimeout(() => {
            modal.classList.remove('showModal')
        }, 3000)

    }
    else {
        return
    }
}



//function show todos when ever we refresh or first time page load
const showTodos = () => {
    const todoContainer = document.querySelector('#todo-container')
    todoContainer.innerHTML = ""
    const todos = getTodos()
    todos.pendingTodo?.forEach(item => {
        const element = `<li class="todo-item">
                    <span>${item.todo}</span>
                    <div class="todo-btn">
                        <button onclick="deleteTodo(${item.id})" class="delete">Delete</button>
                        <button onclick="editTodo(${item.id})" class="edit">Edit</button>
                    </div>
                </li>`
        todoContainer.insertAdjacentHTML('beforeend', element)
    })

}


showTodos()




//logic to delete todo
const showDeletedTodos = () => {
    const todoContainer = document.querySelector('#deleted-todo')
    todoContainer.innerHTML = ""
    const todos = getTodos()
    todos.deleteTodo?.forEach(item => {
        const element = `<li class="todo-item">
                    <span>${item.todo}-${item.id}</span>
                </li>`
        todoContainer.insertAdjacentHTML('beforeend', element)
    })

}


showDeletedTodos()




let todoId = undefined;
const deleteTodo = (id) => {
    const modal = document.querySelector('.modal_popup')
    modal.style.backgroundColor = "#900"
    modal.innerHTML = `<h4 id="modal-text">Are you sure to delete to do?</h4>
                <div class="modal_button">
                    <button onclick="handleYesClick()">Yes</button>
                    <button onclick="handleNotClick()">No</button>
                </div>`
    if (modal.classList.contains('showModal')) {
        modal.classList.remove('showModal')
    }
    else {
        modal.classList.add('showModal')

    }
    setTimeout(() => {
        modal.classList.add('showModal')

    }, 300);
    todoId = id

}

const handleYesClick = () => {
    const id = todoId;
    const todos = getTodos()
    const deletedItem = todos.pendingTodo.filter(item => item.id === id)
    const newTodos = todos.pendingTodo.filter(item => item.id !== id)
    localStorage.setItem('todos', JSON.stringify({ ...todos, deleteTodo: [...todos.deleteTodo, ...deletedItem], pendingTodo: [...newTodos] }))
    showTodos()
    showDeletedTodos()
    const modal = document.querySelector('.modal_popup')
    modal.classList.remove('showModal')

}



const handleNotClick = () => {
    const modal = document.querySelector('.modal_popup')
    modal.classList.remove('showModal')
    return
}

const handleOnClear = () => {
    const data = getTodos()
    localStorage.setItem('todos', JSON.stringify({ ...data, deleteTodo: [] }))
    const modal = document.querySelector('.modal_popup')
    modal.classList.add('showModal')
    modal.textContent = 'Deleted Todos Cleared!'
    modal.style.width = '400px'
    modal.style.backgroundColor = '#900'
    setTimeout(() => {
        modal.classList.remove('showModal')
    }, 3000)
    showDeletedTodos()

}



let editId = undefined;
const editTodo = (id) => {
    const inputBox = document.getElementById('input-box')
    const todos = getTodos()
    const todoContent = todos.pendingTodo.find(item => item.id === id)
    inputBox.value = todoContent.todo
    isEdit = true
    editId = id
}
