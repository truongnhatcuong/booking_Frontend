"use client";
import React from "react";
import moment from "moment";
import DeleteReview from "./DeleteReview";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

moment.locale("vi");

interface User {
  id: string;
  lastName: string;
  firstName: string;
}

interface Customer {
  user: User;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewDate: string;
  customer: Customer;
}

export interface ReviewTableFormProps {
  reviews: Review[];
}

export default function ReviewTableForm({ reviews }: ReviewTableFormProps) {
  return (
    <div className="bg-white p-8">
      <div className="shadow-md rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách Hàng</TableHead>
              <TableHead>Thời Gian</TableHead>
              <TableHead>Đánh Giá</TableHead>
              <TableHead>Bình Luận</TableHead>
              <TableHead className="text-center">Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.customer.user.firstName}{" "}
                    {review.customer.user.lastName}
                  </TableCell>

                  <TableCell>
                    <div className="text-sm text-gray-500">
                      {moment(review.reviewDate).fromNow()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {moment(review.reviewDate).format("DD/MM/YYYY")}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.539 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.098 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div
                      className="max-w-md truncate text-sm text-gray-600"
                      title={review.comment}
                    >
                      {review.comment}
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <DeleteReview id={review.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-gray-500"
                >
                  Chưa có đánh giá nào!!!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
