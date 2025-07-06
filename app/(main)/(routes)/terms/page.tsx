import { Header } from "../(root)/components";

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Dexpert</strong>, a platform designed to connect small and medium-sized businesses (SMEs) with students or individuals seeking real-world experience through projects. By accessing and using our platform, you agree to the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Intermediary Role</h2>
      <p className="mb-4">
        Dexpert acts solely as a digital intermediary between PYMEs and applicants. We provide the tools and interface to help both parties discover and connect with each other through published projects. However, Dexpert is not responsible for any communication, coordination, or collaboration that takes place between users outside the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. No Personal Interaction Enforcement</h2>
      <p className="mb-4">
        Dexpert does not facilitate or require in-person meetings, messaging, calls, or any direct communication between PYMEs and applicants. All interactions are at the discretion and responsibility of the involved users. We strongly recommend maintaining professionalism and safety in all forms of communication.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Content Responsibility</h2>
      <p className="mb-4">
        The content of each project, including descriptions, requirements, deadlines, and any attached media, is solely the responsibility of the publishing SME. Dexpert does not verify, endorse, or guarantee the accuracy or legality of any user-generated content.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Code of Conduct</h2>
      <p className="mb-4">
        All users must interact respectfully and ethically. Harassment, discrimination, or misuse of the platform in any form is strictly prohibited. Any violations may result in account suspension or permanent removal from the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Disclaimer</h2>
      <p className="mb-4">
        Dexpert does not assume any liability for project outcomes, missed expectations, or disputes between parties. We do not intervene in the relationships or results that arise from project collaborations.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Updates</h2>
      <p className="mb-4">
        These terms may be updated periodically. Continued use of Dexpert implies acceptance of the most current version of our terms and conditions.
      </p>

      <p className="mt-10 text-sm text-gray-500">
        Last updated: July 6, 2025
      </p>
    </div>
    </>
  );
}
