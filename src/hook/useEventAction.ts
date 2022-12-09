import { ActionTypes } from "@/state/constants/actionTypes";
import { useDispatch } from "react-redux";

export default function useEventAction() {
  const dispatch = useDispatch();

  return {
    addEvent(event: string, param: string) {
      dispatch({
        type: ActionTypes.Addevent,
        payload: {
          event,
          param,
        },
      });
    },

    removeEvent(event: string) {
      dispatch({
        type: ActionTypes.RemoveEvent,
        payload: {
          event,
        },
      });
    },
  };
}
