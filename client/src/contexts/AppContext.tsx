import React, { createContext, useContext, useReducer } from "react";
import { OrdersState } from "../models/Order";
import { User } from "../models/User";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface IAppState {
  token: string | null;
  user: User | null;
  ordersState: OrdersState | null;
}

interface IAppContext {
  setToken: (string) => void;
  setUser: (user) => void;
  setOrdersState: (ordersState) => void;
}

const initialState: IAppState = {
  token: null,
  user: null,
  ordersState: {
    orders: [],
    quantity: 0,
    errors: [],
  },
};

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  setToken: () => {},
  setUser: () => {},
  setOrdersState: () => {},
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action?.payload };
    case ActionTypes.SET_USER:
      return { ...state, user: action?.payload };
    case ActionTypes.SET_ODERS_STATE:
      return { ...state, ordersState: action?.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setToken: (token) =>
          dispatch({ type: ActionTypes.SET_TOKEN, payload: token }),
        setUser: (user) =>
          dispatch({ type: ActionTypes.SET_USER, payload: user }),
        setOrdersState: (ordersState) =>
          dispatch({ type: ActionTypes.SET_ODERS_STATE, payload: ordersState }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
