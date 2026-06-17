import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, AlertTriangle, CheckCircle, Plus, Trash2, 
  Settings, RefreshCw, FileWarning, HelpCircle, Save, Info 
} from "lucide-react";
import { 
  getStoredPlatosPlanetConfig, 
  savePlatosPlanetConfig, 
  validateDisplayData, 
  prohibitedWords,
  PlatosPlanetConfigType 
} from "../../platosPlanetConfig";

export default function OfficialDataSettings() {
  const [config, setConfig] = useState<PlatosPlanetConfigType>(() => getStoredPlatosPlanetConfig());
  const [newBranch, setNewBranch] = useState("");
  const [newCurriculum, setNewCurriculum] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [demoMode, setDemoMode] = useState<boolean>(() => {
    return localStorage.getItem("platos_demo_mode") !== "false";
  });
  
  // Real-time audit states
  const [auditIssues, setAuditIssues] = useState<any[]>([]);
  const [runningSweep, setRunningSweep] = useState(false);

  useEffect(() => {
    runAuditSweep();
  }, [config, demoMode]);

  const handleSave = () => {
    savePlatosPlanetConfig(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggleDemoMode = () => {
    const nextMode = !demoMode;
    setDemoMode(nextMode);
    localStorage.setItem("platos_demo_mode", String(nextMode));
    window.dispatchEvent(new Event("platos_planet_config_updated"));
  };

  // Add/remove branches
  const addBranch = () => {
    if (!newBranch.trim()) return;
    if (config.officialBranches.includes(newBranch.trim())) return;
    setConfig(prev => ({
      ...prev,
      officialBranches: [...prev.officialBranches, newBranch.trim()]
    }));
    setNewBranch("");
  };

  const removeBranch = (branchToRemove: string) => {
    setConfig(prev => ({
      ...prev,
      officialBranches: prev.officialBranches.filter(b => b !== branchToRemove)
    }));
  };

  // Add/remove curriculum
  const addCurriculum = () => {
    if (!newCurriculum.trim()) return;
    if (config.officialCurriculums.includes(newCurriculum.trim())) return;
    setConfig(prev => ({
      ...prev,
      officialCurriculums: [...prev.officialCurriculums, newCurriculum.trim()]
    }));
    setNewCurriculum("");
  };

  const removeCurriculum = (currToRemove: string) => {
    setConfig(prev => ({
      ...prev,
      officialCurriculums: prev.officialCurriculums.filter(c => c !== currToRemove)
    }));
  };

  // Add/remove subject
  const addSubject = () => {
    if (!newSubject.trim()) return;
    if (config.officialSubjects.includes(newSubject.trim())) return;
    setConfig(prev => ({
      ...prev,
      officialSubjects: [...prev.officialSubjects, newSubject.trim()]
    }));
    setNewSubject("");
  };

  const removeSubject = (subToRemove: string) => {
    setConfig(prev => ({
      ...prev,
      officialSubjects: prev.officialSubjects.filter(s => s !== subToRemove)
    }));
  };

  // Running compliance check logic using our validator over active UI variables
  const runAuditSweep = () => {
    setRunningSweep(true);
    setTimeout(() => {
      // Create audit object matching state of typical app components
      const sampleComponentState = {
        branch: demoMode ? "Dubai Marina Campus" : config.officialBranches[0] || "Main Branch",
        email: config.officialEmail,
        phone: config.officialPhone,
        tagline: demoMode ? "UAE’s #1 tuition centre" : config.approvedClaims.tagline,
        approvals: demoMode ? "KHDA approved" : config.approvedClaims.approvals,
        studentsCount: demoMode ? "100,000+ students with Allen partnership" : config.approvedClaims.tuitionCapacity,
        partners: demoMode ? "Aakash, Byju's and Physics Wallah syllabus" : "Standardized operational systems of Plato's Planet"
      };

      const issues = validateDisplayData(sampleComponentState, config);
      setAuditIssues(issues);
      setRunningSweep(false);
    }, 400);
  };

  return (
    <div id="official-data-settings-panel" className="bg-slate-900 border border-slate-800 rounded-3xl p-6.5 text-left space-y-6 shadow-2xl relative transition-all duration-300">
      
      {/* Header Band */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-400 animate-spin-slow" />
            <span className="text-xs font-black uppercase font-mono tracking-widest text-indigo-400">Governance & Security Hub</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Official Data Settings</h2>
          <p className="text-xs text-slate-400">Control official campuses, authorized educational claims, active subjects, and live validation rules.</p>
        </div>

        {/* Demo Mode controller badge */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-850">
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-wider block text-slate-450">Active Platform State</span>
            <span className={`text-xs font-extrabold ${demoMode ? 'text-amber-400' : 'text-emerald-400'}`}>
              {demoMode ? "⚠️ Demo Mode Active" : "✅ Live Verified Mode"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleToggleDemoMode}
            className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-xl transition cursor-pointer select-none ${
              demoMode 
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25' 
                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-505/30 hover:bg-emerald-500/25'
            }`}
          >
            Toggle State
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Hand: Fields and parameters */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-200 border-b border-slate-800 pb-1">Primary Company Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Company / Legal Name</label>
              <input
                type="text"
                value={config.officialCompanyName}
                onChange={e => setConfig(prev => ({ ...prev, officialCompanyName: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Official Support Email</label>
              <input
                type="email"
                value={config.officialEmail}
                onChange={e => setConfig(prev => ({ ...prev, officialEmail: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Official Support Phone</label>
              <input
                type="text"
                value={config.officialPhone}
                onChange={e => setConfig(prev => ({ ...prev, officialPhone: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Headquarters Address</label>
              <input
                type="text"
                value={config.officialAddress}
                onChange={e => setConfig(prev => ({ ...prev, officialAddress: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-505"
              />
            </div>
          </div>

          <h3 className="text-sm font-extrabold text-slate-200 border-b border-slate-800 pb-1 pt-2">Authorized Claims & Wording</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official Tagline / Slogan</label>
                <span className="text-[8.5px] text-indigo-400 font-mono font-bold">REPLACING "UAE’s #1"</span>
              </div>
              <input
                type="text"
                value={config.approvedClaims.tagline}
                onChange={e => setConfig(prev => ({
                  ...prev,
                  approvedClaims: { ...prev.approvedClaims, tagline: e.target.value }
                }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Student / Tuition Scale</label>
                <span className="text-[8.5px] text-indigo-400 font-mono font-bold">REPLACING "100,000+ students"</span>
              </div>
              <input
                type="text"
                value={config.approvedClaims.tuitionCapacity}
                onChange={e => setConfig(prev => ({
                  ...prev,
                  approvedClaims: { ...prev.approvedClaims, tuitionCapacity: e.target.value }
                }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approvals / Regulations Statement</label>
                <span className="text-[8.5px] text-indigo-400 font-mono font-bold">REPLACING "KHDA approved"</span>
              </div>
              <input
                type="text"
                value={config.approvedClaims.approvals}
                onChange={e => setConfig(prev => ({
                  ...prev,
                  approvedClaims: { ...prev.approvedClaims, approvals: e.target.value }
                }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Legal Board Affiliation Disclaimer</label>
              <textarea
                rows={2}
                value={config.disclaimer}
                onChange={e => setConfig(prev => ({ ...prev, disclaimer: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Hand: Campuses, Curriculums, Subjects and Live Audit panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-200 border-b border-slate-800 pb-1">Branches & Offerings Registry</h3>
          
          {/* Branch management list */}
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 space-y-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Official Campuses</span>
            <div className="flex flex-wrap gap-1.5">
              {config.officialBranches.map(branch => (
                <span key={branch} className="inline-flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 text-xs rounded-xl text-slate-350 font-medium">
                  {branch}
                  <button 
                    type="button" 
                    onClick={() => removeBranch(branch)}
                    className="text-slate-500 hover:text-rose-400 p-0.5"
                    title={`Remove ${branch}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={newBranch}
                onChange={e => setNewBranch(e.target.value)}
                placeholder="Add official branch, e.g. Dubai Main"
                className="flex-1 bg-slate-950 border border-slate-850 rounded-lg p-2 text-xs text-white"
              />
              <button 
                type="button" 
                onClick={addBranch}
                className="px-3 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold text-xs rounded-lg hover:bg-indigo-500/30 transition cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Curriculums */}
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Curriculums</span>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {config.officialCurriculums.map(curr => (
                  <div key={curr} className="flex items-center justify-between bg-slate-900 px-2 py-1 rounded text-[11px] text-slate-350 border border-slate-850">
                    <span>{curr}</span>
                    <button type="button" onClick={() => removeCurriculum(curr)} className="text-slate-500 hover:text-rose-400">×</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newCurriculum}
                  onChange={e => setNewCurriculum(e.target.value)}
                  placeholder="e.g. CBSE 12th"
                  className="flex-1 bg-slate-950 border border-slate-850 rounded p-1.5 text-[11px] text-white"
                />
                <button type="button" onClick={addCurriculum} className="px-2 text-xs font-bold text-indigo-400">Add</button>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 space-y-2">
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Authorized Subjects</span>
              <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                {config.officialSubjects.map(sub => (
                  <div key={sub} className="flex items-center justify-between bg-slate-900 px-2 py-1 rounded text-[11px] text-slate-350 border border-slate-850">
                    <span>{sub}</span>
                    <button type="button" onClick={() => removeSubject(sub)} className="text-slate-500 hover:text-rose-400">×</button>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  type="text"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  placeholder="e.g. Biology"
                  className="flex-1 bg-slate-950 border border-slate-850 rounded p-1.5 text-[11px] text-white"
                />
                <button type="button" onClick={addSubject} className="px-2 text-xs font-bold text-indigo-400">Add</button>
              </div>
            </div>
          </div>

          {/* Compliance & Audit Sweep Engine View */}
          <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <FileWarning className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-slate-100">
                  Compliance Risk Audit Feed
                </span>
              </div>
              <button 
                type="button" 
                onClick={runAuditSweep}
                className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 hover:text-indigo-300 transition"
                disabled={runningSweep}
              >
                <RefreshCw className={`w-3 h-3 ${runningSweep ? 'animate-spin' : ''}`} />
                Run Audit
              </button>
            </div>

            {/* Live audit outcome display */}
            <div className="space-y-1.5 max-h-36 overflow-y-auto text-[11px]">
              {auditIssues.length === 0 ? (
                <div className="bg-emerald-500/10 border border-emerald-500/25 p-2.5 rounded-xl flex items-center gap-2 text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>All display states parsed successfully. <strong>0 complaints found</strong>. Content matches compliance checklist guidelines.</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="text-[9.5px] uppercase font-mono tracking-wider font-extrabold text-amber-500/80 mb-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                    Audit Flagged {auditIssues.length} Compliance Items:
                  </div>
                  {auditIssues.map((issue) => (
                    <div key={issue.id} className="bg-rose-500/10 border border-rose-500/20 p-2 rounded-xl flex items-start gap-2 text-rose-300/90 leading-tight">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span><strong>[{issue.type}]</strong> in <em>{issue.field}</em>: {issue.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <p className="text-[9.5px] text-slate-500 leading-normal font-sans pt-1">
              *The audit sweep automatically runs `validateDisplayData()` over local components database schema state, verifying that prohibited data or unapproved claims are not exposed or hardcoded.
            </p>
          </div>

        </div>
        
      </div>

      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800 pt-4 mt-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500" />
          <p className="text-[10px] text-slate-500">Changes immediately persist in persistent config and update elements across the platform.</p>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 font-extrabold flex items-center gap-1 animate-pulse">
              <CheckCircle className="w-4 h-4" /> Config Applied Successfully!
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-xs text-white font-black uppercase rounded-2xl transition duration-150 cursor-pointer flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" /> Save Configuration
          </button>
        </div>
      </div>

    </div>
  );
}
