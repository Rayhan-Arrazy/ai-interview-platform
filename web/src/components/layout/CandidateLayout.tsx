import { Outlet } from "react-router-dom";
import CandidateHeader from "./CandidateHeader";

export default function CandidateLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <CandidateHeader />

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
