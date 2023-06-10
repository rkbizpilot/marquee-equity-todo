import { CloudIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { Button } from "../components/Button";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { useMemo, useState } from "react";
import { TodoActionKind, TodoTypes } from "../reducer/todo.reducer";
import Modal from "../components/Modal/Modal";
import useDebounce from "../hooks/useDebounce";
import { useStateContext } from "../provider/StateProvider";

export const Dashboard = () => {
  let timeOfDay;
  let icon;

  //get time of day
  const date = moment.utc(Date.now()).local();

  //states
  const [isOpen, setOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  //context api
  const { state, dispatch } = useStateContext();
  const { todos }: { todos: TodoTypes[] } = state;

  //calculate greeetings
  const hours = date.hour();
  if (hours < 12) {
    timeOfDay = "Morning";
    icon = <SunIcon className="h-6 w-6 text-white" />;
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "Afternoon";
    icon = <CloudIcon className="h-6 w-6 text-white" />;
  } else {
    timeOfDay = "Evening";
    icon = <MoonIcon className="h-6 w-6 text-white" />;
  }

  //debounce search
  const debouncedSearch = useDebounce(search, 200);

  //memorized
  const memorizedTodos = useMemo(() => {
    if (debouncedSearch !== "") {
      const lowercaseDebouncedSearch = debouncedSearch.toLowerCase();

      return todos?.filter((data) =>
        data.value.toLowerCase().match(lowercaseDebouncedSearch)
      );
    }

    return todos;
  }, [todos, debouncedSearch]);

  //handle add parent
  const handleSubmit = () => {
    const requestData: TodoTypes = {
      id: Math.floor(100000 + Math.random() * 900000),
      value: newItem,
      isComplete: false,
      subTasks: []
    };
    dispatch!({ type: TodoActionKind.ADD, payload: requestData });
    setOpen(false);
    setNewItem("");
  };

  return (
    <div className="w-full my-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div>{icon}</div>
          <p className="text-white text-2xl ml-2"> Good {timeOfDay} !</p>
        </div>
        <div className="flex justify-between w-1/3">
          <input
            type="text"
            name="search"
            placeholder="search.."
            value={search}
            onChange={(e) => setSearch(e.target.value as string)}
            className={`hidden md:block w-full appearance-none rounded-md border border-gray-300 px-3 py-1 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mr-4`}
          />
          <Button
            color="secondary"
            className="w-[85px] "
            onClick={() => setOpen(true)}
          >
            + Add
          </Button>
          <Modal
            showModal={isOpen}
            onClose={() => {
              setOpen(false);
              setNewItem("");
            }}
            newItem={newItem}
            setNewItem={setNewItem}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="mt-32">
        {memorizedTodos &&
          memorizedTodos?.length > 0 &&
          memorizedTodos?.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={(arr: number[]) =>
                dispatch!({ type: TodoActionKind.COMPLETE, ids: arr })
              }
            />
          ))}
      </div>
    </div>
  );
};
