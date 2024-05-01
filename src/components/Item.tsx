import { AiFillEdit } from "react-icons/ai";
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoMdCheckmark } from "react-icons/io";
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
        className={`flex justify-between cursor-pointer py-3 px-2.5 items-center ${
          item.isCompleted ? "bg-gray-100 " : "bg-indigo-500"
        } rounded text-white`}
      >
        <div
          className="flex items-center gap-x-2"
          onClick={() => onToggleComplete(item.id)}
        >
          {item.isCompleted && (
            <IoMdCheckmark className="text-md text-gray-400 font-medium" />
          )}
          <p
            className={`text-sm  ${
              item.isCompleted
                ? "font-light line-through text-gray-400"
                : "pl-6 font-medium text-white"
            }`}
          >
            {item.text}
          </p>
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
