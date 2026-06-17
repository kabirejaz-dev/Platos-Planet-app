import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  Check,
  Plus,
  Trash2,
  AlertCircle,
  FileText,
  Calendar,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  Info,
  Sliders,
  Sparkles,
  Award,
  Link,
  BookOpen
} from 'lucide-react';
import { FormField, FormSchema, RubricCriteria, getSubjectFields, getCurriculumFields } from './FormSchemaEngine';

interface DynamicFormRendererProps {
  schema: FormSchema;
  initialValues?: any;
  currentRole: string;
  assignedSubjects?: string[];
  selectedSubject?: string;
  selectedCurriculum?: string;
  selectedGrade?: string;
  selectedBatch?: string;
  onSubmitSuccess: (formData: any) => void;
  onCancel: () => void;
}

export default function DynamicFormRenderer({
  schema,
  initialValues = {},
  currentRole,
  assignedSubjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Business', 'Accounting', 'Computer Science'],
  selectedSubject: defaultSubject = 'Physics',
  selectedCurriculum: defaultCurriculum = 'British',
  selectedGrade: defaultGrade = 'Grade 10',
  selectedBatch: defaultBatch = 'Batch A (Marina Heights)',
  onSubmitSuccess,
  onCancel
}: DynamicFormRendererProps) {
  // Context Overrides State (allows users to play with inputs in real time)
  const [ctxRole, setCtxRole] = useState(currentRole);
  const [ctxSubject, setCtxSubject] = useState(defaultSubject);
  const [ctxCurriculum, setCtxCurriculum] = useState(defaultCurriculum);
  const [ctxGrade, setCtxGrade] = useState(defaultGrade);
  const [ctxBatch, setCtxBatch] = useState(defaultBatch);

  // Form Value states
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Rubric builder state
  const [rubricRows, setRubricRows] = useState<RubricCriteria[]>([
    { criteria: 'Technical Depth', marks: 10, description: 'Correct formula, units and scientific rationale.' },
    { criteria: 'Structuring & Clarity', marks: 10, description: 'Cohesive, step-by-step methods outlined.' }
  ]);

  // Sync schema and contexts
  useEffect(() => {
    // Collect all fields from basic schema, subject specific, and curriculum specific
    const defaultData: Record<string, any> = {};
    const allFields = [...schema.fields, ...getSubjectFields(ctxSubject), ...getCurriculumFields(ctxCurriculum)];
    
    allFields.forEach(field => {
      if (initialValues[field.name] !== undefined) {
        defaultData[field.name] = initialValues[field.name];
      } else if (field.defaultValue !== undefined) {
        defaultData[field.name] = field.defaultValue;
      } else if (field.type === 'toggle') {
        defaultData[field.name] = false;
      } else if (field.type === 'multiselect') {
        defaultData[field.name] = [];
      } else {
        defaultData[field.name] = '';
      }
    });

    setFormData(defaultData);
    setErrors({});
  }, [schema, ctxSubject, ctxCurriculum]);

  // Determine if a role is permitted
  const hasPermission = schema.rolePermissions.includes(ctxRole) || ctxRole === 'Super Admin';

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Basic validation engine
  const handleValidate = () => {
    const newErrors: Record<string, string> = {};
    const allFields = [...schema.fields, ...getSubjectFields(ctxSubject), ...getCurriculumFields(ctxCurriculum)];

    allFields.forEach(field => {
      const val = formData[field.name];
      if (field.required && (val === undefined || val === '' || (Array.isArray(val) && val.length === 0))) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.type === 'number' && val !== undefined && val !== '') {
        const num = Number(val);
        if (field.validation?.min !== undefined && num < field.validation.min) {
          newErrors[field.name] = `${field.label} must be at least ${field.validation.min}`;
        }
        if (field.validation?.max !== undefined && num > field.validation.max) {
          newErrors[field.name] = `${field.label} cannot exceed ${field.validation.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasPermission) {
      setErrors({ global: `Permission Denied: Your active simulated role (${ctxRole}) does not have credential permission to submit "${schema.title}"` });
      return;
    }

    if (!handleValidate()) return;

    setSubmitting(true);

    // Dynamic submission values including context attributes
    const submissionPayload = {
      ...formData,
      meta_role: ctxRole,
      meta_subject: ctxSubject,
      meta_curriculum: ctxCurriculum,
      meta_grade: ctxGrade,
      meta_batch: ctxBatch,
      rubric: schema.fields.some(f => f.type === 'rubric') || getSubjectFields(ctxSubject).some(f => f.type === 'rubric') ? rubricRows : undefined,
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      setSubmitting(false);
      // Persist to localStorage for reliability
      try {
        const key = `plato_form_${schema.id}_history`;
        const history = JSON.parse(localStorage.getItem(key) || '[]');
        localStorage.setItem(key, JSON.stringify([submissionPayload, ...history]));
      } catch (err) {
        console.error("Local storage persistence failure: ", err);
      }

      onSubmitSuccess(submissionPayload);
    }, 1000);
  };

  // Filter subjects based on active simulated role limits (assignedSubjects)
  const isTeacher = ctxRole === 'Teacher';
  const filterSubjects = isTeacher ? assignedSubjects : ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Business', 'Accounting', 'Computer Science'];

  // Total rubric marks tally
  const totalRubricMarks = rubricRows.reduce((a, b) => a + Number(b.marks || 0), 0);

  return (
    <div className="space-y-6 text-slate-200">
      
      {/* Real-time Form Context Simulator Controls */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-inner">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-850">
          <Sliders className="w-4 h-4 text-brand-yellow" />
          <h4 className="text-xs font-black text-white uppercase tracking-wider">Form Schema Context Controller</h4>
          <span className="ml-auto text-[9px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded-full font-mono">LIVE DEMO</span>
        </div>
        <p className="text-[10px] text-slate-400">
          Modify the dropdowns below to see the **Form Schema Engine** inject appropriate fields (e.g., Physics equations vs. Chemistry safety notes vs. IGCSE borders) in real time.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Simulated Role</label>
            <select
              value={ctxRole}
              onChange={(e) => {
                setCtxRole(e.target.value);
                // Adjust default subject if Teacher
                if (e.target.value === 'Teacher' && !assignedSubjects.includes(ctxSubject)) {
                  setCtxSubject(assignedSubjects[0]);
                }
              }}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-white focus:border-indigo-500 focus:outline-none"
            >
              {['Super Admin', 'Branch Admin', 'Sales', 'Teacher', 'Student', 'Parent', 'Academic Coordinator', 'Finance Manager'].map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Curriculum</label>
            <select
              value={ctxCurriculum}
              onChange={(e) => setCtxCurriculum(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-white focus:border-indigo-505 focus:outline-none"
            >
              {['British', 'CBSE', 'A-Level'].map(curr => (
                <option key={curr} value={curr}>{curr === 'British' ? 'British IGCSE' : curr}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Grade</label>
            <select
              value={ctxGrade}
              onChange={(e) => setCtxGrade(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-white focus:border-indigo-505 focus:outline-none"
            >
              {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Academic Subject</label>
            <select
              value={ctxSubject}
              onChange={(e) => setCtxSubject(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-white focus:border-indigo-505 focus:outline-none"
            >
              {filterSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block mb-1">Allocated Batch</label>
            <select
              value={ctxBatch}
              onChange={(e) => setCtxBatch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-1.5 text-[11px] text-white focus:border-indigo-505 focus:outline-none"
            >
              {['Batch A (Marina Heights)', 'Batch B (Qusais Express)', 'Global Remote IGCSE', 'CBSE 10th Intensive'].map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Security / Assignment Check Indicator */}
        <div className="flex items-center gap-2 pt-1.5 text-[10px]">
          {hasPermission ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Simulated Role Permitted
            </span>
          ) : (
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Simulated Role Unauthorized
            </span>
          )}
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">
            Subject Isolation: <strong className="text-amber-400">{isTeacher ? `Teacher scope (restricted to Physics/Chemistry)` : `All Subjects Accessible`}</strong>
          </span>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <h3 className="text-md font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" /> {schema.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{schema.description}</p>
        </div>

        {errors.global && (
          <div className="bg-rose-950/50 border border-rose-900/50 p-3 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-rose-300 font-semibold">{errors.global}</p>
          </div>
        )}

        {/* Render Form Fields Divided into Sections */}
        {/* SECTION 1: Core / General Fields */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 pb-1 border-b border-slate-850">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest font-mono">1. Standard Core Parameters</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schema.fields.map(field => (
              <div key={field.name} className={field.type === 'richtext' || field.type === 'rubric' ? 'md:col-span-2' : ''}>
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-extrabold block mb-1">
                  {field.label} {field.required && <span className="text-rose-400">*</span>}
                </label>
                {renderInputField(field)}
                {errors[field.name] && <p className="text-[10px] text-rose-400 mt-1 font-semibold">{errors[field.name]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Dynamic Subject Specific Fields */}
        {getSubjectFields(ctxSubject).length > 0 && (
          <div className="space-y-4 pt-3">
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-850">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest font-mono">2. Dynamic Subject Specs: {ctxSubject} Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getSubjectFields(ctxSubject).map(field => (
                <div key={field.name} className={field.type === 'richtext' || field.type === 'rubric' ? 'md:col-span-2' : ''}>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-extrabold block mb-1">
                    {field.label} {field.required && <span className="text-rose-400">*</span>}
                  </label>
                  {renderInputField(field)}
                  {errors[field.name] && <p className="text-[10px] text-rose-400 mt-1 font-semibold">{errors[field.name]}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: Dynamic Curriculum Specific Fields */}
        {getCurriculumFields(ctxCurriculum).length > 0 && (
          <div className="space-y-4 pt-3">
            <div className="flex items-center gap-1.5 pb-1 border-b border-slate-850">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">3. Real-Time Curriculum Sync: {ctxCurriculum} Board Pattern</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getCurriculumFields(ctxCurriculum).map(field => (
                <div key={field.name} className={field.type === 'richtext' || field.type === 'rubric' ? 'md:col-span-2' : ''}>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-extrabold block mb-1">
                    {field.label} {field.required && <span className="text-rose-400">*</span>}
                  </label>
                  {renderInputField(field)}
                  {errors[field.name] && <p className="text-[10px] text-rose-400 mt-1 font-semibold">{errors[field.name]}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Controls Block */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-850">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Cancel Actions
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-lg transition ${
              hasPermission 
                ? 'bg-indigo-400 text-slate-950 hover:bg-indigo-300' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
            }`}
          >
            {submitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Validation schemas...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" /> Save Context-Aware Record
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  // Core field component rendering function
  function renderInputField(field: FormField) {
    const value = formData[field.name];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || 'Type text value...'}
            value={value || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-505 placeholder-slate-600 transition"
          />
        );

      case 'number':
        return (
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-1">
            <input
              type="number"
              placeholder={field.placeholder || '0'}
              value={value === undefined ? '' : value}
              onChange={(e) => handleFieldChange(field.name, e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full bg-transparent p-3 text-xs text-white focus:outline-none placeholder-slate-600 border-none"
            />
            <div className="flex flex-col border-l border-slate-800 pr-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const valNum = Number(value || 0);
                  const max = field.validation?.max;
                  if (max === undefined || valNum < max) handleFieldChange(field.name, valNum + 1);
                }}
                className="p-1 text-slate-500 hover:text-white transition"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="relative">
            <select
              value={value || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-505 appearance-none cursor-pointer"
            >
              <option value="" disabled>Select an option...</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt} className="bg-slate-950 text-white">{opt}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        );

      case 'multiselect':
        const selectedList = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-950 border border-slate-800 rounded-xl min-h-11">
              {selectedList.length === 0 ? (
                <span className="text-[11px] text-slate-600 p-1 font-medium">No selected criteria yet. Choose below.</span>
              ) : (
                selectedList.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => {
                      const updated = selectedList.filter((x: string) => x !== tag);
                      handleFieldChange(field.name, updated);
                    }}
                    className="inline-flex items-center gap-1 bg-indigo-500/20 hover:bg-rose-500/25 border border-indigo-400/20 text-indigo-300 hover:text-rose-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-full cursor-pointer transition"
                  >
                    {tag} <span className="text-[8px] opacity-75">✕</span>
                  </span>
                ))
              )}
            </div>
            {/* Options list checkboxes */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-900 max-h-36 overflow-y-auto">
              {field.options?.map((opt) => {
                const isSelected = selectedList.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const updated = isSelected
                        ? selectedList.filter((x: string) => x !== opt)
                        : [...selectedList, opt];
                      handleFieldChange(field.name, updated);
                    }}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[10.5px] text-left transition ${
                      isSelected
                        ? 'bg-indigo-500/10 border-indigo-500 text-white'
                        : 'bg-transparent border-slate-850 text-slate-400 hover:border-slate-750'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      isSelected ? 'bg-indigo-500 border-indigo-400' : 'border-slate-600'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 text-slate-950 stroke-[4]" />}
                    </span>
                    <span className="truncate">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="relative">
            <span className="absolute left-3.5 top-3.5 pl-0.5 pointer-events-none">
              <Calendar className="w-4 h-4 text-indigo-400" />
            </span>
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-11 text-xs text-white focus:outline-none focus:border-indigo-505 cursor-pointer appearance-none"
            />
          </div>
        );

      case 'file':
        return <InteractiveFileUploader fieldName={field.name} value={value} onChange={handleFieldChange} />;

      case 'richtext':
        return <RichTextSimulator fieldName={field.name} value={value} onChange={handleFieldChange} placeholder={field.placeholder} />;

      case 'toggle':
        const isToggleOn = !!value;
        return (
          <button
            type="button"
            onClick={() => handleFieldChange(field.name, !isToggleOn)}
            className="flex items-center gap-2.5 bg-slate-950/45 p-2 rounded-xl border border-slate-800 transition text-left w-full hover:border-slate-750"
          >
            <span className="cursor-pointer">
              {isToggleOn ? (
                <ToggleRight className="w-9 h-9 text-indigo-400 stroke-[1.5]" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-slate-6 stroke-[1.5]" />
              )}
            </span>
            <div>
              <p className="text-[11px] font-bold text-white">{isToggleOn ? 'Enabled' : 'Disabled'}</p>
              <p className="text-[9.5px] text-slate-500">Configure parameters status</p>
            </div>
          </button>
        );

      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {field.options?.map((opt) => {
              const matches = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleFieldChange(field.name, opt)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 transition relative overflow-hidden ${
                    matches
                      ? 'bg-indigo-500/10 border-indigo-400 shadow-lg shadow-indigo-500/5'
                      : 'bg-slate-950 border-slate-850 hover:bg-slate-900/40'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wide text-slate-500 font-extrabold">SELECTION</span>
                  <p className="text-xs font-bold text-white leading-tight mt-1">{opt}</p>
                  
                  {matches && (
                    <span className="absolute top-2 right-2 bg-indigo-500 text-slate-950 p-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        );

      case 'rubric':
        return (
          <div className="space-y-3 bg-slate-950 rounded-2xl border border-slate-850 p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block">Grading Metric Builder</span>
                <p className="text-xs font-bold text-white">Subject Criteria Table</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRubricRows([...rubricRows, { criteria: 'New Criteria', marks: 5, description: 'Enter specific benchmarks expectations here.' }]);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-400 text-[10px] font-extrabold rounded-lg hover:text-white transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Score Row
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-850">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-2.5">Grading Aspect / Parameters</th>
                    <th className="p-2.5 w-24">Marks</th>
                    <th className="p-2.5">Specific Guidelines expectations</th>
                    <th className="p-2.5 w-12 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {rubricRows.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-950/80">
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={row.criteria}
                          onChange={(e) => {
                            const updated = [...rubricRows];
                            updated[index].criteria = e.target.value;
                            setRubricRows(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-[11px] text-white p-1.5 rounded focus:outline-none"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={row.marks}
                          onChange={(e) => {
                            const updated = [...rubricRows];
                            updated[index].marks = Number(e.target.value || 0);
                            setRubricRows(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-[11px] text-white p-1.5 rounded focus:outline-none"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={row.description}
                          onChange={(e) => {
                            const updated = [...rubricRows];
                            updated[index].description = e.target.value;
                            setRubricRows(updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 p-1.5 rounded focus:outline-none"
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            if (rubricRows.length > 1) {
                              setRubricRows(rubricRows.filter((_, idx) => idx !== index));
                            }
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1.5 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between pt-1 border-t border-slate-850 text-xs font-bold bg-slate-900/30 p-2 rounded-xl">
              <span className="text-slate-400">Sum Of All Aspect Rubric Marks:</span>
              <span className="text-white bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-lg text-xs font-mono font-black">
                {totalRubricMarks} TOTAL MARKS
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  }
}

// Subcomponent: FILE UPLOADER WITH DRAG DROP AND PROGRESS ANIMATION
function InteractiveFileUploader({
  fieldName,
  value,
  onChange
}: {
  fieldName: string;
  value: any;
  onChange: (name: string, val: any) => void;
}) {
  const [dragActive, setDragActive] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'finished'>('idle');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (value) {
      setUploadState('finished');
      setFileName(typeof value === 'string' ? value : value.name || 'uploaded_document.pdf');
    }
  }, [value]);

  const triggerUpload = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    setFileName(file.name);
    setUploadState('uploading');
    setPercentage(0);

    // Mock progress calculation
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('finished');
          onChange(fieldName, { name: file.name, size: (file.size / 1024).toFixed(1) + ' KB' });
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      triggerUpload(e.dataTransfer.files);
    }
  };

  const resetUpload = () => {
    setUploadState('idle');
    setPercentage(0);
    setFileName('');
    onChange(fieldName, '');
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative w-full rounded-2xl border-2 border-dashed p-6 text-center transition flex flex-col items-center justify-center min-h-36 ${
        dragActive
          ? 'bg-indigo-500/5 border-indigo-400'
          : uploadState === 'finished'
          ? 'bg-emerald-500/3 border-emerald-500/40'
          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
      }`}
    >
      {uploadState === 'idle' && (
        <label className="cursor-pointer space-y-2 flex flex-col items-center">
          <UploadCloud className="w-8 h-8 text-slate-500" />
          <div>
            <p className="text-xs font-bold text-white">Drag worksheet PDF/Image files here or click to browse</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Supports: PDF, XLSX, DOCX, PNG up to 10MB</p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) triggerUpload(e.target.files);
            }}
          />
        </label>
      )}

      {uploadState === 'uploading' && (
        <div className="w-full space-y-3 px-6">
          <p className="text-xs font-bold text-white animate-pulse">Hashing and Syncing into Cloud Vault...</p>
          <div className="relative h-2 bg-slate-900 rounded-full overflow-hidden w-full">
            <div
              className="bg-indigo-400 h-full transition-all duration-150 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400">{percentage}%</span>
        </div>
      )}

      {uploadState === 'finished' && (
        <div className="space-y-3 flex flex-col items-center w-full">
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-full text-emerald-400">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <div className="max-w-xs truncate">
            <p className="text-xs font-bold text-white truncate">{fileName}</p>
            <p className="text-[9px] text-emerald-400 uppercase font-mono font-black mt-0.5">VAULT SYNCED SUCCESSFULLY</p>
          </div>
          <button
            type="button"
            onClick={resetUpload}
            className="text-[9.5px] uppercase font-mono tracking-wider font-extrabold text-slate-500 hover:text-rose-400 transition"
          >
            Clear and Reupload
          </button>
        </div>
      )}
    </div>
  );
}

// Subcomponent: RICH TEXT SIMULATOR TOOLBAR
function RichTextSimulator({
  fieldName,
  value,
  onChange,
  placeholder
}: {
  fieldName: string;
  value: any;
  onChange: (name: string, val: any) => void;
  placeholder?: string;
}) {
  const [styleActive, setStyleActive] = useState<Record<string, boolean>>({});

  const toggleStyle = (style: string) => {
    setStyleActive((p) => ({ ...p, [style]: !p[style] }));
  };

  const insertPreset = (text: string) => {
    const currentText = typeof value === 'string' ? value : '';
    onChange(fieldName, currentText ? `${currentText}\n* ${text}` : `* ${text}`);
  };

  return (
    <div className="space-y-1.5 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden focus-within:border-indigo-505 transition">
      {/* Mini Bar */}
      <div className="bg-slate-900 p-2 border-b border-slate-850 flex flex-wrap items-center gap-1">
        {['B', 'I', 'U'].map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => toggleStyle(style)}
            className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition ${
              styleActive[style] ? 'bg-indigo-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {style}
          </button>
        ))}
        <span className="h-4 w-px bg-slate-800 mx-1.5" />
        {/* Preset quick blocks */}
        <button
          type="button"
          onClick={() => insertPreset('Syllabus reference mapping checked.')}
          className="px-2.5 py-1 text-[9.5px] bg-slate-950 hover:bg-indigo-500/10 border border-slate-850 hover:border-indigo-400/20 text-slate-400 hover:text-indigo-300 rounded font-black transition cursor-pointer"
        >
          + Syllabus Tag
        </button>
        <button
          type="button"
          onClick={() => insertPreset('Requires strict step work markings.')}
          className="px-2.5 py-1 text-[9.5px] bg-slate-950 hover:bg-amber-500/10 border border-slate-850 hover:border-amber-400/20 text-slate-400 hover:text-amber-300 rounded font-black transition cursor-pointer"
        >
          + Mark Guideline
        </button>
        <button
          type="button"
          onClick={() => insertPreset('Lab goggles and coats must be styled.')}
          className="px-2.5 py-1 text-[9.5px] bg-slate-950 hover:bg-emerald-500/10 border border-slate-850 hover:border-emerald-400/20 text-slate-400 hover:text-emerald-300 rounded font-black transition cursor-pointer"
        >
          + Safety Rules
        </button>
      </div>

      <textarea
        placeholder={placeholder || 'Propose curriculum summaries, outline steps criteria, or append feedback logs here...'}
        value={value || ''}
        rows={4}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className="w-full bg-transparent p-3 text-xs text-white placeholder-slate-600 focus:outline-none border-none resize-y"
      />
    </div>
  );
}
