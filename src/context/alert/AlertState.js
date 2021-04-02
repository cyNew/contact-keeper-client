import { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import * as types from "../types";
import * as uuid from "uuid";

export default function AlertState(props) {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();

    dispatch({
      type: types.SET_ALERT,
      payload: {
        msg,
        type,
        id,
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: types.REMOVE_ALERT,
          payload: id,
        }),
      timeout
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
}
