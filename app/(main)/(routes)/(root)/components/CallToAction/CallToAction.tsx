export function CallToAction() {
return (
<section className="bg-blue-600 text-white py-16 px-6 text-center rounded-2xl shadow-xl max-w-4xl mx-auto my-12">
<h2 className="text-3xl sm:text-4xl font-bold mb-4">
Ready to take the first step?
</h2>
<p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
Whether you're a young talent looking for experience or a small business needing real solutions — Dexpert is your bridge to growth.
</p>
<div className="flex flex-col sm:flex-row justify-center gap-4">
<a
href="/signup"
className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
>
Join as a Student
</a>
<a
href="/signup-business"
className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
>
Join as a Business
</a>
</div>
<p className="mt-6 text-sm text-white/80 italic">
        ✨ Your talent is enough. Experience starts here.
</p>
</section>
);
}