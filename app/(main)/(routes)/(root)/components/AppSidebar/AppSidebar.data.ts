import {
  LayoutDashboard,
  User,
  Briefcase,
  BookOpen,
  MessageCircle,
  Home,
  ShoppingBasketIcon,
  BriefcaseBusiness,
  BrainCircuitIcon,
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
    icon: BriefcaseBusiness,
  },
  {
    title: "AI Simulators",
    url: "/student/simulator",
    icon: BrainCircuitIcon,
  },
  {
    title: "My certificates",
    url: "/student/my-certificates",
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
