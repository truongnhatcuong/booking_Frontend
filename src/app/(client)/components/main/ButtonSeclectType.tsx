"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const ItemButton = [
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
  typeRoom: string;
}
const ButtonSeclectType = ({ setTypeRoom, typeRoom }: IButton) => {
  return (
    <>
      <div className="flex gap-2 items-center justify-start ml-5 ">
        {ItemButton.map((item) => (
          <Button
            key={item.value}
            variant="ghost"
            className={` ${
              item.value === typeRoom
                ? "underline decoration-blue-500 decoration-2 underline-offset-4 text-2xl roboto-mono"
                : "text-2xl roboto-mono"
            }`}
            onClick={() => setTypeRoom(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ButtonSeclectType;
