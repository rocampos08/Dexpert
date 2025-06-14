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
    description: "Post a project on your own without complications.",
  },
  {
    icon: Briefcase,
    price: "$14.99",
    title: "Assisted Plan",
    description: "Get help writing and choosing the right people.",
  },
  {
    icon: Gem,
    price: "$24.99",
    title: "Premium Plan",
    description: "Full support and project management.",
  },
];

export function Plans() {
  return (
    <section className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-24">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Are you a PYME?
      </h1>
      <h1 className="text-md font-bold mb-6 text-center text-gray-500">
        These are the plans we offer for you
      </h1>

      <div className="grid gap-10 md:grid-cols-3">
        {plans.map((plan, idx) => {
          const Icon = plan.icon;
          return (
            <Card
              key={idx}
              className="h-full flex flex-col p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="flex flex-col items-center text-center space-y-4 mb-8">
                  <Icon className="w-12 h-12 text-[#2196f3]" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {plan.title}
                  </h2>
                  <p className="text-gray-600">{plan.description}</p>
                  <div className="text-3xl font-bold text-[#2196f3] font-mono tabular-nums min-w-[90px]">
                    {plan.price}
                  </div>
                </div>
                <Button className="w-full mt-auto" aria-label={`Select ${plan.title}`}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
