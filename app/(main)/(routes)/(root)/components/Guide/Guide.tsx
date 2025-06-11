export function Guide() {
  const steps = [
    {
      title: "Sign up for free",
      description:
        "Create your account as a student or small business owner. It only takes a minute.",
    },
    {
      title: "Browse real projects",
      description:
        "If you're a student, explore real-world challenges from small businesses that need your help.",
    },
    {
      title: "Publish your idea with AI help",
      description:
        "If you're a business owner, our AI helps you describe and post your project clearly, even without tech experience.",
    },
    {
      title: "Apply or choose collaborators",
      description:
        "Students apply to projects, and business owners choose who they want to work with.",
    },
    {
      title: "Build with AI support",
      description:
        "Students get continuous feedback and suggestions from our AI Product Manager while working on projects.",
    },
    {
      title: "Get results and recognition",
      description:
        "Businesses get real solutions, and students earn certificates to showcase their experience.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
        How Dexpert Works
      </h1>
      <div className="relative border-l border-gray-300 ml-4 sm:ml-6">
        {steps.map((step, index) => (
          <div key={index} className="mb-10 ml-4 sm:ml-6 relative">
            <div className="absolute -left-5 sm:-left-6 top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
            <p className="text-gray-600 mt-1 text-base">{step.description}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-600 italic text-sm sm:text-base mt-10">
        💡 Dexpert is more than a platform — it’s your first real step into the professional world.
      </p>
    </div>
  );
}
