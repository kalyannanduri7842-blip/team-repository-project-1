import React, { useState } from 'react';
import { FileText, Plus, Trash2, Pin, Search, Tag, User } from 'lucide-react';
import { useActivityStore, useCustomerStore, useNotificationStore, useAuthStore } from '../../store';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils/formatters';

export const NotesPage: React.FC = () => {
  const { notes, addNote, togglePinNote, deleteNote } = useActivityStore();
  const customers = useCustomerStore((s) => s.customers);
  const user = useAuthStore((s) => s.user);
  const showSuccess = useNotificationStore((s) => s.showSuccess);

  const [search, setSearch] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [tags, setTags] = useState('Executive, Strategy');

  const filteredNotes = notes.filter((n) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        (n.title && n.title.toLowerCase().includes(q)) ||
        n.content.toLowerCase().includes(q) ||
        n.relatedToName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Sort pinned first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    const cust = customers.find((c) => c.id === customerId) || customers[0];
    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);

    addNote({
      title: title || undefined,
      content,
      isPinned: false,
      relatedToType: 'customer',
      relatedToId: cust?.id || 'cust_default',
      relatedToName: cust?.name || 'Enterprise Account',
      tags: tagsArray,
      ownerId: user?.id || 'usr_sales',
      ownerName: user?.name || 'Sarah Chen',
    });

    showSuccess('Smart note created successfully');
    setTitle('');
    setContent('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-forest-700" />
            <span>Smart Notes Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Capture unstructured intelligence, pin critical requirements, and associate notes with accounts.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Note
        </Button>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search notes content or target..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <span className="text-xs text-slate-400">{sortedNotes.length} notes</span>
      </div>

      {/* Notes Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNotes.length === 0 ? (
          <div className="col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-12 text-center text-xs text-slate-400">
            No notes found.
          </div>
        ) : (
          sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-5 shadow-xs flex flex-col justify-between transition-all ${
                note.isPinned
                  ? 'border-amber-400/80 dark:border-amber-500/50 ring-1 ring-amber-400/30'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800 dark:text-peach-400 truncate">
                    {note.relatedToName}
                  </span>
                  <button
                    onClick={() => togglePinNote(note.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      note.isPinned ? 'text-amber-500 hover:text-amber-600' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title={note.isPinned ? 'Unpin' : 'Pin to top'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                </div>

                {note.title && (
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    {note.title}
                  </h3>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                  {note.content}
                </p>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 mb-3">
                    {note.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                <span>{formatDate(note.createdAt, 'medium')}</span>
                <button
                  onClick={() => {
                    deleteNote(note.id);
                    showSuccess('Note deleted');
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Note Modal */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Smart Note">
        <form onSubmit={handleCreateNote} className="space-y-4">
          <Input
            label="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Legal Compliance Requirements"
          />
          <Select
            label="Related Account"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            options={customers.map((c) => ({ value: c.id, label: c.name }))}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Content *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note text..."
              className="block w-full rounded-xl text-sm bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 p-3 focus:outline-none focus:ring-2 focus:ring-peach-500"
            />
          </div>
          <Input
            label="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Executive, Q4, RFP"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Note
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
