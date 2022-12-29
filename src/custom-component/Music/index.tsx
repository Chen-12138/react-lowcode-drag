import { ComponentListItem } from "../component-list";
import Text from "../Text";
import styles from "./index.less";

interface MusicProps {
  element: ComponentListItem;
}

const Music: React.FC<MusicProps> = function ({ element }) {
  return (
    <div className={styles.music} style={element.style}>
      Music
      <audio
        autoPlay
        src="https://other-web-ra01-sycdn.kuwo.cn/5c650cd4d3b798405ed9bfab4ae1fe18/63941698/resource/n3/320/31/1/1060334909.mp3"
      ></audio>
    </div>
  );
};

export default Music;
