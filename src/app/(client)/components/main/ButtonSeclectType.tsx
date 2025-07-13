"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ItemButton = [
  {
    label: "Tất cả",
    value: "",
  },
  {
    label: "Phòng Đơn",
    value: "Phòng Đơn",
  },
  {
    label: "Phòng Đôi",
    value: "Phòng Đôi",
  },
  {
    label: "Phòng Vip",
    value: "Phòng Vip",
  },
];
interface IButton {
  setTypeRoom: (value: string) => void;
}
const ButtonSeclectType = ({ setTypeRoom }: IButton) => {
  return (
    <div className="flex gap-2 items-center justify-center mb-5">
      {ItemButton.map((item) => (
        <Button
          key={item.value}
          variant="outline"
          className="rounded-2xl"
          onClick={() => setTypeRoom(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonSeclectType;
