"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  ChevronLeft,
  ChevronRightIcon as ChevronRightDouble,
  ArrowRight,
} from "lucide-react";
import { adminMenu, IListItemAdmin } from "./data-admin-Menu";
import { useSidebar } from "../../context/contextAdmin";
import useAuth from "@/lib/authUser";

const ALLOWED_ROLES: ("CUSTOMER" | "EMPLOYEE" | "ADMIN")[] = [
  "EMPLOYEE",
  "ADMIN",
];

const AdminSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<number[]>([]);
  const pathname = usePathname();
  const { isCollapsed, toggleCollapse } = useSidebar();
  const { user } = useAuth(ALLOWED_ROLES);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleSubMenu = (id: number) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isMenuActive = (menuItem: IListItemAdmin) => {
    return (
      pathname === menuItem.link ||
      menuItem.subMenuItem.some((subItem) => pathname === subItem.link)
    );
  };

  const isSubMenuActive = (link: string) => {
    return pathname === link;
  };

  return (
    <div className="relative">
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div
            className={`px-4 py-6 border-b flex ${
              isCollapsed ? "justify-center" : "justify-between"
            } items-center`}
          >
            {!isCollapsed && (
              <h2 className="text-xl font-semibold text-gray-800">
                <Link href={"/admin"}>Admin</Link>
              </h2>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRightDouble className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Sidebar menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              {adminMenu.map((menuItem) => (
                <li
                  key={menuItem.id}
                  className={`px-2 ${isCollapsed ? "text-center" : ""}`}
                >
                  {isCollapsed ? (
                    <div
                      className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer transition-colors ${
                        isMenuActive(menuItem)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        toggleCollapse();
                        toggleSubMenu(menuItem.id);
                      }}
                      title={menuItem.title}
                    >
                      <menuItem.icon className="h-5 w-5" />
                      <span className="text-xs mt-1 truncate w-full">
                        {menuItem.title.split(" ")[0]}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
                          isMenuActive(menuItem)
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleSubMenu(menuItem.id)}
                      >
                        <div className="flex items-center gap-3">
                          <menuItem.icon className="h-5 w-5" />
                          <span className="font-medium">{menuItem.title}</span>
                        </div>
                        {expandedMenus.includes(menuItem.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </div>

                      {/* Submenu */}
                      {expandedMenus.includes(menuItem.id) && (
                        <ul className="mt-1 ml-6 space-y-1 border-l-2 border-gray-200 pl-2">
                          {menuItem.subMenuItem.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.link}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                  isSubMenuActive(subItem.link)
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span className="text-sm ">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          {!isCollapsed && (
            <div className="px-3 py-4 border-t flex items-center">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">AD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {user ? user.firstName + " " + user.lastName : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user ? user.email : ""}
                  </p>
                </div>
              </div>
              <Link
                href="/"
                className="flex items-center gap-1 text-red-600 hover:text-red-800 mr-9 font-bold"
              >
                <ArrowRight size={30} />
              </Link>
            </div>
          )}
          {isCollapsed && (
            <div className="py-4 border-t flex justify-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
