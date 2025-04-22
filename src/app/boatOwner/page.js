// app/boatOwner/page.js
import { Suspense } from "react";
import DashboardContent from "../components/BoatOwnerDashboard";

export default function BoatOwnerPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}