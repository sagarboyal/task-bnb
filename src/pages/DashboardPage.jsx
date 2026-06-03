import React from "react";
import { useSession } from "../contexts/SessionContext";
import SetupModal from "../features/auth/components/SetupModal";

export default function DashboardPage() {
  const { isSetupComplete, completeSetup } = useSession();

  if (!isSetupComplete) {
    return <SetupModal onSubmit={(data) => completeSetup(data)} />;
  }

  return <div className="p-6">Home page</div>;
}
