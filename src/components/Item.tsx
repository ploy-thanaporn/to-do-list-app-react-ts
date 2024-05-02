import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { TodoItem } from "../types";

const Item = ({
  item,
  onToggleComplete,
  onEdit,
  onDelete,
}: {
  item: TodoItem;
  onToggleComplete: (key: string) => void;
  onEdit: (key: string) => void;
  onDelete: (key: string) => void;
}) => {
  return (
    <div className="mb-3">
      <div
        className={`flex justify-between cursor-pointer py-3 px-3 items-center ${
          item.isCompleted ? "bg-gray-100" : "bg-indigo-500"
        } rounded text-white`}
      >
        <div
          className="flex items-center gap-x-2"
          onClick={() => onToggleComplete(item.id)}
        >
          <div className="flex flex-col">
            <p
              className={`text-base  ${
                item.isCompleted
                  ? "font-light line-through text-gray-400"
                  : "font-medium text-white"
              }`}
            >
              {item.title}
            </p>
            <p
              className={`text-sm  ${
                item.isCompleted
                  ? "font-light line-through text-gray-400"
                  : "font-ligth text-slate-100"
              }`}
            >
              {item.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <AiFillEdit
            className={`text-xl cursor-pointer ${
              item.isCompleted ? "text-gray-400" : "text-white"
            }`}
            onClick={() => onEdit(item.id)}
          />
          <BiSolidTrashAlt
            className={`text-xl cursor-pointer ${
              item.isCompleted ? "text-gray-400" : "text-white"
            }`}
            onClick={() => onDelete(item.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
