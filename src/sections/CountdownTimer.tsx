import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { parseMatchUTC } from '@/lib/timezone';

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string, targetTime: string): TimeLeft {
  // Use parseMatchUTC so stored UTC time is correctly interpreted
  const target = parseMatchUTC(targetDate, targetTime);
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate, targetTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft(targetDate, targetTime));
  const isLive = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate, targetTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  if (isLive) {
    return (
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/40"
      >
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-red-400 font-bold text-sm tracking-wider">● LIVE NOW</span>
      </motion.div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: 'DAYS' },
    { value: timeLeft.hours, label: 'HRS' },
    { value: timeLeft.minutes, label: 'MIN' },
    { value: timeLeft.seconds, label: 'SEC' },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="w-14 h-12 bg-[#1E2330] rounded-lg flex items-center justify-center border border-[#2A3142]">
            <span className="text-white font-bold text-lg font-mono tabular-nums">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[#64748B] text-[9px] font-medium mt-1 tracking-wider">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
