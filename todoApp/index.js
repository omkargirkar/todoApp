function handleFormSubmit(event) {
    event.preventDefault();
    const todo = event.target.todoname.value;
    const description = event.target.description.value;
    const todoItem = {
        todo,
        description,
        isCompleted : false
    };
    axios
    .post(
      "https://crudcrud.com/api/15d12874ae9f47f2a20962459839ba83/todoList",todoItem
    )
    .then((response) => displayOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("todoname").value = "";
  document.getElementById("description").value = "";
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/15d12874ae9f47f2a20962459839ba83/todoList")
        .then((response) => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++){
                displayOnScreen(response.data[i]); 
            }
    })
})

function displayOnScreen(todoItem) {
  function completedTodos(obj){
    const completedTodosList = document.getElementById("completedTodos");
    const completedItemLi = document.createElement("li");
    completedItemLi.appendChild(document.createTextNode(`${obj.todo} - ${obj.description}`)
  );
  completedTodosList.appendChild(completedItemLi);
  }

    if(!todoItem.isCompleted){
      const todoItemLi = document.createElement("li");
      todoItemLi.appendChild(document.createTextNode(`${todoItem.todo} - ${todoItem.description}`)
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Remove X"));
    todoItemLi.appendChild(deleteBtn);

    const doneBtn = document.createElement("button");
    doneBtn.appendChild(document.createTextNode("Done"));
    todoItemLi.appendChild(doneBtn);
  
    const pendingTodosList = document.getElementById("pendingTodos");
    pendingTodosList.appendChild(todoItemLi);
  
    deleteBtn.addEventListener("click", function (event) {
      axios
      .delete(
        `https://crudcrud.com/api/15d12874ae9f47f2a20962459839ba83/todoList/${todoItem._id}`
      )
      .then(() => {
          pendingTodosList.removeChild(event.target.parentElement);
      })
      .catch((error) => console.log(error));
    });
  
    doneBtn.addEventListener("click", function (event) {
      axios
      .put(
        `https://crudcrud.com/api/15d12874ae9f47f2a20962459839ba83/todoList/${todoItem._id}`,{
          todo: todoItem.todo,
          description: todoItem.description,
          isCompleted: true
        }
      )
      .then(() => {
          pendingTodosList.removeChild(event.target.parentElement);
          todoItem.isCompleted = true;
          completedTodos(todoItem);
      })
      .catch((error) => console.log(error));
    }
  )
}
    else{
  completedTodos(todoItem);
}

}