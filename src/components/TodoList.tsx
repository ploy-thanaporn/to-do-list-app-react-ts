import { useState } from "react";
import Form from "./Form";
import Item from "./Item";
import { TodoItem } from "../types";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedEditTodo, setSelectedEditTodo] = useState<TodoItem | null>(
    null
  );

  const handleAddTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: uuidv4(),
      text: text,
      isCompleted: false,
      isEdit: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo: TodoItem) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id: string) => {
    const selected = todos.find((todo) => todo.id === id);
    if (selected) {
      setSelectedEditTodo(selected);
    }
  };

  const handleUpdateTodo = (newText: string) => {
    if (selectedEditTodo) {
      const updatedTodos = todos.map((todo: TodoItem) =>
        todo.id === selectedEditTodo.id ? { ...todo, text: newText } : todo
      );
      setTodos(updatedTodos);
      setSelectedEditTodo(null);
    }
  };

  return (
    <div>
      <div className="w-full max-w-[540px] bg-white mt-20 mx-auto mb-5 pt-10 px-[30px] pb-[70px] rounded-md">
        <Form
          onAddTodo={handleAddTodo}
          selectedEditTodo={selectedEditTodo}
          onUpdateTodo={handleUpdateTodo}
        />
        {todos.map((item) => (
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
