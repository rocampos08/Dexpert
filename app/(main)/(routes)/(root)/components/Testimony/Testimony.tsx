import Image from "next/image";
import { Quote } from "lucide-react";

export function Testimony() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold text-[#0a2342] mb-4">What our users say</h2>
      <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
        Many young people in El Salvador just need one opportunity. At Dexpert, they found it. These are some of the voices of those who have grown, contributed, and discovered what they’re capable of.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {/* Card 1 */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <Image
              width={80}
              height={80}
              src="/hombre 1.jpg"
              alt="Fernando Pérez"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="mt-12 text-left">
            <Quote className="text-[#2196f3] mb-2" size={20} />
            <p className="text-sm text-gray-600 mb-4">
              "I had never worked on a real project before. Dexpert helped me believe in what I can do and now I feel ready to apply for my first job."
            </p>
            <h3 className="font-semibold text-lg text-[#0a2342]">Fernando Pérez</h3>
            <p className="italic text-sm text-gray-400">Dexpert User</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <Image
              width={80}
              height={80}
              src="/joven2.webp"
              alt="Tatiana Salazar"
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="mt-12 text-left">
            <Quote className="text-[#2196f3] mb-2" size={20} />
            <p className="text-sm text-gray-600 mb-4">
              "My small business got real support from talented young people. It wasn’t just help, it was collaboration with future professionals."
            </p>
            <h3 className="font-semibold text-lg text-[#0a2342]">Tatiana Salazar</h3>
            <p className="italic text-sm text-gray-400">Entrepreneur</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm mx-auto transition-transform hover:-translate-y-1 hover:shadow-xl duration-300">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <Image
              src="/joven3.jpeg"
              alt="Sara Mejía"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>
          <div className="mt-12 text-left">
            <Quote className="text-[#2196f3] mb-2" size={20} />
            <p className="text-sm text-gray-600 mb-4">
              "As a person with a disability, it’s hard to be taken seriously. On Dexpert, I was heard, included, and valued. I felt part of something."
            </p>
            <h3 className="font-semibold text-lg text-[#0a2342]">Sara Mejía</h3>
            <p className="italic text-sm text-gray-400">Dexpert User</p>
          </div>
        </div>
      </div>
    </section>
  );
}
