import React, { useState } from 'react';
import { Upload, X, Plus, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/api';
import { getPath, setPath } from '../utils';

const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

function FieldWrapper({ label, children }) {
  return (
    <div className="mb-5">
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function UploadButton({ value, onChange, accept, isVideo = false }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const result = await uploadFile(file);
      onChange(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      {value && (
        isVideo ? (
          <video src={value} controls className="w-full max-w-xs rounded-lg mb-2 border border-gray-200" />
        ) : (
          <img src={value} alt="" className="w-32 h-32 object-cover rounded-lg mb-2 border border-gray-200" />
        )
      )}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/image/example.jpg or paste a URL"
          className={inputClass}
        />
        <label className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" accept={accept} className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ListImagesField({ value = [], onChange }) {
  const images = value || [];
  const update = (index, url) => {
    const next = [...images];
    next[index] = url;
    onChange(next);
  };
  const move = (index, dir) => {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const remove = (index) => onChange(images.filter((_, i) => i !== index));

  return (
    <div className="space-y-3">
      {images.map((url, index) => (
        <div key={index} className="flex items-start gap-2 p-3 border border-gray-200 rounded-lg">
          <div className="flex-1">
            <UploadButton value={url} onChange={(v) => update(index, v)} accept="image/*" />
          </div>
          <div className="flex flex-col gap-1">
            <button type="button" onClick={() => move(index, -1)} className="p-1 hover:bg-gray-100 rounded"><ChevronUp className="w-4 h-4" /></button>
            <button type="button" onClick={() => move(index, 1)} className="p-1 hover:bg-gray-100 rounded"><ChevronDown className="w-4 h-4" /></button>
            <button type="button" onClick={() => remove(index)} className="p-1 hover:bg-red-50 text-red-500 rounded"><X className="w-4 h-4" /></button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...images, ''])}
        className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        <Plus className="w-4 h-4" /> Add Image
      </button>
    </div>
  );
}

function NestedListStringsField({ value = [], onChange }) {
  const groups = value || [];
  const update = (index, text) => {
    const next = [...groups];
    next[index] = text.split(',').map((s) => s.trim()).filter(Boolean);
    onChange(next);
  };
  const remove = (index) => onChange(groups.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400">Comma-separated. Each row shows as its own row of pills.</p>
      {groups.map((group, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            defaultValue={(group || []).join(', ')}
            onBlur={(e) => update(index, e.target.value)}
            className={inputClass}
          />
          <button type="button" onClick={() => remove(index)} className="p-2 hover:bg-red-50 text-red-500 rounded flex-shrink-0"><X className="w-4 h-4" /></button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...groups, []])}
        className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        <Plus className="w-4 h-4" /> Add Row
      </button>
    </div>
  );
}

function ListObjectsField({ value = [], onChange, subFields }) {
  const items = value || [];
  const updateItem = (index, name, fieldValue) => {
    const next = [...items];
    next[index] = { ...next[index], [name]: fieldValue };
    onChange(next);
  };
  const remove = (index) => onChange(items.filter((_, i) => i !== index));
  const empty = Object.fromEntries(subFields.map((f) => [f.name, '']));

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-3 right-3 p-1 hover:bg-red-50 text-red-500 rounded"
          >
            <X className="w-4 h-4" />
          </button>
          {subFields.map((sf) => (
            <FieldWrapper key={sf.name} label={sf.label}>
              {sf.type === 'textarea' ? (
                <textarea
                  rows={2}
                  value={item[sf.name] || ''}
                  onChange={(e) => updateItem(index, sf.name, e.target.value)}
                  className={inputClass}
                />
              ) : (
                <input
                  type="text"
                  value={item[sf.name] || ''}
                  onChange={(e) => updateItem(index, sf.name, e.target.value)}
                  className={inputClass}
                />
              )}
            </FieldWrapper>
          ))}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, empty])}
        className="inline-flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        <Plus className="w-4 h-4" /> Add
      </button>
    </div>
  );
}

/**
 * Renders one field per the schema definitions in schemas.js, reading and
 * writing through `formData`/`setFormData` at the field's (possibly dotted)
 * path.
 */
export default function Field({ field, formData, setFormData }) {
  const value = getPath(formData, field.name);
  const onChange = (v) => setFormData((prev) => setPath(prev, field.name, v));

  switch (field.type) {
    case 'textarea':
      return (
        <FieldWrapper label={field.label}>
          <textarea rows={4} value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
        </FieldWrapper>
      );
    case 'number':
      return (
        <FieldWrapper label={field.label}>
          <input type="number" value={value ?? ''} onChange={(e) => onChange(e.target.valueAsNumber)} className={inputClass} />
        </FieldWrapper>
      );
    case 'boolean':
      return (
        <FieldWrapper label={field.label}>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
            Yes
          </label>
        </FieldWrapper>
      );
    case 'select':
      return (
        <FieldWrapper label={field.label}>
          <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
            <option value="">Select...</option>
            {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </FieldWrapper>
      );
    case 'color':
      return (
        <FieldWrapper label={field.label}>
          <div className="flex items-center gap-2">
            <input type="color" value={value || '#A00000'} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded border border-gray-300 cursor-pointer" />
            <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
          </div>
        </FieldWrapper>
      );
    case 'image':
      return (
        <FieldWrapper label={field.label}>
          <UploadButton value={value} onChange={onChange} accept="image/*" />
        </FieldWrapper>
      );
    case 'video':
      return (
        <FieldWrapper label={field.label}>
          <UploadButton value={value} onChange={onChange} accept="video/*" isVideo />
        </FieldWrapper>
      );
    case 'list-images':
      return (
        <FieldWrapper label={field.label}>
          <ListImagesField value={value} onChange={onChange} />
        </FieldWrapper>
      );
    case 'nested-list-strings':
      return (
        <FieldWrapper label={field.label}>
          <NestedListStringsField value={value} onChange={onChange} />
        </FieldWrapper>
      );
    case 'list-objects':
      return (
        <FieldWrapper label={field.label}>
          <ListObjectsField value={value} onChange={onChange} subFields={field.subFields} />
        </FieldWrapper>
      );
    case 'text':
    default:
      return (
        <FieldWrapper label={field.label}>
          <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} />
        </FieldWrapper>
      );
  }
}
