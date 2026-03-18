import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Assessment from './pages/Assessment';
import CareerReality from './pages/CareerReality';
import InsightsFeed from './pages/InsightsFeed';
import TrialMission from './pages/TrialMission';
import Community from './pages/Community';
import StudentDashboard from './pages/StudentDashboard';
import DecisionReport from './pages/DecisionReport';
import ParentReport from './pages/ParentReport';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/reality" element={<CareerReality />} />
          <Route path="/feed" element={<InsightsFeed />} />
          <Route path="/mission" element={<TrialMission />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/student-report" element={<DecisionReport />} />
          <Route path="/parent-report" element={<ParentReport />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
