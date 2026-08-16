import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SECTION_SCHEMAS, ITEM_SCHEMAS } from '../schemas';

const navLinkClass = ({ isActive }) =>
  `block px-3 py-2 rounded-lg text-sm transition-colors ${
    isActive ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`;

export default function DashboardLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 border-b border-gray-100">
          <span className="font-serif text-xl italic text-gray-900">House <span className="text-primary-500">of Echoes</span></span>
          <p className="text-xs text-gray-400 mt-0.5">Content Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">Sections</p>
            <div className="space-y-0.5">
              {Object.entries(SECTION_SCHEMAS).map(([key, schema]) => (
                <NavLink key={key} to={`/dashboard/section/${key}`} className={navLinkClass}>
                  {schema.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1.5">Collections</p>
            <div className="space-y-0.5">
              {Object.entries(ITEM_SCHEMAS).map(([key, schema]) => (
                <NavLink key={key} to={`/dashboard/items/${key}`} className={navLinkClass}>
                  {schema.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <ExternalLink className="w-4 h-4" /> View Site
          </a>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
            <LogOut className="w-4 h-4" /> Log Out {admin?.email ? `(${admin.email})` : ''}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
