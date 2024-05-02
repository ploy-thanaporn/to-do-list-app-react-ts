export type TodoItem = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isEdit: boolean;
};
export type FormProps = {
  onAddTodo: (titile: string, des: string) => void;
  selectedEditTodo: TodoItem | null;
  onUpdateTodo: (titile: string, des: string) => void;
};
