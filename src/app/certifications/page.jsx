import { Suspense } from "react";
import CertificationsPage from "../../components/certifications/CertificationsPage.jsx";

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>
      <CertificationsPage />
    </Suspense>
  );
};

export default Page;
