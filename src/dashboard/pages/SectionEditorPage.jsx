import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { saveSection } from '@/lib/api';
import { SECTION_SCHEMAS } from '../schemas';
import Field from '../components/Field';

export default function SectionEditorPage() {
  const { key } = useParams();
  const schema = SECTION_SCHEMAS[key];
  const { content, refreshContent } = useCMS();

  const [formData, setFormData] = useState(content[key] || {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData(content[key] || {});
    setSaved(false);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!schema) return <Navigate to="/dashboard" replace />;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await saveSection(key, formData);
      await refreshContent();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif text-2xl text-gray-900 mb-6">{schema.label}</h1>

      <form onSubmit={handleSave}>
        {schema.fields.map((field) => (
          <Field key={field.name} field={field} formData={formData} setFormData={setFormData} />
        ))}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
