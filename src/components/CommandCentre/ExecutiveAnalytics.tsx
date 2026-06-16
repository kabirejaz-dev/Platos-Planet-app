import React, { useState } from "react";
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from "recharts";
import { 
  TrendingUp, Calendar, Filter, Sparkles, 
  ArrowUpRight, Download, RefreshCw, Bookmark 
} from "lucide-react";

// Mock Analytical Data arrays for Plato's Region
const revenueData = [
  { month: "Jul 25", revenue: 580000, expected: 600000, retention: 91 },
  { month: "Aug 25", revenue: 640000, expected: 650000, retention: 92 },
  { month: "Sep 25", revenue: 710000, expected: 700000, retention: 94 },
  { month: "Oct 25", revenue: 690000, expected: 720000, retention: 93 },
  { month: "Nov 25", revenue: 750000, expected: 760000, retention: 95 },
  { month: "Dec 25", revenue: 820000, expected: 800000, retention: 96 },
  { month: "Jan 26", revenue: 890000, expected: 880000, retention: 95 },
  { month: "Feb 26", revenue: 940000, expected: 920050, retention: 94 },
  { month: "Mar 26", revenue: 1020000, expected: 1000000, retention: 95 },
  { month: "Apr 26", revenue: 1120000, expected: 1100000, retention: 97 },
  { month: "May 26", revenue: 1180000, expected: 1200000, retention: 98 },
  { month: "Jun 26", revenue: 1240000, expected: 1250000, retention: 98 }
];

const admissionData = [
  { month: "Jul 25", admissions: 420, activeStudents: 8500 },
  { month: "Aug 25", admissions: 510, activeStudents: 8900 },
  { month: "Sep 25", admissions: 780, activeStudents: 9600 },
  { month: "Oct 25", admissions: 450, activeStudents: 9800 },
  { month: "Nov 25", admissions: 490, activeStudents: 10200 },
  { month: "Dec 25", admissions: 310, activeStudents: 10400 },
  { month: "Jan 26", admissions: 820, activeStudents: 11100 },
  { month: "Feb 26", admissions: 640, activeStudents: 11400 },
  { month: "Mar 26", admissions: 580, activeStudents: 11800 },
  { month: "Apr 26", admissions: 710, activeStudents: 12100 },
  { month: "May 26", admissions: 920, activeStudents: 12350 },
  { month: "Jun 26", admissions: 1040, activeStudents: 12480 }
];

const curriculumDistribution = [
  { name: "IGCSE Pro", value: 4520, color: "#f59e0b" },    // Amber
  { name: "A-Level Elite", value: 3180, color: "#3b82f6" }, // Blue
  { name: "CBSE Master", value: 2940, color: "#10b981" },   // Emerald
  { name: "Foundations", value: 1840, color: "#8b5cf6" }     // Violet
];

