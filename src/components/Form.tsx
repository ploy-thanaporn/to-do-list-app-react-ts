import { FormEvent, useEffect, useState } from "react";
import { FormProps } from "../types";
import Swal from "sweetalert2";

const Form = ({ onAddTodo, selectedEditTodo, onUpdateTodo }: FormProps) => {
  const [titleValue, setTitleValue] = useState("");
  const [desValue, setDesValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleValue === "" || desValue === "") {
      Swal.fire({
        icon: "warning",
        text: "Please enter a task",
      });
    } else if (selectedEditTodo) {
      onUpdateTodo(titleValue, desValue);
    } else {
      onAddTodo(titleValue, desValue);
    }
    setTitleValue("");
    setDesValue("");
  };

  useEffect(() => {
    if (selectedEditTodo) {
      setTitleValue(selectedEditTodo.title);
      setDesValue(selectedEditTodo.description);
    } else {
      setTitleValue("");
      setDesValue("");
    }
  }, [selectedEditTodo]);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-medium mb-8 text-center">To-Do List App</h2>
      <div className="flex items-center justify-between gap-x-2">
        <input
          type="text"
          className="bg-transparent outline-none border border-slate-300 p-[9px] w-full rounded text-base text-slate-500"
          onChange={(e) => setTitleValue(e.target.value)}
          value={titleValue}
          placeholder="title"
        />
        <input
          type="text"
          className="bg-transparent outline-none border border-slate-300 p-[9px] w-full rounded text-base text-slate-500"
          onChange={(e) => setDesValue(e.target.value)}
          value={desValue}
          placeholder="description"
        />
        <button
          className="bg-indigo-500 border-none outline-none py-2.5 px-8 text-white cursor-pointer rounded text-base"
          type="submit"
        >
          {selectedEditTodo ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default Form;
