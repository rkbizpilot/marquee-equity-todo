import { useState } from "react";
import { Button } from "../Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { TodoActionKind, TodoTypes } from "../../reducer/todo.reducer";
import Modal from "../Modal/Modal";
import { useStateContext } from "../../provider/StateProvider";

export const TodoItem = ({
  todo,
  ischild,
  markComplete
}: {
  todo: TodoTypes;
  ischild?: boolean;
  markComplete: (arr: number[]) => void;
}) => {
  //context
  const { dispatch } = useStateContext();

  //tates
  const [isExpaned, setIsExpaned] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");

  //check child is there or not
  const hasChild = todo.subTasks ?? [];

  //mark task complete
  const handlChange = (arr: number[]) => {
    markComplete(arr);
  };

  //submit child todos
  const handleSubmit = () => {
    const requestData: TodoTypes = {
      id: Math.floor(100000 + Math.random() * 900000),
      value: newItem,
      isComplete: false,
      subTasks: []
    };
    dispatch!({
      type: TodoActionKind.ADD_CHILD,
      id: todo.id,
      payload: requestData
    });
    console.log(requestData, "--", todo.id);
    setOpen(false);
    setNewItem("");
  };

  return (
    <>
      <div
        className={`w-auto m-2 bg-white px-8 py-4 flex items-center justify-between ${
          ischild && "ml-12"
        } rounded-md`}
      >
        <div className="flex items-center flex-1">
          <input
            type="checkbox"
            className="mr-4 cursor-pointer"
            checked={todo?.isComplete}
            disabled={todo?.isComplete}
            onChange={() => {
              let arr = [todo.id];
              if (hasChild.length > 0) {
                arr = [...arr, ...todo.subTasks.map((data) => data.id)];
              }
              handlChange(arr);
            }}
          />
          <p
            className={`font-semibold ${
              todo.isComplete ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.value}
          </p>
        </div>
        <div className="flex items-center">
          {!ischild && (
            <div className={`${hasChild.length > 0 && "mr-2"}`}>
              <Button
                className="rounded-full w-8 h-8"
                disabled={todo.isComplete}
                onClick={() => setOpen(true)}
              >
                +
              </Button>
              <Modal
                showModal={isOpen}
                onClose={() => {
                  setOpen(false);
                  setNewItem("");
                }}
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={() => handleSubmit()}
              />
            </div>
          )}
          {hasChild.length > 0 && (
            <div
              onClick={() => setIsExpaned(!isExpaned)}
              className="cursor-pointer"
            >
              {!isExpaned ? (
                <ChevronDownIcon className="h-6 w-6 text-indigo-700 " />
              ) : (
                <ChevronUpIcon className="h-6 w-6 text-indigo-700 " />
              )}
            </div>
          )}
        </div>
      </div>
      {hasChild.length > 0 &&
        isExpaned &&
        hasChild.map((task, i) => (
          <TodoItem
            key={i}
            todo={task}
            ischild={true}
            markComplete={(arr: number[]) => {
              dispatch!({ type: TodoActionKind.COMPLETE, ids: arr });
            }}
          />
        ))}
    </>
  );
};
