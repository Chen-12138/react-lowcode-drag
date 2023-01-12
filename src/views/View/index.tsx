import styles from "./index.less";
import { State } from "@/state/reducer";
import { useSelector } from "react-redux";
import { ComponentListItem } from "@/custom-component/component-list";
import Text from "@/custom-component/Text";
import Button from "@/custom-component/Button";
import Rect from "@/custom-component/Rect";
import Circle from "@/custom-component/Circle";
import Image from "@/custom-component/Image";
import Music from "@/custom-component/Music";
import "animate.css";
import ComponentWrap from "@/components/Editor/ComponentWrap";
import { getComponentWrapStyle } from "@/utils/style";

function View() {
  const { componentData, curComponent } = useSelector(
    (state: State) => state.editor
  );

  const getComponent = (item: ComponentListItem) => {
    switch (item.component) {
      case "Text": {
        return <Text element={item} />;
      }

      case "Button": {
        return <Button element={item} />;
      }

      case "Rect": {
        return <Rect element={item} />;
      }

      case "Circle": {
        return <Circle element={item} />;
      }

      case "Image": {
        return <Image propValue={item.propValue} />;
      }

      case "Music": {
        return <Music element={item} />;
      }

      default: {
        return <Text element={item} />;
      }
    }
  };

  return (
    <div className={styles.home}>
      <main>
        {/* 中间画布 */}
        <section className={styles.center}>
          <div className={styles.content}>
            {componentData.map((item, index) => {
              return (
                <ComponentWrap
                  key={item.id}
                  defaultStyle={item.style}
                  style={getComponentWrapStyle(item.style)}
                  active={
                    item.id === (curComponent || ({} as ComponentListItem)).id
                  }
                  element={item}
                  index={index}
                >
                  {getComponent(item)}
                </ComponentWrap>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default View;
