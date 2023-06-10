import { StateContext } from "../provider/StateProvider";

export type TodoTypes = {
  id: number;
  value: string;
  isComplete: boolean;
  subTasks: TodoTypes[];
};

export enum TodoActionKind {
  COMPLETE = "COMPLETE",
  ADD = "ADD",
  ADD_CHILD = "ADD_CHILD"
}

export type TodoAction =
  | { type: TodoActionKind.COMPLETE; ids: number[] }
  | { type: TodoActionKind.ADD; payload: TodoTypes }
  | { type: TodoActionKind.ADD_CHILD; id: number; payload: TodoTypes };

export const initialState: TodoTypes[] = [
  {
    id: 1,
    value: "Work details",
    isComplete: false,
    subTasks: [
      { id: 2, value: "Eat", isComplete: false, subTasks: [] },
      { id: 3, value: "Sleep", isComplete: false, subTasks: [] }
    ]
  }
];

export const reducer = (state: StateContext, action: TodoAction) => {
  switch (action.type) {
    case TodoActionKind.COMPLETE: {
      const allTodos = state.todos;
      allTodos?.forEach(function iter(a: TodoTypes) {
        if (action.ids?.includes(a.id)) {
          a.isComplete = true;
        }
        Array.isArray(a.subTasks) && a.subTasks.forEach(iter);
      });
      return { ...state, todos: allTodos };
    }

    case TodoActionKind.ADD:
      return { ...state, todos: state.todos.concat(action.payload) };

    case TodoActionKind.ADD_CHILD: {
      console.log(state, "--", action.id, "--pay", action.payload);
      const allTodos = state.todos;
      allTodos?.forEach(
        (todo) => todo?.id === action.id && todo.subTasks.push(action.payload)
      );
      return { ...state, todos: allTodos };
    }
    default:
      throw new Error("Not among actions");
  }
};
