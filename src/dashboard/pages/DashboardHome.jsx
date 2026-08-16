import React from 'react';
import { Link } from 'react-router-dom';
import { SECTION_SCHEMAS, ITEM_SCHEMAS } from '../schemas';

export default function DashboardHome() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="font-serif text-3xl text-gray-900 mb-2">Welcome back</h1>
      <p className="text-gray-500 mb-8">Pick a section or collection on the left to start editing. Changes go live on the site within a few seconds of saving.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Sections</h2>
          <div className="space-y-2">
            {Object.entries(SECTION_SCHEMAS).map(([key, schema]) => (
              <Link key={key} to={`/dashboard/section/${key}`} className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-soft transition-all text-sm text-gray-700">
                {schema.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Collections</h2>
          <div className="space-y-2">
            {Object.entries(ITEM_SCHEMAS).map(([key, schema]) => (
              <Link key={key} to={`/dashboard/items/${key}`} className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-soft transition-all text-sm text-gray-700">
                {schema.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
