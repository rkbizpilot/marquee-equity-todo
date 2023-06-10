import { useMemo } from "react";
import { TodoActionKind, TodoTypes } from "../reducer/todo.reducer";
import { TodoItem } from "../components/TodoItem/TodoItem";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../provider/StateProvider";

export const Completed = () => {
  //context
  const { state, dispatch } = useStateContext();
  const { todos }: { todos: TodoTypes[] } = state;

  //memorized
  const memorizedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isComplete);
  }, [todos]);

  return (
    <div className="w-full my-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-white text-2xl ml-2"> Complted Taks</p>
        </div>
      </div>
      <div className="mt-32">
        {memorizedTodos && memorizedTodos?.length > 0 ? (
          memorizedTodos?.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              markComplete={(arr: number[]) =>
                dispatch!({ type: TodoActionKind.COMPLETE, ids: arr })
              }
            />
          ))
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-1/3 p-4 rounded-md bg-white flex justify-center items-center">
              <FaceFrownIcon className="w-8 h-8 text-purple-500" />
              <p className="text-2xl">Sorry ! No Complted To Dos Found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
