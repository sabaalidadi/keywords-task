// src/App.jsx
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import PublicView from './components/PublicView';
import Dashboard from './components/Dashboard';

function App() {
  const getNavLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-white text-sky-600 shadow-sm font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
    }`;

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-sky-600 text-white rounded-lg shadow-sm">
              🌐
            </span>

            <h1 className="text-xl font-bold text-slate-900">
              سامانه مدیریت ترجمه کلیدواژه‌ها
            </h1>
          </div>

          <nav className="flex items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-xl">
            <NavLink to="/" className={getNavLinkClass} end>
              نمای عمومی
            </NavLink>

            <NavLink to="/dashboard" className={getNavLinkClass}>
              داشبورد مدیریت
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<PublicView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
