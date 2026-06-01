import React, { useState } from 'react';
import { Users, GraduationCap } from 'lucide-react';

interface StaffStats {
  total: number;
  female: number;
  framework: number;
  frameworkFemale: number;
  contract: number;
  contractFemale: number;
  lowerSecondary: number;
  lowerSecondaryFemale: number;
  upperSecondary: number;
  upperSecondaryFemale: number;
  bachelor: number;
  bachelorFemale: number;
  master: number;
  masterFemale: number;
  phd: number;
  phdFemale: number;
}

interface StaffChartsProps {
  staffStats: StaffStats;
}

export default function StaffCharts({ staffStats }: StaffChartsProps) {
  const [activeEducationIndex, setActiveEducationIndex] = useState<number | null>(null);

  // 1. Prepare Data for Donut Chart (Education Levels)
  const eduData = [
    {
      name: 'មធ្យមសិក្សាបឋមភូមិ',
      englishName: 'Lower Secondary',
      value: staffStats.lowerSecondary || 0,
      femaleValue: staffStats.lowerSecondaryFemale || 0,
      color: 'stroke-amber-400',
      bgColor: 'bg-amber-400',
      textColor: 'text-amber-400',
      glow: 'shadow-amber-500/20',
    },
    {
      name: 'មធ្យមសិក្សាទុតិយភូមិ',
      englishName: 'Upper Secondary',
      value: staffStats.upperSecondary || 0,
      femaleValue: staffStats.upperSecondaryFemale || 0,
      color: 'stroke-emerald-400',
      bgColor: 'bg-emerald-400',
      textColor: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    {
      name: 'បរិញ្ញាបត្រ',
      englishName: "Bachelor's",
      value: staffStats.bachelor || 0,
      femaleValue: staffStats.bachelorFemale || 0,
      color: 'stroke-indigo-400',
      bgColor: 'bg-indigo-400',
      textColor: 'text-indigo-400',
      glow: 'shadow-indigo-500/20',
    },
    {
      name: 'បរិញ្ញាបត្រជាន់ខ្ពស់',
      englishName: "Master's",
      value: staffStats.master || 0,
      femaleValue: staffStats.masterFemale || 0,
      color: 'stroke-pink-400',
      bgColor: 'bg-pink-400',
      textColor: 'text-pink-400',
      glow: 'shadow-pink-500/20',
    },
    {
      name: 'ថ្នាក់បណ្ឌិត',
      englishName: 'Ph.D.',
      value: staffStats.phd || 0,
      femaleValue: staffStats.phdFemale || 0,
      color: 'stroke-violet-400',
      bgColor: 'bg-violet-400',
      textColor: 'text-violet-400',
      glow: 'shadow-violet-500/20',
    },
  ].filter(d => d.value > 0); // Only render levels that have teachers

  const totalEduValue = eduData.reduce((acc, curr) => acc + curr.value, 0);

  // SVG Calculations for Pie / Donut Chart
  const radius = 55;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~345.57

  let accumulatedPercentage = 0;

  const donutSlices = eduData.map((slice) => {
    const percentage = slice.value / (totalEduValue || 1);
    const strokeLength = percentage * circumference;
    const strokeOffset = circumference - (accumulatedPercentage * circumference);
    accumulatedPercentage += percentage;

    return {
      ...slice,
      strokeDasharray: `${strokeLength} ${circumference}`,
      strokeDashoffset: strokeOffset,
      percentage: Math.round(percentage * 105) >= 100 
        ? Math.round(percentage * 100) 
        : Math.round(percentage * 100),
    };
  });

  // Active slice display info
  const displayedSliceIndex = activeEducationIndex !== null ? activeEducationIndex : 0;
  const activeSlice = donutSlices[displayedSliceIndex] || {
    name: 'មិនមានទិន្នន័យ',
    value: 0,
    femaleValue: 0,
    percentage: 0,
    textColor: 'text-slate-400',
  };

  // 2. Prepare Data for Column/Bar Chart (Classifications)
  const maxBarValue = Math.max(
    staffStats.framework || 0,
    staffStats.frameworkFemale || 0,
    staffStats.contract || 0,
    staffStats.contractFemale || 0,
    10
  );
  const roundedMax = Math.ceil(maxBarValue / 5) * 5; // Round to nearest 5 for grid lines

  const barData = [
    {
      label: 'គ្រូបង្រៀនក្របខណ្ឌ',
      labelEn: 'Framework Teachers',
      total: staffStats.framework || 0,
      female: staffStats.frameworkFemale || 0,
      totalColor: 'from-indigo-600 to-cyan-500',
      femaleColor: 'from-pink-600 to-rose-400',
      totalGlow: 'shadow-indigo-500/25',
      femaleGlow: 'shadow-pink-500/25',
    },
    {
      label: 'គ្រូបង្រៀនកិច្ចសន្យា',
      labelEn: 'Contract Teachers',
      total: staffStats.contract || 0,
      female: staffStats.contractFemale || 0,
      totalColor: 'from-amber-600 to-yellow-400',
      femaleColor: 'from-pink-600 to-rose-450',
      totalGlow: 'shadow-amber-500/25',
      femaleGlow: 'shadow-pink-500/25',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-fadeIn">
      
      {/* 1. ក្រាបសរសរ (Bar/Column Chart) - Teacher Classifications */}
      <div className="bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div className="space-y-1 pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse animate-duration-1000"></span>
            <h4 className="text-base sm:text-lg font-black text-slate-100 font-sans flex items-center gap-2">
              <Users size={18} className="text-indigo-400" />
              ក្រាបសរសរ៖ ប្រភេទគរុកោសល្យ និងភេទ (Pedagogy Types & Gender Chart)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-350 text-slate-300">ប្រៀបធៀបរូបវន្តបុគ្គលរវាងគ្រូក្របខណ្ឌ និងគ្រូកិច្ចសន្យា</p>
        </div>

        {/* Visual Chart Area */}
        <div className="h-64 mt-6 flex relative">
          
          {/* Y-Axis Scale Indicators */}
          <div className="w-10 h-48 flex flex-col justify-between text-xs font-bold font-mono text-slate-400 select-none pb-2">
            <span>{roundedMax}</span>
            <span>{Math.round(roundedMax * 0.75)}</span>
            <span>{Math.round(roundedMax * 0.5)}</span>
            <span>{Math.round(roundedMax * 0.25)}</span>
            <span>0</span>
          </div>

          {/* Chart Bars & Grid lines */}
          <div className="flex-1 h-48 relative border-b border-l border-slate-800/80 flex items-end justify-around px-4">
            
            {/* Grid Horizontal Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0.5">
              <div className="border-t border-slate-900 w-full"></div>
              <div className="border-t border-slate-900 w-full"></div>
              <div className="border-t border-slate-900 w-full"></div>
              <div className="border-t border-slate-900 w-full"></div>
              <div className="h-0 w-full"></div>
            </div>

            {/* Render Bars */}
            {barData.map((bar, index) => {
              const totalPercentage = (bar.total / roundedMax) * 100;
              const femalePercentage = (bar.female / roundedMax) * 100;

              return (
                <div key={index} className="flex gap-4 sm:gap-6 items-end group">
                  {/* Total Bar */}
                  <div className="flex flex-col items-center gap-2 relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 bg-slate-900/90 border border-indigo-500/20 text-indigo-300 font-mono text-[11px] px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      សរុប៖ {bar.total} នាក់
                    </div>
                    {/* Interactive glowing Bar pillar */}
                    <div 
                      style={{ height: `${totalPercentage}%` }}
                      className={`w-8 sm:w-12 bg-gradient-to-t ${bar.totalColor} rounded-t-lg transition-all duration-1000 ease-out focus:scale-105 hover:brightness-110 shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:shadow-2xl cursor-pointer`}
                    />
                    <span className="text-xs font-bold text-slate-200 font-sans">សរុប ({bar.total})</span>
                  </div>

                  {/* Female Bar */}
                  <div className="flex flex-col items-center gap-2 relative">
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-2 bg-slate-900/90 border border-pink-500/20 text-pink-300 font-mono text-[11px] px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                      ស្រី៖ {bar.female} នាក់
                    </div>
                    {/* Interactive glowing Bar pillar */}
                    <div 
                      style={{ height: `${femalePercentage}%` }}
                      className={`w-8 sm:w-12 bg-gradient-to-t ${bar.femaleColor} rounded-t-lg transition-all duration-1000 ease-out focus:scale-105 hover:brightness-110 shadow-[0_4px_12px_rgba(244,63,94,0.15)] hover:shadow-2xl cursor-pointer`}
                    />
                    <span className="text-xs font-bold text-pink-400 font-sans">ស្រី ({bar.female})</span>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

        {/* Categories Labels under Chart */}
        <div className="flex justify-around pl-10 text-xs sm:text-sm font-extrabold text-slate-200 font-sans pt-3 border-t border-slate-900 mt-2">
          {barData.map((bar, i) => (
            <div key={i} className="text-center">
              <p className="text-slate-100 text-sm sm:text-base font-bold">{bar.label}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-mono mt-0.5">{bar.labelEn}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ក្រាបមូល (Pie/Donut Chart) - Qualifications */}
      <div className="bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div className="space-y-1 pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse animate-duration-1000"></span>
            <h4 className="text-base sm:text-lg font-black text-slate-100 font-sans flex items-center gap-2">
              <GraduationCap size={18} className="text-emerald-400" />
              ក្រាបមូល៖ កម្រិតវប្បធម៌ លោកគ្រូ-អ្នកគ្រូ (Teacher Education Levels)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-350 text-slate-300">កម្រិតសិក្សាខ្ពស់បំផុត និងចំនួនសរុប (សូមដាក់ម៉ៅពីលើដើម្បីមើលលម្អិត)</p>
        </div>

        {/* Visual Chart Area with Donut Side-by-Side with Legends */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
          
          {/* Circular Segment Representation */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            
            {/* Interactive SVG Rings */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              {/* Outer Ring Backing */}
              <circle 
                cx="70" 
                cy="70" 
                r={radius} 
                className="stroke-slate-900 fill-none" 
                strokeWidth={strokeWidth}
              />
              {/* Slices */}
              {donutSlices.map((slice, index) => (
                <circle
                  key={index}
                  cx="70"
                  cy="70"
                  r={radius}
                  className={`fill-none ${slice.color} transition-all duration-300 cursor-pointer ${
                    activeEducationIndex === index ? 'stroke-[16px]' : 'stroke-[14px]'
                  }`}
                  strokeWidth={strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setActiveEducationIndex(index)}
                  onMouseLeave={() => setActiveEducationIndex(null)}
                />
              ))}
            </svg>

            {/* Inner Dashboard Core Display */}
            <div className="absolute w-28 h-28 bg-[#090d1f] rounded-full border border-slate-800 flex flex-col items-center justify-center text-center p-3 shadow-inner pointer-events-none">
              <span className={`text-xs sm:text-sm font-extrabold truncate max-w-full ${activeSlice.textColor} transition-all`}>
                {activeSlice.name}
              </span>
              <span className="text-2xl font-black text-white font-mono tracking-tight mt-1 transition-all">
                {activeSlice.value} នាក់
              </span>
              {activeSlice.percentage > 0 && (
                <span className="text-[10px] sm:text-[11px] text-indigo-300 font-bold font-mono mt-0.5 px-2 py-0.5 rounded bg-indigo-500/15 border border-indigo-500/20">
                  {activeSlice.percentage}% នៃគ្រូសរុប
                </span>
              )}
            </div>

          </div>

          {/* Table Legend */}
          <div className="flex-1 w-full max-w-xs space-y-2">
            {donutSlices.map((slice, index) => {
              const isActive = activeEducationIndex === index;
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveEducationIndex(index)}
                  onMouseLeave={() => setActiveEducationIndex(null)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border border-transparent transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 border-slate-800 shadow-md scale-[1.02]' 
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${slice.bgColor} shadow-sm`} />
                    <div className="text-left">
                      <p className={`text-sm font-extrabold ${isActive ? 'text-white' : 'text-slate-200'}`}>{slice.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">{slice.englishName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-black text-white font-mono">{slice.value} នាក់</p>
                    <p className="text-[11px] font-bold text-pink-400 font-sans">ស្រី {slice.femaleValue}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
