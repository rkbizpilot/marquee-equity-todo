import { useContext, useReducer } from "react";
import {
  TodoAction,
  TodoTypes,
  initialState,
  reducer
} from "../reducer/todo.reducer";
import React from "react";

export interface StateContext {
  todos: TodoTypes[];
}

export interface Store {
  state: StateContext;
  dispatch?: React.Dispatch<TodoAction>;
}

const defaultState: StateContext = { todos: initialState };

const myContext = React.createContext<Store>({ state: defaultState });

export const useStateContext = () => useContext(myContext);

export const StateProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <myContext.Provider value={{ state, dispatch }}>
      {children}
    </myContext.Provider>
  );
};
