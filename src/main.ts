import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const input = document.getElementsByName("title")[0] as HTMLInputElement;

const form = document.getElementById("myForm") as HTMLFormElement;

form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: input.value,
    isCompleted: false,
    id: String(Math.round(Math.random() * 100)),
  };

  todos.push(todo);
  input.value = "";
  console.log(todos);
  allTodos(todos);
};

const displayTodo = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";

  const checkBox = document.createElement("input") as HTMLInputElement;

  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    item.className = checkBox.checked ? "done" : "";
  };

  const item = document.createElement("p") as HTMLElement;
  item.className = isCompleted ? "done " : "item";

  item.innerText = title;

  const dltBtn = document.createElement("button") as HTMLButtonElement;

  dltBtn.className = "dltBtn";
  dltBtn.innerText = "X";
  dltBtn.onclick = () => {
    deleteTodo(id);
  };

  todo.append(checkBox, item, dltBtn);
  todosContainer.append(todo);
};

const allTodos = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    displayTodo(item.title, item.isCompleted, item.id);
  });
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  allTodos(todos);
};
