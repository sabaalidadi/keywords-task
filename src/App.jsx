import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import PublicView from "./components/PublicView";
import Dashboard from "./components/Dashboard";
import { Toaster } from "react-hot-toast";

import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";

function App() {
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-md text-sm transition-colors ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-500 hover:text-slate-900"
    }`;

  // localStorage.removeItem('keywords')
  
  return (
    <>
      <div dir="rtl" className="min-h-screen bg-white text-slate-800">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <header className="h-20 flex items-center justify-between border-b border-slate-100">
            <h1 className="text-base font-semibold text-slate-900">
              مدیریت ترجمه
            </h1>

            <nav className="flex items-center gap-1">
              <NavLink to="/" className={getNavLinkClass} end>
                عمومی
              </NavLink>

              <NavLink to="/dashboard" className={getNavLinkClass}>
                مدیریت
              </NavLink>
            </nav>
          </header>

          <main className="py-8">
            <Routes>
              <Route path="/" element={<PublicView />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;
