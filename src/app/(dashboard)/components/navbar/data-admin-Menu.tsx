import React from "react";
import {
  UserIcon,
  HomeIcon,
  CalendarIcon,
  TagIcon,
  StarIcon,
  WrenchIcon,
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Bed,
  BookOpen,
  CalendarCheck,
  CalendarRange,
  ChartPie,
  FilePlus,
  Home,
  LayoutGrid,
  Newspaper,
  TicketPercent,
  TrendingUp,
  UserRoundPlus,
  Wifi,
} from "lucide-react";
import { Role } from "@/middleware";

export interface ISubMenuItem {
  id: number;
  link: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: Role[]; // 👈 thêm
}

export interface IListItemAdmin {
  id: number;
  link: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  roles: Role[]; // 👈 thêm
  subMenuItem?: ISubMenuItem[];
}

export const adminMenu: IListItemAdmin[] = [
  {
    id: 1,
    link: "/admin/users",
    title: "Quản lý người dùng",
    icon: UserIcon,
    roles: ["ADMIN", "MANAGER"],
    subMenuItem: [
      {
        id: 102,
        link: "/admin/users/customers",
        title: "Khách hàng",
        icon: UsersIcon,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK"],
      },
      {
        id: 103,
        link: "/admin/users/employees",
        title: "Nhân viên",
        icon: UserGroupIcon,
        roles: ["ADMIN", "MANAGER"],
      },
      {
        id: 104,
        link: "/admin/users/roles",
        title: "Vai trò",
        icon: UserRoundPlus,
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    id: 2,
    link: "/admin/rooms",
    title: "Quản lý phòng",
    icon: HomeIcon,
    roles: ["ADMIN", "MANAGER", "FRONT_DESK", "MAINTENANCE"],
    subMenuItem: [
      {
        id: 201,
        link: "/admin/rooms/room",
        title: "Danh sách phòng",
        icon: Bed,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK", "MAINTENANCE"],
      },
      {
        id: 202,
        link: "/admin/rooms/room-types",
        title: "Loại phòng",
        icon: Home,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK", "MAINTENANCE"],
      },
      {
        id: 203,
        link: "/admin/rooms/amenities",
        title: "Tiện nghi",
        icon: Wifi,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK", "MAINTENANCE"],
      },
      {
        id: 204,
        link: "/admin/rooms/maintenance",
        title: "Danh sách bảo trì",
        icon: WrenchIcon,
        roles: ["ADMIN", "MANAGER", "MAINTENANCE"],
      },
    ],
  },
  {
    id: 3,
    link: "/admin/bookings",
    title: "Quản lý đặt phòng",
    icon: CalendarIcon,
    roles: ["ADMIN", "MANAGER", "FRONT_DESK"],
    subMenuItem: [
      {
        id: 301,
        link: "/admin/bookings/listbooking",
        title: "Danh sách đặt phòng",
        icon: LayoutGrid,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK"],
      },
      {
        id: 303,
        link: "/admin/bookings/add-booking",
        title: "Đặt phòng",
        icon: CalendarCheck,
        roles: ["ADMIN", "MANAGER", "FRONT_DESK"],
      },
    ],
  },
  {
    id: 5,
    link: "/admin/discounts",
    title: "Quản lý khuyến mãi",
    icon: TicketPercent,
    roles: ["ADMIN", "MANAGER"],
    subMenuItem: [
      {
        id: 501,
        link: "/admin/discounts",
        title: "Danh sách khuyến mãi",
        icon: TagIcon,
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    id: 6,
    link: "/admin/reviews",
    title: "Quản lý hành vi",
    icon: StarIcon,
    roles: ["ADMIN", "MANAGER", "MARKETING"],
    subMenuItem: [
      {
        id: 601,
        link: "/admin/reviews",
        title: "Danh sách đánh giá",
        icon: StarIcon,
        roles: ["ADMIN", "MANAGER", "MARKETING"],
      },
      {
        id: 602,
        link: "/admin/reviews/audit-logs",
        title: "Xem nhật ký",
        icon: DocumentTextIcon,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    id: 9,
    link: "/admin/seasonal-rates",
    title: "Quản lý giá theo mùa",
    icon: ChartBarIcon,
    roles: ["ADMIN", "MANAGER"],
    subMenuItem: [
      {
        id: 901,
        link: "/admin/seasonal-rates",
        title: "Danh sách giá mùa",
        icon: CalendarRange,
        roles: ["ADMIN", "MANAGER"],
      },
      {
        id: 902,
        link: "/admin/seasonal-rates/add",
        title: "Thêm giá theo mùa",
        icon: TrendingUp,
        roles: ["ADMIN", "MANAGER"],
      },
    ],
  },
  {
    id: 10,
    link: "/admin/blog",
    title: "Quản lý bài viết",
    icon: BookOpen,
    roles: ["ADMIN", "MANAGER", "MARKETING"],
    subMenuItem: [
      {
        id: 1001,
        link: "/admin/blog",
        title: "Danh sách bài viết",
        icon: Newspaper,
        roles: ["ADMIN", "MANAGER", "MARKETING"],
      },
      {
        id: 1002,
        link: "/admin/blog/add",
        title: "Thêm bài viết",
        icon: FilePlus,
        roles: ["ADMIN", "MANAGER", "MARKETING"],
      },
    ],
  },
  {
    id: 12,
    link: "/admin/statiscal",
    title: "Thống Kê",
    icon: ChartPie,
    roles: ["ADMIN", "MANAGER"],
  },
];

// 👇 hàm filter dùng trong sidebar
export function getMenuByRole(role: Role): IListItemAdmin[] {
  return adminMenu
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      subMenuItem: item.subMenuItem?.filter((sub) => sub.roles.includes(role)),
    }));
}
