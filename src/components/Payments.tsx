import React, { useState } from "react";
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  Calendar, 
  Receipt, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Percent, 
  Clock, 
  AlertCircle
} from "lucide-react";
import { StudentProfile } from "../types";

interface Invoice {
  id: string;
  courseName: string;
  dueDate: string;
  amount: number;
  vat: number;
  status: "PENDING" | "PAID";
  billingPeriod: string;
}

interface PaymentRecord {
  id: string;
  courseName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  transactionId: string;
}

interface PaymentsProps {
  profile: StudentProfile;
  onAwardXp: (amount: number) => void;
  triggerNotification?: (title: string, message: string) => void;
}

export default function Payments({ profile, onAwardXp, triggerNotification }: PaymentsProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Initial State: Premium K-12 tuition classes pricing
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-2026-004",
      courseName: "Grade 10 - CBSE Mathematics Prep",
      dueDate: "2026-06-30",
      amount: 450,
      vat: 22.50,
      status: "PENDING",
      billingPeriod: "June 2026"
    },
    {
      id: "INV-2026-003",
      courseName: "Cambridge IGCSE Chemistry Fast-Track",
      dueDate: "2026-06-25",
      amount: 550,
      vat: 27.50,
      status: "PENDING",
      billingPeriod: "June 2026"
    }
  ]);

  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([
    {
      id: "TXN-8829102",
      courseName: "Grade 10 CBSE Math Syllabus Guide",
      amount: 250,
      date: "2026-05-02",
      paymentMethod: "Apple Pay (•••• 2910)",
      transactionId: "ch_3MvY82Lkd8s10akL291"
    },
    {
      id: "TXN-8827401",
      courseName: "IGCSE Chemistry Revision Pack Downloader Upgrade",
      amount: 120,
      date: "2026-04-15",
      paymentMethod: "Visa Master (•••• 4920)",
      transactionId: "ch_3MtZ11Kjd9s20clP853"
    }
  ]);

  const toggleDiscount = () => {
    setDiscountApplied(!discountApplied);
    if (!discountApplied && triggerNotification) {
      triggerNotification("🎉 10% Sibling Discount", "A sibling discount has been safely applied to all outstanding invoices!");
    }
  };

  const handlePayClick = (invoice: Invoice) => {
    setPayingInvoice(invoice);
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setPaymentSuccess(false);
  };

  const processMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      onAwardXp(150); // Direct gamification reward

      if (payingInvoice) {
        // Mark as PAID
        setInvoices(prev => prev.map(inv => inv.id === payingInvoice.id ? { ...inv, status: "PAID" } : inv));
        
        // Add to history
        setPaymentHistory(prev => [
          {
            id: `TXN-${Math.floor(1000000 + Math.random() * 9000000)}`,
            courseName: payingInvoice.courseName,
            amount: discountApplied ? payingInvoice.amount * 0.9 : payingInvoice.amount,
            date: new Date().toISOString().split('T')[0],
            paymentMethod: "Visa Master (•••• " + cardNumber.slice(-4) + ")",
            transactionId: "ch_" + Math.random().toString(36).substring(2, 22)
          },
          ...prev
        ]);

        if (triggerNotification) {
          triggerNotification(
            "💳 Tuition Fee Paid!", 
            `Successfully cleared ${payingInvoice.id}. Outstanding settled. +150 XP rewarded!`
          );
        }
      }

      setTimeout(() => {
        setPayingInvoice(null);
        setPaymentSuccess(false);
      }, 2000);
    }, 2000);
  };

  const calculateTotalPending = () => {
    const total = invoices
      .filter(inv => inv.status === "PENDING")
      .reduce((sum, current) => {
        const itemAmount = discountApplied ? current.amount * 0.9 : current.amount;
        return sum + itemAmount + current.vat;
      }, 0);
    return parseFloat(total.toFixed(2));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen text-slate-100 p-4 space-y-4">
      {/* Stripe Premium Branding Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[9px] bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold px-2 py-0.5 rounded font-mono uppercase tracking-wider">
            Stripe Secure Gate
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">Tuition Fees & Payments</h2>
          <p className="text-[11px] text-slate-400">View real-time recurring subscriptions, secure invoices, and past receipts.</p>
        </div>
        <CreditCard className="w-8 h-8 text-slate-400 shrink-0" />
      </div>

      {/* Sibling Discount Box */}
      <div 
        onClick={toggleDiscount}
        className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between ${
          discountApplied 
            ? "bg-emerald-950/20 border-emerald-500/50 text-emerald-400" 
            : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${discountApplied ? "bg-emerald-950" : "bg-slate-950"}`}>
            <Percent className="w-4 h-4 text-brand-yellow" />
          </div>
          <div>
            <h4 className="text-xs font-bold leading-normal">Sibling & Multi-Subject Discount</h4>
            <p className="text-[10px] text-slate-400">Apply a direct 10% waiver ratio across any pending invoices.</p>
          </div>
        </div>
        <span className={`text-[10px] uppercase tracking-widest font-extrabold px-2 py-1 rounded font-mono ${
          discountApplied ? "bg-emerald-900 text-emerald-100" : "bg-slate-950 text-slate-500"
        }`}>
          {discountApplied ? "Applied" : "Apply"}
        </span>
      </div>

      {/* Segment Selector */}
      <div className="grid grid-cols-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab("pending")}
          className={`py-2 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer ${
            activeTab === "pending" 
              ? "bg-slate-950 text-brand-yellow border border-slate-800 shadow-inner" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          Outstanding ({invoices.filter(i => i.status === "PENDING").length})
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`py-2 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer ${
            activeTab === "history" 
              ? "bg-slate-950 text-brand-yellow border border-slate-800 shadow-inner" 
              : "text-slate-400 hover:text-white"
          }`}
        >
          Payment Ledger
        </button>
      </div>

      {/* Outstanding Pending View */}
      {activeTab === "pending" && (
        <div className="flex-1 flex flex-col space-y-3.5">
          {invoices.filter(inv => inv.status === "PENDING").length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-slate-800 rounded-3xl space-y-2 bg-slate-900/10">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
              <h4 className="text-sm font-bold text-slate-200">All Fees Cleared!</h4>
              <p className="text-xs text-slate-500 max-w-[220px]">Your pending semester accounts have been fully settled.</p>
            </div>
          ) : (
            <>
              {/* Dynamic Invoice Cards */}
              <div className="space-y-2.5">
                {invoices.filter(inv => inv.status === "PENDING").map((invoice) => {
                  const finalAmount = discountApplied ? invoice.amount * 0.9 : invoice.amount;
                  const totalWithVat = finalAmount + invoice.vat;
                  return (
                    <div 
                      key={invoice.id}
                      className="bg-slate-900/40 p-4 border border-slate-805 rounded-2xl space-y-3 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">{invoice.id} • {invoice.billingPeriod}</span>
                          <h4 className="text-xs font-black text-slate-200 truncate pr-2" title={invoice.courseName}>{invoice.courseName}</h4>
                        </div>
                        <span className="text-[9px] bg-red-950/50 text-brand-red border border-brand-red/20 font-bold px-2 py-0.5 rounded uppercase font-mono">
                          Due
                        </span>
                      </div>

                      <div className="flex items-end justify-between border-t border-slate-800/40 pt-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-450">
                            <Clock className="w-3 h-3 text-brand-yellow" />
                            <span>Due: {invoice.dueDate}</span>
                          </div>
                          {discountApplied && (
                            <span className="text-[9px] text-emerald-400 font-mono block">Saving 10%!</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <span className="text-[10px] text-slate-500 block leading-none">Total:</span>
                            <span className="text-sm font-black text-white font-mono">
                              AED {totalWithVat.toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={() => handlePayClick(invoice)}
                            className="px-3.5 py-2 bg-brand-yellow hover:bg-brand-gold text-slate-950 text-[10px] font-black uppercase rounded-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            <span>Pay Now</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Aggregate Card */}
              <div className="bg-slate-900 p-4 border border-slate-800 rounded-3xl flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Total Outstanding Account</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-white font-mono">AED {calculateTotalPending().toFixed(2)}</span>
                    <span className="text-[9px] text-slate-500 font-mono">(Includes 5% VAT)</span>
                  </div>
                </div>
                <div className="p-2 bg-slate-950 border border-slate-800 rounded-2xl">
                  <Receipt className="w-5 h-5 text-brand-yellow" />
                </div>
              </div>
            </>
          )}

          {/* Secure gateway trust footer */}
          <div className="bg-slate-900/25 p-3 rounded-2xl border border-slate-800/60 flex items-center gap-2.5 text-[10px] text-slate-450">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="leading-snug">
              Payments are simulated through a high-fidelity Stripe developer proxy. Real transactional cards remain protected.
            </p>
          </div>
        </div>
      )}

      {/* History Ledger View */}
      {activeTab === "history" && (
        <div className="flex-1 flex flex-col space-y-2">
          {paymentHistory.map((history) => (
            <div 
              key={history.id}
              className="bg-slate-900/30 p-3.5 border border-slate-850 rounded-2xl flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-emerald-950 text-emerald-400 text-[8px] font-bold px-1.5 py-0.2 rounded font-mono">
                    PAID
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">{history.id}</span>
                </div>
                <h4 className="font-bold text-slate-200 truncate pr-1" title={history.courseName}>
                  {history.courseName}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>{history.date}</span>
                  <span>•</span>
                  <span>{history.paymentMethod}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-black text-white font-mono block">
                  AED {history.amount.toFixed(2)}
                </span>
                <span className="text-[8px] text-slate-500 font-mono block underline truncate max-w-[80px]" title={history.transactionId}>
                  {history.transactionId.substring(0, 10)}...
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Processing Modal */}
      {payingInvoice && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative"
            id="stripe-checkout-modal"
          >
            {/* Header */}
            <div className="bg-slate-955 px-5 py-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-brand-yellow" />
                <span className="text-xs font-black text-white uppercase tracking-wider font-mono">Secure Stripe Pay</span>
              </div>
              <button 
                onClick={() => setPayingInvoice(null)}
                className="text-slate-500 hover:text-white transition-colors text-sm font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {/* Success state overlay */}
            {paymentSuccess ? (
              <div className="p-8 text-center space-y-3 flex flex-col items-center justify-center min-h-[280px]">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-6 h-6 animate-bounce" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Payment Validated</h3>
                <p className="text-xs text-slate-400 leading-normal max-w-[220px]">
                  Cleared {payingInvoice.id}. Outstanding settled. You earned <strong className="text-brand-yellow font-bold">+150 XP</strong> for your pupil journey!
                </p>
              </div>
            ) : (
              <form onSubmit={processMockPayment} className="p-5 space-y-4">
                {/* Billing Summary block */}
                <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-xs">
                  <span className="text-[9px] text-slate-500 font-mono">Selected Bill</span>
                  <div className="text-slate-300 font-bold truncate pr-1">{payingInvoice.courseName}</div>
                  <div className="flex justify-between items-center text-[11px] pt-1 text-slate-400">
                    <span>Base + 5% VAT:</span>
                    <span className="text-white font-mono font-bold">
                      AED {((discountApplied ? payingInvoice.amount * 0.9 : payingInvoice.amount) + payingInvoice.vat).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider space-y-1 block">
                    <span>Credit Card Details (Mocked Validations)</span>
                    <input 
                      type="text" 
                      placeholder="4242 4242 4242 4242"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-brand-yellow/50"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider space-y-1 block">
                      <span>Expiry Date</span>
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-brand-yellow/50 text-center"
                      />
                    </label>
                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider space-y-1 block">
                      <span>CVV / CVC</span>
                      <input 
                        type="password" 
                        placeholder="•••"
                        maxLength={3}
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-805 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-brand-yellow/50 text-center"
                      />
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-brand-yellow hover:bg-brand-gold disabled:bg-slate-800 text-slate-950 text-xs font-black uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Validating Transaction...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Settle Premium AED {((discountApplied ? payingInvoice.amount * 0.9 : payingInvoice.amount) + payingInvoice.vat).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
