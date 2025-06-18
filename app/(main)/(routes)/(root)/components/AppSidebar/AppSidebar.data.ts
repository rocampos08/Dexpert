import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  Building2,
  MessageCircle,
  Home,
  ShoppingBasketIcon,
} from "lucide-react";

export const studentRoutes = [
  {
    title: "Home",
    url: "/",
    icon: Home,
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
