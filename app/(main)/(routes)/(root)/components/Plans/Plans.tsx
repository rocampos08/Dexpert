"use client";
 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CircleDollarSign,
  Briefcase,
  Gem,
  LucideIcon,
} from "lucide-react";
 
type Plan = {
  icon: LucideIcon;
  price: string;
  title: string;
  description: string;
};
 
const plans: Plan[] = [
  {
    icon: CircleDollarSign,
    price: "$4.99",
    title: "Basic Plan",
    description: "Post a project on your own without complications",
  },
  {
    icon: Briefcase,
    price: "$14.99",
    title: "Assisted Plan",
    description: "Get help writing and choosing the right people",
  },
  {
    icon: Gem,
    price: "$39.99",
    title: "Premium Plan",
    description: "Full support and project management",
  },
];
 
export function Plans() {
  return (
<div className="min-h-screen bg-white py-12 px-6 md:px-12 lg:px-24">
<h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Choose Your Plan
</h1>
<div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
<Card
              key={idx}
              className="h-full flex flex-col p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
>
<CardContent className="flex-1 flex flex-col justify-between">
<div className="flex flex-col items-center text-center space-y-4 mb-6">
<Icon className="w-12 h-12 text-[#2196f3]" />
<h2 className="text-2xl font-semibold">{plan.title}</h2>
<p className="text-lg text-gray-700">{plan.description}</p>
<div className="text-3xl font-bold text-[#2196f3] font-mono tabular-nums min-w-[90px] text-center">
                    {plan.price}
</div>
</div>
<Button className="w-full mt-auto">Get Started</Button>
</CardContent>
</Card>
          );
        })}
</div>
</div>
  );
}