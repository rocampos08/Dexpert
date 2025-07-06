import { Header } from "../(root)/components";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>Dexpert</strong>, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly, such as your name, email address, project details, and any other data you submit while using Dexpert.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          Your data is used to provide and improve our services, communicate important updates, and ensure the security of your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Sharing and Disclosure</h2>
        <p className="mb-4">
          We do not sell or share your personal information with third parties except where required by law or to provide our services (e.g., connecting students and PYMEs).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Security</h2>
        <p className="mb-4">
          We implement reasonable security measures to protect your data but cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information by contacting us.
        </p>

       

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Continued use of Dexpert after changes indicates your acceptance of the updated policy.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          Last updated: July 6, 2025
        </p>
      </div>
    </>
  );
}
