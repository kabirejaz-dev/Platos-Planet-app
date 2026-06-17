import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, Filter, RefreshCw, Send, CheckCircle2, 
  Trash2, Plus, PieChart, FileText, AlertCircle, Calendar 
} from "lucide-react";
import ExecutiveAnalytics from "./ExecutiveAnalytics";

interface FinanceCFOPageProps {
  theme: "dark" | "light";
  onTriggerNotification: (title: string, desc: string) => void;
}

interface InvoiceRecord {
  id: string;
  student: string;
  parent: string;
  amount: number;
  dueDate: string;
  status: "Settled" | "Overdue" | "Unpaid";
  vat: number;
}

interface ExpenseRecord {
  id: string;
  item: string;
  amount: number;
  category: "Salaries" | "Rent/Halls" | "Marketing" | "SaaS/APIs";
  date: string;
}

export default function FinanceCFOPage({ theme, onTriggerNotification }: FinanceCFOPageProps) {
  // 1. Invoices Ledger State
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([
    { id: "inv-2041", student: "Student 1", parent: "Parent 1", amount: 4800, dueDate: "2026-06-15", status: "Settled", vat: 240 },
    { id: "inv-2042", student: "Student 3", parent: "Parent 3", amount: 8500, dueDate: "2026-06-05", status: "Overdue", vat: 425 },
    { id: "inv-2043", student: "Student 8", parent: "Parent 8", amount: 2450, dueDate: "2026-06-18", status: "Unpaid", vat: 122.5 },
    { id: "inv-2044", student: "Student 5", parent: "Parent 4", amount: 3200, dueDate: "2026-06-12", status: "Settled", vat: 160 }
  ]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [newStudent, setNewStudent] = useState("");
  const [newParent, setNewParent] = useState("");
  const [newAmt, setNewAmt] = useState(4500);

  // 2. Interactive expenses logger matching specified categories (salaries, rents, saas)
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([
    { id: "exp-1", item: "Jumeirah HQ building Lease (Monthly)", amount: 45000, category: "Rent/Halls", date: "2026-06-01" },
    { id: "exp-2", item: "Instructors Shift salaries (May roster)", amount: 128000, category: "Salaries", date: "2026-06-05" },
    { id: "exp-3", item: "Stripe Payment processing SaaS fees", amount: 4120, category: "SaaS/APIs", date: "2026-06-10" },
    { id: "exp-4", item: "Meta Meta Campaign budget allocation", amount: 12000, category: "Marketing", date: "2026-06-12" }
  ]);

  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmt, setNewExpenseAmt] = useState(1500);
  const [newExpenseCategory, setNewExpenseCategory] = useState<"Salaries" | "Rent/Halls" | "Marketing" | "SaaS/APIs">("SaaS/APIs");

  const handleDispatchBillRemind = (inv: InvoiceRecord) => {
    onTriggerNotification(
      "💬 Billing Notice Dispatched", 
      `Dispatched consolidated outstanding balance warning of AED ${inv.amount} + VAT AED ${inv.vat} to parent ${inv.parent}.`
    );
  };

  const handleMarkAsPaid = (id: string, name: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: "Settled" } : inv));
    onTriggerNotification("💰 Status Settled", `Cleared balance ledger for ${name}. Digital VAT receipt transmitted.`);
  };

  const handleRegisterInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent || !newParent) return;

    const netVat = Math.round(newAmt * 0.05);
    const freshInvoice: InvoiceRecord = {
      id: `inv-${Math.floor(1000 + Math.random() * 9000)}`,
      student: newStudent,
      parent: newParent,
      amount: Number(newAmt),
      dueDate: "2026-06-25",
      vat: netVat,
      status: "Unpaid"
    };

    setInvoices(prev => [freshInvoice, ...prev]);
    setNewStudent("");
    setNewParent("");
    onTriggerNotification("🧾 Invoicing Locked", `Registered outstanding client ledger for ${newStudent}. Mapped GCC 5% VAT.`);
  };

  const handleRegisterExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseName || !newExpenseAmt) return;

    const freshExpense: ExpenseRecord = {
      id: `exp-${Date.now()}`,
      item: newExpenseName,
      amount: Number(newExpenseAmt),
      category: newExpenseCategory,
      date: "Today"
    };

    setExpenses(prev => [...prev, freshExpense]);
    setNewExpenseName("");
    onTriggerNotification("💸 Debit Entry Added", `Successfully logged operational expense: ${newExpenseName} [AED ${newExpenseAmt}].`);
  };

  const handleDeleteExpense = (id: string, name: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    onTriggerNotification("🗑️ expense Refunded", `Reversed debit ledger entry for ${name}.`);
  };

  const filteredInvoices = invoices.filter(inv => {
    const statusMatch = filterStatus === "All" || inv.status === filterStatus;
    const searchMatch = inv.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        inv.parent.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalCollectedInvoices = invoices
    .filter(inv => inv.status === "Settled")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalUnpaidInvoices = invoices
    .filter(inv => inv.status !== "Settled")
    .reduce((sum, current) => sum + current.amount, 0);

  const totalExpenseOutflow = expenses.reduce((sum, current) => sum + current.amount, 0);

  return (
    <div className="space-y-8 animate-fade-in text-left text-slate-150 select-none">
      
      {/* 1. Brand Banner header */}
      <div className="p-6 bg-slate-900 border border-slate-855 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[9.5px] uppercase font-mono font-black text-rose-455 text-rose-400">
              CONSOLIDATED REVENUE METRICS GCC
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Group Financial Ledger Desk
          </h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Track consolidated group-wide tuition collections, manage physical branch leasing expenditures, calculate GCC Ministry VAT, and review financial growth curve predictions.
          </p>
        </div>

        <div className="shrink-0 z-10 p-4 bg-slate-950 border border-slate-800 rounded-2xl text-left max-w-xs w-full sm:w-auto">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-mono text-slate-500 font-bold uppercase block mr-4">Total VAT Accruals (5% Rate)</span>
            <span className="text-xs font-mono font-extrabold text-white">
              AED {invoices.reduce((sum, cur) => sum + cur.vat, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Key Finance Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Revenue Fees Settled", value: `AED ${totalCollectedInvoices}`, note: "Accrued inside term cycle" },
          { label: "Unpaid / Outstanding Ledger", value: `AED ${totalUnpaidInvoices}`, note: "3 reminder outreaches scheduled" },
          { label: "Corporate expenses Flow", value: `AED ${totalExpenseOutflow}`, note: "Salaries, lease, SaaS accounts" },
          { label: "Operating Net Profit", value: `AED ${totalCollectedInvoices - totalExpenseOutflow}`, note: "Margin scale: pristine" },
        ].map((item, id) => (
          <div key={id} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-left space-y-1">
            <span className="text-[9px] uppercase font-mono font-black text-slate-550 block">
              {item.label}
            </span>
            <span className="text-lg font-black text-white">{item.value}</span>
            <span className="text-[10px] text-rose-400 font-bold block">{item.note}</span>
          </div>
        ))}
      </div>

      {/* Analytics chart and forecasting projections */}
      <ExecutiveAnalytics theme={theme} onTriggerNotification={onTriggerNotification} />

      {/* Grid: Invoice Table & Client Manual Fee Entrance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Invoices audits roster */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.04] pb-4">
            <div>
              <h3 className="text-xs font-black uppercase text-rose-400 font-mono">🧾 Invoice Collection ledger ({filteredInvoices.length})</h3>
              <p className="text-[10px] text-slate-550 mt-1 leading-snug">Review payment compliance indexes, override dues, and dispatch receipts.</p>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-800 p-1.5 px-2.5 rounded-xl text-[10.5px] text-white font-bold cursor-pointer outline-none"
              >
                <option value="All">All Invoices</option>
                <option value="Settled">Settled</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Overdue">Overdue</option>
              </select>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Student name..." 
                className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-[10.5px] text-white rounded-xl focus:outline-none placeholder-slate-650 tracking-wide w-full sm:w-36"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredInvoices.map(inv => (
              <div key={inv.id} className="p-3.5 bg-slate-900 border border-slate-855 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-black text-rose-400">#{inv.id}</span>
                    <strong className="text-slate-100 text-xs">{inv.student}</strong>
                    <span className="text-[8.5px] px-1 bg-slate-950 border border-slate-800 text-slate-450 font-mono font-bold">VAT: 5% (AED {inv.vat})</span>
                  </div>
                  <span className="text-[10px] text-slate-450 block truncate mt-0.5 font-medium">Parent: {inv.parent} • Due Date: {inv.dueDate}</span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <span className="text-xs font-black text-white block">AED {inv.amount}</span>
                    <span className={`text-[8px] font-mono uppercase font-black px-1.5 rounded-md border inline-block mt-0.5 ${
                      inv.status === "Settled" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  {inv.status !== "Settled" && (
                    <button 
                      onClick={() => handleMarkAsPaid(inv.id, inv.student)}
                      className="px-2 py-1.5 bg-rose-650 hover:bg-rose-600 text-white text-[9.5px] font-bold rounded-xl uppercase transition cursor-pointer"
                    >
                      Collect Pay
                    </button>
                  )}
                  <button 
                    onClick={() => handleDispatchBillRemind(inv)}
                    className="p-1 px-2 border border-slate-800 hover:border-rose-500 hover:bg-rose-550/10 text-slate-500 hover:text-rose-400 rounded-lg transition"
                    title="Dispatch Remind alert"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client manual intake form */}
        <div className="lg:col-span-4 bg-slate-950 border border-slate-850 p-6 rounded-3xl space-y-4">
          <div className="border-b border-white/[0.04] pb-4">
            <h3 className="text-xs font-black uppercase text-rose-400 font-mono">🧾 Create Fee invoice</h3>
            <p className="text-[10px] text-slate-550 mt-1">Directly generate payment invoices for a registered parent profile.</p>
          </div>

          <form onSubmit={handleRegisterInvoice} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Student Name</label>
              <input 
                type="text" 
                value={newStudent}
                onChange={(e) => setNewStudent(e.target.value)}
                placeholder="E.g. Chloe Sterling"
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Parent Name</label>
              <input 
                type="text" 
                value={newParent}
                onChange={(e) => setNewParent(e.target.value)}
                placeholder="E.g. Chloe Parent"
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-800 text-[11px] font-bold text-white rounded-xl focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[8.5px] uppercase font-mono font-black text-slate-550">Core Fee Amount (AED)</label>
              <input 
                type="number" 
                value={newAmt}
                onChange={(e) => setNewAmt(Number(e.target.value))}
                required
                className="w-full p-2.5 bg-slate-900 border border-slate-850 text-[11px] font-bold text-white rounded-xl focus:border-rose-500 focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="py-2.5 w-full bg-rose-500 hover:bg-rose-600 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer"
            >
              Generate Bill Invoice
            </button>
          </form>
        </div>

      </div>

      {/* Interactive Expenses tracker */}
      <div className="bg-slate-950 border border-slate-855 p-6 rounded-3xl space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
          <div>
            <h3 className="text-xs font-black uppercase text-rose-400 font-mono">💸 Group Operational Expenditures logger</h3>
            <p className="text-[10px] text-slate-550 mt-1">Audit active outgoing cash flows, building renting fees, and SaaS subscriptions.</p>
          </div>
        </div>

        <form onSubmit={handleRegisterExpense} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-855 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="space-y-1">
            <span className="text-[8px] uppercase font-mono font-black text-slate-550">Expense Invoice Item Description</span>
            <input 
              type="text" 
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              placeholder="E.g. API licensing payment"
              required
              className="w-full p-2 bg-slate-950 border border-slate-800 text-[10.5px] text-white font-bold rounded-xl focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[8px] uppercase font-mono font-black text-slate-550">Category</span>
            <select 
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value as any)}
              className="w-full p-2 bg-slate-950 border border-slate-800 text-[10.5px] text-white font-bold rounded-xl outline-none"
            >
              <option value="Salaries">Salaries</option>
              <option value="Rent/Halls">Rent/Halls Lease</option>
              <option value="Marketing">Marketing Spends</option>
              <option value="SaaS/APIs">SaaS & Platform APIs</option>
            </select>
          </div>
          <div className="space-y-1">
            <span className="text-[8px] uppercase font-mono font-black text-slate-550">Debit Amount (AED)</span>
            <input 
              type="number" 
              value={newExpenseAmt}
              onChange={(e) => setNewExpenseAmt(Number(e.target.value))}
              required
              className="w-full p-2 bg-slate-950 border border-slate-805 text-[10.5px] text-white font-bold rounded-xl outline-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-slate-950 rounded-xl text-xs font-black uppercase transition cursor-pointer"
          >
            Create Debit log
          </button>
        </form>

        <div className="space-y-2.5">
          {expenses.map(exp => (
            <div key={exp.id} className="p-3 bg-slate-900 border border-slate-855 rounded-2xl flex items-center justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="text-slate-200 text-xs">{exp.item}</strong>
                  <span className="text-[8.5px] px-1 bg-slate-950 border border-slate-800 text-slate-450 font-mono rounded font-semibold">{exp.category}</span>
                </div>
                <span className="text-[9.5px] text-slate-500 block font-mono">Disbursed on: {exp.date}</span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-mono font-black text-white">- AED {exp.amount}</span>
                <button 
                  onClick={() => handleDeleteExpense(exp.id, exp.item)}
                  className="p-1 px-2 border border-slate-800 hover:border-rose-550 hover:bg-rose-550/10 rounded-lg text-slate-500 hover:text-rose-500 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