export default function ExecutiveAnalytics({ theme, onTriggerNotification }: { theme: "dark" | "light", onTriggerNotification: (title: string, desc: string) => void }) {
  const [selectedRegion, setSelectedRegion] = useState("All UAE");
  const [timePeriod, setTimePeriod] = useState("Last 12 Months");

  const handleExport = (chartName: string) => {
    onTriggerNotification(
      "📥 Executive Report Exported",
      `Successfully compiled CSV package for the ${chartName} datasets.`
    );
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    onTriggerNotification(
      `🌐 Filtered Regional Metrics: ${region}`,
      `Calibrated analytical parameters for ${region} cohort indicators.`
    );
  };

  return (
    <div className="space-y-6" id="executive-analytics-group">
      
      {/* Mini control panel bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/20 px-5 py-3 rounded-2xl border border-slate-850/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-mono font-bold text-slate-305">ACTIVE SCOURCE REPORT TIMESPAN:</span>
          <span className="text-xs bg-slate-950 px-2.5 py-1 rounded-lg text-amber-400 font-extrabold border border-slate-800 font-mono">
            {timePeriod}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {["All UAE", "Dubai Marina", "Sharjah Cores", "Al Qusais"].map((reg) => (
              <button
                key={reg}
                onClick={() => handleRegionChange(reg)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? "bg-amber-500 text-slate-950 shadow-md font-black"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: 2 Charts on Top Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Chart 1: Revenue Line Graph (Stripe Analytics Style) */}
        <div className="xl:col-span-8 p-6 bg-slate-900/40 border border-slate-850 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-white flex items-center gap-1.5 font-sans">
                Fiscal Velocity & Revenue Forecasting
                <span className="text-[9.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
                  Healthy Growth
                </span>
              </h3>
              <p className="text-[10px] text-slate-450 font-medium">Comparing real realized revenue vs expected predictive forecasts</p>
            </div>
            <button 
              onClick={() => handleExport("Fiscal Velocity")}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
              title="Download CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 15, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" tickSize={6} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                <YAxis 
                  stroke="#64748b" 
                  tickFormatter={(val) => `AED ${(val / 1000).toFixed(0)}k`} 
                  style={{ fontSize: '10px' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px" }} 
                  labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                  itemStyle={{ fontWeight: "black" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10.5px', fontWeight: 'bold', paddingTop: '10px' }} />
                <Line 
                  name="Realized Revenue (AED)" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  activeDot={{ r: 8 }} 
                  dot={{ r: 4, strokeWidth: 1 }}
                />
                <Line 
                  name="Predictive Forecast (AED)" 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Donut Curriculum Breakdown (Apple style) */}
        <div className="xl:col-span-4 p-6 bg-slate-900/40 border border-slate-850 rounded-3xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-white font-sans">
                  Curriculum Cohorts
                </h3>
                <p className="text-[10px] text-slate-450 font-medium">Student distribution by academic stream</p>
              </div>
              <span className="p-1.5 px-2 bg-amber-500/10 text-amber-500 rounded-lg text-[8.5px] font-black font-mono">
                12,480 TOTAL
              </span>
            </div>

            <div className="h-56 relative flex items-center justify-center text-xs mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={curriculumDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {curriculumDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val) => [`${val} Students`, "Enrollment"]}
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Abs centered text */}
              <div className="absolute text-center space-y-0.5 pointer-events-none">
                <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">Proportion</span>
                <p className="text-lg font-black text-white">4 Streams</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 border-t border-slate-150/5 pt-4">
            {curriculumDistribution.map((entry) => {
              const perc = ((entry.value / 12480) * 100).toFixed(0);
              return (
                <div key={entry.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <div>
                    <p className="text-[10px] font-black text-slate-205 leading-none">{entry.name}</p>
                    <p className="text-[9px] text-slate-500 font-bold mt-1 font-mono">{entry.value.toLocaleString()} ({perc}%)</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Row 2: Monthly admissions & active student growth */}
      <div className="p-6 bg-slate-900/40 border border-slate-850 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-sm font-black text-white flex items-center gap-1.5 font-sans">
              Enrollment funnel conversions & Active cohort pace
            </h3>
            <p className="text-[10px] text-slate-450 font-medium">Highlighting monthly intake admissions compared directly against cumulative students roster</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-350 font-bold">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
              <span>MoM New Intake</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-350 font-bold">
              <span className="w-2.5 h-3.5 bg-gradient-to-t from-slate-900 to-amber-500/20 border border-amber-500/20 rounded-md" />
              <span>Cohort Cumulative roster</span>
            </div>
          </div>
        </div>

        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={admissionData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '10px', fontWeight: 'bold' }} />
              <YAxis yAxisId="left" stroke="#64748b" style={{ fontSize: '10px' }} label={{ value: 'Admissions Intake', angle: -90, position: 'insideLeft', style: { fill: '#64748b', fontSize: '9px' } }} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`} style={{ fontSize: '10px' }} label={{ value: 'Total Active Roster', angle: 90, position: 'insideRight', style: { fill: '#64748b', fontSize: '9px' } }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px" }}
              />
              <Bar yAxisId="left" dataKey="admissions" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Admissions Intake" />
              <Bar yAxisId="right" dataKey="activeStudents" fill="#3b82f6" opacity={0.35} radius={[4, 4, 0, 0]} name="Cumulative roster" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
