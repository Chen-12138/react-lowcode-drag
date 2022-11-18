import { AnimationItem } from "./animationClassData";

export default async function runAnimation(
  $el: any,
  animations: AnimationItem[] = []
) {
  const play = (animation: any) =>
    new Promise<void>((resolve) => {
      const { animationTime, value = "", isLoop } = animation;
      $el.style.setProperty("--time", animationTime + "s");
      $el.classList.add(value, "animate__animated", utilsHandle(isLoop));
      const removeAnimation = () => {
        $el.removeEventListener("animationend", removeAnimation);
        $el.removeEventListener("animationcancel", removeAnimation);
        $el.classList.remove(value, "animate__animated", utilsHandle(isLoop));
        $el.style.removeProperty("--time");
        resolve();
      };

      $el.addEventListener("animationend", removeAnimation);
      $el.addEventListener("animationcancel", removeAnimation);
    });

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i]);
  }
}

function utilsHandle(isLoop: boolean) {
  return isLoop ? "infinite" : "no-infinite";
}
