import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const pad = (n) => n.toString().padStart(2, '0');
const toDateStr = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1].slice(0, 3)} ${y}`;
}

function formatDisplayTime(timeStr) {
  if (!timeStr) return '';
  let [h, min] = timeStr.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad(min)} ${suffix}`;
}

function generateTimeSlots() {
  const slots = [];
  for (let h = 8; h <= 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 18 && m > 0) break;
      slots.push(`${pad(h)}:${pad(m)}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

// A compact, self-contained calendar + time-slot popover.
// Click the trigger box -> a small panel opens with a month calendar on one
// side and a scrollable list of time slots on the other (the scroll here is
// expected/contained UX for a picker list, not the page or the form).
export default function AppointmentPicker({ date, time, onChange, t }) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const initial = date ? new Date(`${date}T00:00:00`) : today;
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };
  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleDayClick = (d) => onChange(toDateStr(viewYear, viewMonth, d), time);
  const handleTimeClick = (slot) => onChange(date, slot);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-stretch rounded-2xl glass-input overflow-hidden divide-x divide-emerald-500/20 transition-all duration-300 ease-out text-left cursor-pointer ${
          open
            ? 'scale-[1.015] border-emerald-400 shadow-lg shadow-emerald-500/20'
            : 'hover:scale-[1.008] hover:shadow-md hover:shadow-emerald-500/10'
        }`}
      >
        <span className="flex items-center gap-2 flex-1 px-4 py-2.5 min-w-0">
          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={`text-sm truncate ${date ? 'text-white' : 'text-zinc-500'}`}>
            {date ? formatDisplayDate(date) : t.selectDate}
          </span>
        </span>
        <span className="flex items-center gap-2 flex-1 px-4 py-2.5 min-w-0">
          <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className={`text-sm truncate ${time ? 'text-white' : 'text-zinc-500'}`}>
            {time ? formatDisplayTime(time) : t.selectTime}
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 left-0 right-0 glass-panel-heavy rounded-2xl border border-emerald-500/25 shadow-2xl overflow-hidden animate-fade-in">
          <div className="flex flex-col sm:flex-row">
            {/* Calendar */}
            <div className="p-3 sm:w-[60%] border-b sm:border-b-0 sm:border-r border-zinc-800/60">
              <div className="flex items-center justify-between mb-2 px-1">
                <button
                  type="button"
                  onClick={goPrevMonth}
                  className="p-1 rounded-lg hover:bg-emerald-950/40 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-white tracking-wide">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={goNextMonth}
                  className="p-1 rounded-lg hover:bg-emerald-950/40 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-1">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="text-center text-[9px] font-bold text-zinc-500 uppercase">
                    {w}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((d, i) => {
                  if (d === null) return <div key={`empty-${i}`} />;
                  const dateStr = toDateStr(viewYear, viewMonth, d);
                  const selected = dateStr === date;
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => handleDayClick(d)}
                      className={`aspect-square rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        selected
                          ? 'bg-emerald-400 text-[#0d130e] shadow-md shadow-emerald-500/30'
                          : 'text-zinc-300 hover:bg-emerald-950/40 hover:text-emerald-300'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="sm:w-[40%] max-h-[190px] overflow-y-auto custom-scroll p-2">
              {TIME_SLOTS.map((slot) => {
                const selected = slot === time;
                return (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => handleTimeClick(slot)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold mb-1 transition-all cursor-pointer ${
                      selected
                        ? 'bg-emerald-400 text-[#0d130e]'
                        : 'text-zinc-300 hover:bg-emerald-950/40 hover:text-emerald-300'
                    }`}
                  >
                    {formatDisplayTime(slot)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-2.5 border-t border-zinc-800/60 bg-black/20">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="py-2 px-6 rounded-full font-bold text-[#0d130e] bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 active:scale-95 transition-all text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
