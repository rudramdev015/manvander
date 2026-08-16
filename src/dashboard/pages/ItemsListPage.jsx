import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Plus, Trash2, ChevronDown, ChevronUp, Save, Loader2, GripVertical } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { createItem, updateItem, deleteItem, reorderItems } from '@/lib/api';
import { ITEM_SCHEMAS } from '../schemas';
import Field from '../components/Field';

function ItemCard({ item, schema, collection, isOpen, onToggle, onSaved, onDeleted, onMove, isFirst, isLast }) {
  const [formData, setFormData] = useState(item);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setFormData(item); }, [item]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const saved = item.id
        ? await updateItem(collection, item.id, formData)
        : await createItem(collection, formData);
      onSaved(saved);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!item.id) { onDeleted(item); return; }
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await deleteItem(collection, item.id);
      onDeleted(item);
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
          <GripVertical className="w-4 h-4 text-gray-300" />
          {schema.summary(formData)}
        </span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-100">
          {schema.fields.map((field) => (
            <Field key={field.name} field={field} formData={formData} setFormData={setFormData} />
          ))}

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onMove(-1)}
                disabled={isFirst}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove(1)}
                disabled={isLast}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" /> {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 transition-colors disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ItemsListPage() {
  const { collection } = useParams();
  const schema = ITEM_SCHEMAS[collection];
  const { content, refreshContent } = useCMS();

  const [items, setItems] = useState(content[collection] || []);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    setItems(content[collection] || []);
    setOpenId(null);
  }, [collection]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!schema) return <Navigate to="/dashboard" replace />;

  const addNew = () => {
    const draft = { id: null, order: items.length };
    setItems((prev) => [...prev, draft]);
    setOpenId('new');
  };

  const handleSaved = async (savedItem, index) => {
    const next = [...items];
    next[index] = savedItem;
    setItems(next);
    setOpenId(savedItem.id);
    await refreshContent();
  };

  const handleDeleted = async (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setOpenId(null);
    await refreshContent();
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    const ids = next.map((i) => i.id).filter(Boolean);
    if (ids.length === next.length) {
      await reorderItems(collection, ids);
      await refreshContent();
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-gray-900">{schema.label}</h1>
        <button
          type="button"
          onClick={addNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const cardKey = item.id || 'new';
          return (
            <ItemCard
              key={cardKey}
              item={item}
              schema={schema}
              collection={collection}
              isOpen={openId === cardKey}
              onToggle={() => setOpenId(openId === cardKey ? null : cardKey)}
              onSaved={(saved) => handleSaved(saved, index)}
              onDeleted={() => handleDeleted(index)}
              onMove={(dir) => move(index, dir)}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          );
        })}
        {items.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-12">Nothing here yet - click "Add New" to create the first one.</p>
        )}
      </div>
    </div>
  );
}
