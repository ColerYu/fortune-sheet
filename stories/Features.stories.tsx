import React, { useState, useCallback } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Sheet } from "@fortune-sheet/core";
import { Workbook } from "@fortune-sheet/react";
import cell from "./data/cell";
import formula from "./data/formula";
import empty from "./data/empty";
import freeze from "./data/freeze";

export default {
  component: Workbook,
} as ComponentMeta<typeof Workbook>;

const Template: ComponentStory<typeof Workbook> = ({
  // eslint-disable-next-line react/prop-types
  data: data0,
  ...args
}) => {
  const [data, setData] = useState<Sheet[]>(data0);
  const onChange = useCallback((d: Sheet[]) => {
    setData(d);
    console.log(d);
  }, []);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Workbook
        hooks={
          {
            afterUpdateCell(row, column, oldValue, newValue) {},
            afterDropCell(
              ctx,
              row_index,
              col_index,
              row_index_original,
              col_index_original
            ) {
              console.log(
                ctx,
                row_index,
                col_index,
                row_index_original,
                col_index_original
              );
            },
          } as any
        }
        showFormulaBar={false}
        {...args}
        data={data}
        onChange={onChange}
      />
    </div>
  );
};

export const Basic = Template.bind({});
// @ts-ignore
Basic.args = { data: [cell] };

export const Formula = Template.bind({});
// @ts-ignore
Formula.args = { data: [formula] };

export const Empty = Template.bind({});
Empty.args = { data: [empty] };

export const Tabs = Template.bind({});
// @ts-ignore
Tabs.args = { data: [cell, formula] };

export const Freeze = Template.bind({});
// @ts-ignore
Freeze.args = { data: [freeze] };

export const MultiInstance: ComponentStory<typeof Workbook> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "100%",
          paddingRight: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[empty]} />
      </div>
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "100%",
          paddingLeft: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[empty]} />
      </div>
    </div>
  );
};
