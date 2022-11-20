import { useDispatch } from "react-redux";
import { ComponentListItem } from "../custom-component/component-list";
import { ActionTypes } from "../state/constants/actionTypes";
import { AnimationItem } from "../utils/animationClassData";

/**
 * 处理动画的Action
 */
export default function useAnimationAction() {
  const dispatch = useDispatch();

  return {
    addAnimation(animate: AnimationItem) {
      dispatch({
        type: ActionTypes.AddAnimation,
        payload: animate,
      });
    },

    eidtAnimation(index: number, animate: AnimationItem) {
      dispatch({
        type: ActionTypes.EditAnimation,
        payload: {
          index,
          animate,
        },
      });
    },

    deleteAnimation(index: number) {
      dispatch({
        type: ActionTypes.DeleteAnimation,
        payload: index,
      });
    },
  };
}
