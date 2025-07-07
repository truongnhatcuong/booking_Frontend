import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardItemTotalProps {
  title: string;
  total: number | string;
  description?: string;
}
const CardItemTotal: React.FC<CardItemTotalProps> = ({
  title,
  total,
  description,
}) => {
  return (
    <Card className=" bg-white  shadow-xl hover:shadow-2xl  duration-300 rounded-2xl ">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold text-blue-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center ">
        <span className="text-3xl font-bold text-blue-900">{total ?? 0}</span>
      </CardContent>
      <CardFooter className="pt-2">
        <p className="text-sm text-gray-500">{description}</p>
      </CardFooter>
    </Card>
  );
};

export default CardItemTotal;
