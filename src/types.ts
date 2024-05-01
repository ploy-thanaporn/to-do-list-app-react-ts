export type TodoItem = {
  id: string;
  text: string;
  isCompleted: boolean;
  isEdit: boolean;
};
export type FormProps = {
  onAddTodo: (text: string) => void;
  selectedEditTodo: TodoItem | null;
  onUpdateTodo: (text: string) => void;
};
