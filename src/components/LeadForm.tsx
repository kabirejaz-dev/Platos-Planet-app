import React, { useState } from "react";
import { Course, LeadQuery } from "../types";
import { PLATO_COURSES } from "../data";
import { 
  Building, 
  User, 
  Phone, 
  Mail, 
  HelpCircle, 
  Sparkles, 
  BadgeCheck, 
  MapPin, 
  MessageSquare,
  BookmarkCheck,
  CheckCircle2,
  CalendarDays
} from "lucide-react";

interface LeadFormProps {
  initialCourse: Course | null;
  onEnrollSuccess: (courseId: string) => void;
}

export default function LeadForm({ initialCourse, onEnrollSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadQuery>({
    studentName: "",
    parentName: "",
    contactNumber: "",
    email: "",
    courseId: initialCourse?.id || PLATO_COURSES[0].id,
    curriculum: initialCourse?.curriculum || PLATO_COURSES[0].curriculum,
    preferredCampus: "Al Qusais",
    message: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Auto sync curriculum if course changed
    if (name === "courseId") {
      const selectedCourse = PLATO_COURSES.find(c => c.id === value);
      if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          curriculum: selectedCourse.curriculum
        }));
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation matches
    if (!formData.studentName.trim() || !formData.parentName.trim()) {
      setErrorMsg("Please provide both complete Student and Parent/Guardian names!");
      return;
    }

    if (!formData.contactNumber.trim()) {
      setErrorMsg("Dubai/UAE Contact phone number is required!");
      return;
    }

    const phoneClean = formData.contactNumber.replace(/[\s-+]/g, "");
    if (phoneClean.length < 9) {
      setErrorMsg("Please provide a valid UAE contact number (e.g., 050XXXXXXX or 04XXXXXXX)!");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address for CBSE/British newsletters and study reports!");
      return;
    }

    // Success flow
    setFormSubmitted(true);
    onEnrollSuccess(formData.courseId);
  };

  const currentCourseDetails = PLATO_COURSES.find(c => c.id === formData.courseId);

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Dynamic Title block */}
      <div className="space-y-1">
        <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-yellow via-indigo-200 to-brand-red bg-clip-text text-transparent opacity-95">
          Secure Free Class trial
        </h2>
        <p className="text-xs text-slate-400">
          Book a 1-on-1 personalized test analysis & interactive STEM laboratory tour in our Dubai campus.
        </p>
      </div>

      {!formSubmitted ? (
        <form onSubmit={handleFormSubmit} className="space-y-3">
          {/* Validation Alert */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/35 text-rose-300 text-xs rounded-xl flex items-start gap-2 animate-bounce-once">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Selector Course Stream Block */}
          <div className="bg-slate-900 border border-brand-blue/30 p-3 rounded-xl space-y-2.5">
            <span className="text-[10px] font-extrabold text-brand-yellow uppercase tracking-wider block">
              Program stream Selection
            </span>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 font-medium block mb-1">Desired Course / Age Group</label>
                <select
                  id="enroll-course-select"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 px-3 py-2 rounded-lg focus:outline-none focus:border-brand-yellow cursor-pointer text-xs"
                >
                  {PLATO_COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.gradeLevel})
                    </option>
                  ))}
                </select>
              </div>

              {currentCourseDetails && (
                <div className="bg-slate-950 p-2 rounded border border-slate-800 text-[10px] space-y-1 text-slate-300">
                  <p><strong>Curriculum:</strong> {currentCourseDetails.curriculum}</p>
                  <p><strong>Interactive Timings:</strong> {currentCourseDetails.schedule}</p>
                  <p className="text-emerald-400"><strong>Promo fee range:</strong> {currentCourseDetails.feeRange}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bio Forms */}
          <div className="space-y-2.5 text-xs">
            <div>
              <label className="text-[11px] text-slate-450 font-bold block mb-1">Student Complete Name</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500"><User className="w-3.5 h-3.5" /></span>
                <input
                  id="enroll-student-name"
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rohit Kumar or Sarah Smith"
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 pl-9 rounded-lg text-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-600 font-light"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-450 font-bold block mb-1">Parent / Guardian Name</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500"><User className="w-3.5 h-3.5" /></span>
                <input
                  id="enroll-parent-name"
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="e.g. Satish Kumar / Dr. Smith"
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2 pl-9 rounded-lg text-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-600 font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-450 font-bold block mb-1">UAE Phone Contact</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500"><Phone className="w-3.5 h-3.5" /></span>
                  <input
                    id="enroll-contact-number"
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 050 123 4567"
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 pl-9 rounded-lg text-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-600 font-light"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-450 font-bold block mb-1">Email ID</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500"><Mail className="w-3.5 h-3.5" /></span>
                  <input
                    id="enroll-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@gmail.com"
                    className="w-full bg-slate-900 border border-slate-800 px-3 py-2 pl-9 rounded-lg text-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-600 font-light"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-455 font-bold block mb-1">Preferred Campus Location</label>
              <select
                id="enroll-campus-select"
                name="preferredCampus"
                value={formData.preferredCampus}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-slate-250 focus:outline-none focus:border-brand-yellow cursor-pointer"
              >
                <option value="Al Qusais">Al Qusais Hub (Centrally opposite Metro Station)</option>
                <option value="Karama">Karama Center Branch</option>
                <option value="Silicon Oasis">Dubai Silicon Oasis Hub</option>
                <option value="Online Hub">Plato Digital Virtual Classroom</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-455 block mb-1">Special instructions or school schedules (Optional)</label>
              <textarea
                id="enroll-msg-input"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={2}
                placeholder="e.g. Student goes to GEMS Our Own English High School, is struggling with quadratic formulas..."
                className="w-full bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-650 font-light text-xs"
              />
            </div>
          </div>

          <button
            id="enroll-submit-btn"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-brand-yellow to-brand-gold hover:from-brand-gold hover:to-brand-yellow text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-brand-yellow/10 cursor-pointer active:scale-[0.98] transition-all"
          >
            Confirm Royal Reservation 🚀
          </button>
        </form>
      ) : (
        /* Grand High Fidelity Reservation Clear Card */
        <div className="bg-slate-900 border border-emerald-500/40 p-5 rounded-2xl text-center space-y-4 animate-fade-in">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[9px] bg-emerald-500/15 text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Dubai Office Approved
            </span>
            <h3 className="text-base font-black text-slate-100">Trial Reservation Logged!</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              High-five parents! We have allocated a priority slot for <strong>{formData.studentName}</strong> to meet senior faculty at our <strong>{formData.preferredCampus}</strong> branch.
            </p>
          </div>

          {/* Specs receipt snippet */}
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-left text-[11px] space-y-1.5 text-slate-350 font-light">
            <p className="border-b border-slate-900 pb-1.5 text-brand-yellow font-bold flex items-center justify-between">
              <span>Program Receipt</span>
              <span>SLOT #7019-D</span>
            </p>
            <p>👨‍👩‍👦 <strong>Parent Contact:</strong> {formData.parentName} ({formData.contactNumber})</p>
            <p>📚 <strong>Target Syllabus:</strong> {formData.curriculum}</p>
            <p>🏫 <strong>Campus Venue:</strong> Plato's {formData.preferredCampus} Training block</p>
          </div>

          <p className="text-[10px] text-slate-500">
            We sent a secure confirmation SMS with Google Map routes to {formData.contactNumber}. See you soon!
          </p>

          <button
            id="book-new-slots-btn"
            onClick={() => setFormSubmitted(false)}
            className="px-5 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
          >
            Book Another Demo Session
          </button>
        </div>
      )}

      {/* Immediate Dubai Call Center Hotlines Bar */}
      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 flex justify-between items-center text-[11px]">
        <div className="space-y-0.5">
          <span className="text-slate-450 block font-light">Quick Hotline dial:</span>
          <span className="text-brand-yellow font-bold">+971 4 269 1445</span>
        </div>
        <a
          href="tel:+971509643133"
          className="px-3 py-1.5 bg-brand-blue-dark hover:bg-brand-blue border border-brand-blue/40 text-brand-yellow font-bold rounded-lg cursor-pointer transition-colors"
        >
          Call Al Qusais
        </a>
      </div>
    </div>
  );
}
