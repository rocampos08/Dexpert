import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  MessageCircle,
  Home,
  ShoppingBasketIcon,
} from "lucide-react";

export const studentRoutes = [
  {
    title: "Dashboard",
    url: "/student",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/student/profile",
    icon: User,
  },
  {
    title: "Projects",
    url: "/student/projects",
    icon: BookOpen,
  },
  {
    title: "Support",
    url: "/student/support",
    icon: MessageCircle,
  },
];

export const pymeRoutes = [
  {
    title: "Dashboard",
    url: "/pyme",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "/pyme/applications",
    icon: Briefcase,
  },
  {
    title: "Profile",
    url: "/pyme/profile",
    icon: ShoppingBasketIcon,
  },
  {
    title: "Support",
    url: "/pyme/support",
    icon: MessageCircle,
  },
];
