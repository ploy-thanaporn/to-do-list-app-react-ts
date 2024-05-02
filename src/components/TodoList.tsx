import { useEffect, useState } from "react";
import Form from "./Form";
import Item from "./Item";
import { TodoItem } from "../types";
import { v4 as uuidv4 } from "uuid";
import BtnFilter from "./BtnFilter";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedEditTodo, setSelectedEditTodo] = useState<TodoItem | null>(
    null
  );
  const [filter, setFilter] = useState<string>("All");
  const [click, setClick] = useState<boolean>(false);
  const [hasTodoChanged, setHasTodoChanged] = useState<boolean>(false);

  useEffect(() => {
    const todoList = localStorage.getItem("todoList");

    if (todoList) {
      setTodos(JSON.parse(todoList));
    }
  }, []);

  useEffect(() => {
    if (hasTodoChanged === true) {
      localStorage.setItem("todoList", JSON.stringify(todos));
    }
  }, [todos, hasTodoChanged]);

  const handleAddTodo = (titile: string, des: string) => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title: titile,
      description: des,
      isCompleted: false,
      isEdit: false,
    };

    setHasTodoChanged(true);
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo: TodoItem) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setHasTodoChanged(true);
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setHasTodoChanged(true);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id: string) => {
    const selected = todos.find((todo) => todo.id === id);
    if (selected) {
      setSelectedEditTodo(selected);
    }
  };

  const handleUpdateTodo = (newText: string, newDes: string) => {
    if (selectedEditTodo) {
      const updatedTodos = todos.map((todo: TodoItem) =>
        todo.id === selectedEditTodo.id
          ? { ...todo, text: newText, description: newDes }
          : todo
      );

      setTodos(updatedTodos);
      setSelectedEditTodo(null);
      setHasTodoChanged(true);
    }
  };

  const filterButtons = [
    { text: "All", filterValue: "All" },
    { text: "Incomplete", filterValue: "Incomplete" },
    { text: "Complete", filterValue: "Complete" },
  ];

  const handleFilterChange = (filterValue: string) => {
    setClick(!click);

    setFilter(filterValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Complete") {
      return todo.isCompleted;
    } else if (filter === "Incomplete") {
      return !todo.isCompleted;
    }
  });

  return (
    <div>
      <div className="w-full max-w-[640px] bg-white mt-20 mx-auto mb-5 pt-10 px-[30px] pb-[70px] rounded-md">
        <Form
          onAddTodo={handleAddTodo}
          selectedEditTodo={selectedEditTodo}
          onUpdateTodo={handleUpdateTodo}
        />
        {/* filter */}
        <div className="flex justify-center gap-x-3 my-6">
          {filterButtons.map((button) => (
            <BtnFilter
              key={button.text}
              onClick={handleFilterChange}
              isActive={filter === button.filterValue ? true : false}
              text={button.text}
            />
          ))}
        </div>

        {filteredTodos.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
