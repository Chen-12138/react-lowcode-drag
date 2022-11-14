import { useDispatch } from "react-redux";
import { ActionTypes } from "../state/constants/actionTypes";

export default function useLayerAction() {
  const dispatch = useDispatch();

  return {
    upComponent() {
      dispatch({
        type: ActionTypes.UpComponent,
      });
    },
  };
}
