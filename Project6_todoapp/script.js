// logic for getting text from input and and saving in localstorage

const getTodos = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}


const setTodo = (myTodo) => {
    try {
        const todos = getTodos()
        const id = !todos.length? todos.length + 1: todos[todos.length-1].id +1
        const todo = {
            id: id,
            todo: myTodo,
            date: new Date(),
            isCompleted: false,
        }
        if (!getTodos) {
            localStorage.setItem('todos', JSON.stringify([todo]))
        }
        else {
            localStorage.setItem('todos', JSON.stringify([...todos, todo]))
        }
    }
    catch (err) {
        console.log('Error occured setting todos', err)
        throw err
    }
}

const handleSubmit = (e) => {
    const inputBox = document.getElementById('input-box')
    e.preventDefault()
    setTodo(inputBox.value)
    inputBox.value = ""
    showTodos()
    console.log(getTodos())
}




const showTodos = () => {
    const todoContainer = document.querySelector('.todo-container')
    todoContainer.innerHTML = ""
    const todos = getTodos()
    todos.forEach(item => {
        const element = `<li class="todo-item">
                    <span>${item.todo}-${item.id}</span>
                    <div class="todo-btn">
                        <button onclick="deleteTodo(${item.id})" class="delete">Delete</button>
                        <button class="edit">Edit</button>
                    </div>
                </li>`
        todoContainer.insertAdjacentHTML('beforeend', element)
    })
}


showTodos()





const deleteTodo = (id) => {
    const todos = getTodos()
    const newTodos = todos.filter(item=>item.id !== id)
    localStorage.setItem('todos',JSON.stringify(newTodos))
    showTodos()
}