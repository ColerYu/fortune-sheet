import React, { useState, useCallback, useEffect, useRef } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Sheet } from "@fortune-sheet/core";
import { Workbook, WorkbookInstance } from "@fortune-sheet/react";
import { Patch } from "immer";

export default {
  component: Workbook,
} as ComponentMeta<typeof Workbook>;

const Template: ComponentStory<typeof Workbook> = ({ ...args }) => {
  const [data, setData] = useState<Sheet[]>();
  const wsRef = useRef(new WebSocket("ws://localhost:8081/ws"));
  const workbookRef = useRef<WorkbookInstance>(null);

  useEffect(() => {
    const socket = wsRef.current;
    socket.onopen = () => {
      socket.send(JSON.stringify({ req: "getData" }));
    };
    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.req === "getData") {
        setData(msg.data);
      } else if (msg.req === "op") {
        workbookRef.current?.applyOp(msg.data);
      }
    };
  }, []);

  const onOp = useCallback((op: Patch[]) => {
    const socket = wsRef.current;
    socket.send(JSON.stringify({ req: "op", data: op }));
  }, []);

  const onChange = useCallback((d: Sheet[]) => {
    setData(d);
  }, []);

  if (!data) return <div />;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Workbook
        ref={workbookRef}
        {...args}
        data={data}
        onChange={onChange}
        onOp={onOp}
      />
    </div>
  );
};

export const Basic = Template.bind({});