// components/Testimony.tsx
export function Testimony() {
    return (
        <div className="py-12  text-center">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0a2342' }}>What our users say</h2>
            <p className="text-gray-500 mb-15 max-w-md mx-auto m">
                Many young people in El Salvador just need one opportunity. At Dexpert, they found it. These are some of the voices of those who have grown, contributed, and discovered what they’re capable of.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
                
                <div className="relative bg-white rounded-2xl shadow-md px-6 py-8 w-full max-w-xs mx-auto">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <img
                            src="hombre 1.jpg"
                            alt="Fernando Pérez"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                    <div className="mt-12">
                        <h3 className="font-semibold text-lg text-gray-800">Fernando Pérez</h3>
                        <p className="italic text-sm text-gray-500 mb-3">Dexpert User</p>
                        <p className="text-sm text-gray-400">
                            "I had never worked on a real project before. Dexpert helped me believe in what I can do and now I feel ready to apply for my first job."
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative bg-white rounded-2xl shadow-md px-6 py-8 w-full max-w-xs mx-auto">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <img
                            src="joven2.webp"
                            alt="Tatiana Salazar"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                    <div className="mt-12">
                        <h3 className="font-semibold text-lg text-gray-800">Tatiana Salazar</h3>
                        <p className="italic text-sm text-gray-500 mb-3">Entrepreneur</p>
                        <p className="text-sm text-gray-400">
                            "My small business got real support from talented young people. It wasn’t just help, it was collaboration with future professionals."
                        </p>
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                        <span className="text-white text-sm font-bold">★</span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative bg-white rounded-2xl shadow-md px-6 py-8 w-full max-w-xs mx-auto">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                        <img
                            src="joven3.jpeg"
                            alt="Sara Mejía"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                        />
                    </div>
                    <div className="mt-12">
                        <h3 className="font-semibold text-lg text-gray-800">Sara Mejía</h3>
                        <p className="italic text-sm text-gray-500 mb-3">Dexpert User</p>
                        <p className="text-sm text-gray-400">
                            "As a person with a disability, it’s hard to be taken seriously. On Dexpert, I was heard, included, and valued. I felt part of something."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
