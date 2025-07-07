/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { Trash } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { mutate } from "swr";
interface DeleteRoomtypeProps {
  roomTypeId: string;
}
const DeleteRoom = ({ roomTypeId }: DeleteRoomtypeProps) => {
  const MySwal = withReactContent(Swal);
  const handleDelete = async () => {
    const confirm = MySwal.fire({
      title: "Bạn có muốn xóa tiện nghi này không ?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      icon: "question",
    });
    if ((await confirm).isConfirmed) {
      try {
        const res = await axiosInstance.delete(`/api/roomtype/${roomTypeId}`);
        if (res.data) {
          toast.success("Xóa thành công!");
          mutate(`${process.env.NEXT_PUBLIC_URL_API}/api/roomtype`);
        }
      } catch (error: any) {
        toast.error(error.response.data.message || "Xóa không thành công!");
      }
    }
  };
  return (
    <>
      {" "}
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="cursor-pointer text-red-500 hover:text-red-600"
        onClick={handleDelete}
      >
        <Trash className="h-4 w-4 " />
      </Button>
    </>
  );
};

export default DeleteRoom;
