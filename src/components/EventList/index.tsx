import useEventAction from "@/hook/useEventAction";
import { State } from "@/state/reducer";
import { eventList } from "@/utils/event";
import { Button, Drawer, Input, InputRef, Tabs } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const EventList = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { curComponent } = useSelector((state: State) => state.editor);
  const { addEvent } = useEventAction();
  const inputRef = useRef<InputRef>(null);

  const tabConfig = eventList.map((item) => {
    let children =
      item.key === "redirect" ? (
        <div>
          <Input
            ref={inputRef}
            defaultValue={curComponent!.events[item.key] || ""}
            placeholder="请输入完整的URL"
          />
          <Button
            onClick={() => {
              addEvent(item.key, item.param);
            }}
            style={{ marginTop: 10 }}
          >
            确认
          </Button>
        </div>
      ) : (
        <div>
          <Input
            ref={inputRef}
            defaultValue={curComponent!.events[item.key] || ""}
            placeholder="请输入要alert的内容"
          />
          <Button
            onClick={() => {
              addEvent(item.key, item.param);
            }}
            style={{ marginTop: 10 }}
          >
            确认
          </Button>
        </div>
      );
    return {
      label: item.label,
      key: item.label,
      children,
    };
  });

  return (
    <>
      <div>
        <Button onClick={() => setShowDrawer(true)}>添加事件</Button>
      </div>
      <Drawer
        width={420}
        headerStyle={{ display: "none" }}
        bodyStyle={{ paddingTop: 0, paddingRight: 0 }}
        placement="left"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Tabs items={tabConfig} />
      </Drawer>
    </>
  );
};

export default EventList;
