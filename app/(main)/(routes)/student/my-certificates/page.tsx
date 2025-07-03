// app/certificates/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma"; // Ensure this path is correct for your Prisma instance

// This function isn't strictly necessary anymore if your backend always saves the full URL,
// but it's good defensive programming.



export default async function CertificatesPage() {
  const user = await currentUser();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg">You must be logged in to view your certificates.</p>
        </div>
      </div>
    );
  }

  // Step 1: Find the UserProfile using the Clerk user ID.
  const userProfile = await prisma.userProfile.findUnique({
    where: { userId: user.id },
  });

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg">Your user profile was not found. Please ensure you have completed your registration.</p>
        </div>
      </div>
    );
  }

  // Step 2: With the UserProfile ID, find the Student profile.
  const student = await prisma.student.findUnique({
    where: { userId: userProfile.id }, // Correct: we use userProfile.id
  });

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg">Your student profile was not found. Please complete your profile information.</p>
        </div>
      </div>
    );
  }

  // Step 3: Once we have the student profile, find their approved applications.
  const applications = await prisma.application.findMany({
    where: { studentId: student.id, status: "approved" },
    include: {
      certificate: true, // This brings the certificate URL if it exists
      project: true,      // This brings the project title
    },
  });

  if (!applications.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-700 text-lg">You don't have any certificates available yet.</p>
        </div>
      </div>
    );
  }

  // Step 4: Render the list of certificates with a beautiful, minimalist design.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-10 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 leading-tight">
          My Certificates
        </h1>

        {/* Temporary Reminder Box */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              {/* Icon for reminder */}
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.542 2.766-1.542 3.532 0l2.57 5.139a1.75 1.75 0 01-.81 2.375l-4.145 2.672a1.75 1.75 0 01-2.228-1.599V6.25c0-.966.97-1.66 1.844-1.22l.534.267z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Temporary Note:</span> Due to a current system update, you might need to manually add the '.pdf' extension to the downloaded file name if it's missing (e.g., 'CertificateName.pdf'). We're working to fix this soon!
              </p>
            </div>
          </div>
        </div>
        {/* End Temporary Reminder Box */}

        <ul className="space-y-6">
          {applications.map((app) => (
            <li key={app.id} className="border border-gray-200 p-5 sm:p-7 rounded-lg shadow-sm bg-white hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-grow mb-4 md:mb-0">
                <h2 className="font-semibold text-xl text-gray-800 mb-1 leading-tight">{app.project.title}</h2>
                <p className="text-gray-500 text-sm">Completed Project</p>
              </div>
              
              <div className="flex-shrink-0">
                {app.certificate?.url ? (
                  <a
                    // Using getCertificateUrl just in case, but ideally the backend saves it correctly
                    href={app.certificate.url} 
                    download={`${app.project.title.replace(/\s+/g, '-')}-Certificate.pdf`} // A cleaner filename for download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Download Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                  </a>
                ) : (
                  <p className="text-gray-500 text-sm md:text-right">Certificate not yet available. It will be generated once the project is closed.</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}