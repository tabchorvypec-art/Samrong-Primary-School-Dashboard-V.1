import React, { useState, useEffect } from 'react';
import { 
  Printer, 
  Search, 
  Save, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Layers, 
  BookOpen, 
  Check, 
  RefreshCw, 
  X,
  FileSpreadsheet,
  Link2,
  Lock,
  Flame,
  Globe
} from 'lucide-react';

interface Staff {
  id: string;
  nameKhmer: string;
  nameEnglish: string;
  gender: 'ប្រុស' | 'ស្រី';
  position: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'សកម្ម' | 'ឈប់សម្រាក';
  avatarBg: string;
  teacherType: 'គ្រូបង្រៀនក្របខណ្ឌ' | 'គ្រូបង្រៀនកិច្ចសន្យា' | 'ក្របខណ្ឌ' | 'កិច្ចសន្យា';
  educationLevel: 'មធ្យមសិក្សាបឋមភូមិ' | 'មធ្យមសិក្សាទុតិយភូមិ' | 'បរិញ្ញាបត្រ' | 'បរិញ្ញាបត្រជាន់ខ្ពស់' | 'បណ្ឌិត';
  birthDate?: string;
  birthPlace?: string;
  address?: string;
  bankAccount?: string;
  nationalId?: string;
  profLevel?: string;
  photoUrl?: string;
}

interface StaffInquiryCardProps {
  staffList: Staff[];
  onUpdateStaff: (updated: Staff) => void;
  showToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export default function StaffInquiryCard({ staffList, onUpdateStaff, showToast }: StaffInquiryCardProps) {
  // Navigation & filtering states
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staffList[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'modern' | 'classic'>('modern');

  // Load the current active staff member
  const activeStaff = staffList.find(s => s.id === selectedStaffId) || staffList[0];

  // Editable fields for this profile sheet (with fallbacks / defaults)
  const [formData, setFormData] = useState({
    id: '',
    classGrade: '១អា (1A)', // ថ្នាក់ទី default
    nameKhmer: '',
    nameEnglish: '',
    gender: 'ស្រី' as 'ប្រុស' | 'ស្រី',
    birthDate: '',
    birthPlace: '',
    address: '',
    educationLevel: 'បរិញ្ញាបត្រ' as any,
    profLevel: '',
    joinDate: '',
    rankStep: 'គ.៤', // កាំប្រាក់/កម្រិត
    position: '',
    additionalRole: 'គ្រូទទួលបន្ទុកថ្នាក់ទី ១អា', // តួនាទីបន្ថែម
    phone: '',
    email: '',
    nationalId: '',
    bankAccount: '',
    voterRegistry: 'ល.រ_៤១៧ លេខការិ._(០២៨២) វិទ្យាល័យសំរោង', // ល.រ ក្នុងបញ្ជី & ការិយាល័យបោះឆ្នោត
    totalStudents: '៥១ នាក់ (ស្រី ២៣ នាក់)', // ចំនួនសិស្សសរុបរួម
    actualStudents: '៥១ នាក់',
    transferStudents: '០ នាក់',
    dropoutStudents: '០ នាក់',
    taskTitle1: 'បញ្ជីរដ្ឋបាលថ្នាក់រៀន',
    taskLink1: 'https://docs.google.com/spreadsheets/d/1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo/edit',
    taskTitle2: 'ថវិកាមូលនិធិសមាគម',
    taskLink2: 'https://docs.google.com/spreadsheets/d/1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo/edit',
    photoUrl: ''
  });

  // Keep form data in sync with activeStaff selection
  useEffect(() => {
    if (activeStaff) {
      setFormData({
        id: activeStaff.id || '',
        classGrade: formData.classGrade || '១អា (1A)',
        nameKhmer: activeStaff.nameKhmer || '',
        nameEnglish: activeStaff.nameEnglish || '',
        gender: activeStaff.gender || 'ស្រី',
        birthDate: activeStaff.birthDate || '',
        birthPlace: activeStaff.birthPlace || '',
        address: activeStaff.address || '',
        educationLevel: activeStaff.educationLevel || 'បរិញ្ញាបត្រ',
        profLevel: activeStaff.profLevel || 'ស.គ្រូបង្រៀនកម្រិតបឋម',
        joinDate: activeStaff.joinDate || '',
        rankStep: formData.rankStep || 'គ.៤',
        position: activeStaff.position || '',
        additionalRole: formData.additionalRole || `គ្រូទទួលបន្ទុក${activeStaff.position || 'ថ្នាក់រៀន'}`,
        phone: activeStaff.phone || '',
        email: activeStaff.email || '',
        nationalId: activeStaff.nationalId || '',
        bankAccount: activeStaff.bankAccount || '',
        voterRegistry: formData.voterRegistry || 'ល.រ_៤១៧ លេខការិ._(០២៨២) វិទ្យាល័យសំរោង',
        totalStudents: formData.totalStudents || '៥១ នាក់ (ស្រី ២៣ នាក់)',
        actualStudents: formData.actualStudents || '៥១ នាក់',
        transferStudents: formData.transferStudents || '០ នាក់',
        dropoutStudents: formData.dropoutStudents || '០ នាក់',
        taskTitle1: formData.taskTitle1 || 'បញ្ជីរដ្ឋបាលថ្នាក់រៀន ',
        taskLink1: formData.taskLink1 || 'https://docs.google.com/spreadsheets/d/1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo/edit',
        taskTitle2: formData.taskTitle2 || 'ថវិកាមូលនិធិសមាគម',
        taskLink2: formData.taskLink2 || 'https://docs.google.com/spreadsheets/d/1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo/edit',
        photoUrl: activeStaff.photoUrl || ''
      });
    }
  }, [activeStaff]);

  // Handle local text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter staff by search box
  const filteredStaff = staffList.filter(s => 
    s.nameKhmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Save changes to database (parent staffList & local storage)
  const handleSaveChanges = () => {
    if (!activeStaff) return;
    const updatedStaff: Staff = {
      ...activeStaff,
      nameKhmer: formData.nameKhmer,
      nameEnglish: formData.nameEnglish,
      gender: formData.gender,
      birthDate: formData.birthDate,
      birthPlace: formData.birthPlace,
      address: formData.address,
      educationLevel: formData.educationLevel,
      profLevel: formData.profLevel,
      joinDate: formData.joinDate,
      position: formData.position,
      phone: formData.phone,
      email: formData.email,
      nationalId: formData.nationalId,
      bankAccount: formData.bankAccount,
      photoUrl: formData.photoUrl
    };
    onUpdateStaff(updatedStaff);
    showToast(`បានរក្សាទុកព័ត៌មានបុគ្គលិក ${formData.nameKhmer} ទៅក្នុងប្រព័ន្ធជោគជ័យ!`, 'success');
  };

  // Launch browser native printing specific for this container
  const handlePrint = () => {
    // We create a custom print styling dynamically for high resolution A4 printing
    const printContent = document.getElementById('printable-sheet-contents');
    if (!printContent) return;

    const originalContent = document.body.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>សាលាកបត្រព័ត៌មាន - ${formData.nameKhmer}</title>
            <meta charset="utf-8" />
            <link href="https://fonts.googleapis.com/css2?family=Khmer&family=Moul&family=Kantumruy+Pro:wght@400;600;700&display=swap" rel="stylesheet">
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Khmer&family=Moul&family=Kantumruy+Pro:wght@400;600;700&display=swap');
              @media print {
                body {
                  font-family: 'Kantumruy Pro', 'Khmer', sans-serif;
                  background: white !important;
                  color: black !important;
                  padding: 0;
                  margin: 0;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .no-print { display: none !important; }
                .print-card-container {
                   width: 210mm;
                   min-height: 297mm;
                   padding: 2.2cm 2cm 2cm 2cm;
                   margin: 0 auto;
                   box-shadow: none !important;
                   border: none !important;
                }
              }
              body {
                font-family: 'Kantumruy Pro', 'Khmer', sans-serif;
              }
              .moul-font {
                font-family: 'Moul', 'Khmer', serif;
              }
              .khmer-font {
                font-family: 'Khmer', sans-serif;
              }
            </style>
          </head>
          <body class="p-4 bg-white text-black">
            <div class="print-card-container max-w-3xl mx-auto border border-gray-300 p-8 rounded-lg bg-white relative">
              ${printContent.innerHTML}
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(function() { window.close(); }, 500);
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn pb-16">
      
      {/* 1. Left Side Control & Searchable Roster Panel */}
      <div className="lg:col-span-4 bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-4 flex flex-col gap-4 max-h-[750px] overflow-hidden">
        
        {/* Title & Info */}
        <div className="border-b border-indigo-500/10 pb-3">
          <h4 className="text-sm font-extrabold text-[#ffffff] flex items-center gap-2">
            <FileText size={16} className="text-indigo-400" />
            បញ្ជីឈ្មោះគ្រូគំរូ និងតម្រងស្វែងរក
          </h4>
          <p className="text-[11px] text-slate-400 mt-1">ជ្រើសរើសគ្រូបង្រៀនដើម្បីបង្ហាញ ឬកែព័ត៌មានសាលាកបត្រ</p>
        </div>

        {/* Searching Box */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-slate-500" size={15} />
          </span>
          <input 
            type="text" 
            placeholder="ស្វែងរកលោកគ្រូ អ្នកគ្រូ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Roster List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff) => {
              const isSelected = staff.id === selectedStaffId;
              return (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaffId(staff.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-r from-indigo-950/60 to-slate-900 border-indigo-500/30 shadow-indigo-950/30 text-white' 
                      : 'bg-transparent border-transparent text-slate-350 hover:bg-slate-900/30'
                  }`}
                >
                  {/* Photo Thumbnail */}
                  <div className={`h-8 w-8 rounded-full ${staff.avatarBg || 'bg-indigo-600'} text-slate-950 flex items-center justify-center font-bold text-xs uppercase overflow-hidden shrink-0 border border-white/5`}>
                    {staff.photoUrl ? (
                      <img src={staff.photoUrl} alt={staff.nameKhmer} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span>{staff.nameKhmer.replace(/\s+/g, '').substring(0, 2)}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-xs ${isSelected ? 'text-[#ffffff]' : 'text-slate-350'}`}>{staff.nameKhmer}</p>
                    <p className="text-[9.5px] text-slate-500 font-mono truncate">{staff.nameEnglish}</p>
                  </div>

                  <span className={`text-[8.5px] px-1.5 py-0.5 rounded shrink-0 font-bold ${
                    staff.gender === 'ស្រី' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {staff.gender}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-500 text-[11px] font-light">
              រកមិនឃើញឈ្មោះបុគ្គលិកទេ។
            </div>
          )}
        </div>

        {/* View Switch Styles */}
        <div className="border-t border-indigo-500/10 pt-3 flex flex-col gap-2">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">របៀបនៃការបង្ហាញ (Visual Layout Mode)</span>
          <div className="grid grid-cols-2 gap-2 p-0.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setViewStyle('modern')}
              className={`py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                viewStyle === 'modern' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers size={13} />
              <span>បែបទំនើប</span>
            </button>
            <button
              onClick={() => setViewStyle('classic')}
              className={`py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                viewStyle === 'classic' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText size={13} />
              <span>បែបឯកសារបុរាណ</span>
            </button>
          </div>
        </div>

      </div>

      {/* 2. Right Side Detailed Inquiry Sheet Canvas */}
      <div className="lg:col-span-8 space-y-4">
        
        {/* Upper Option Bar */}
        <div className="bg-slate-950/50 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-xl border border-indigo-500/20 font-bold">
              បុគ្គលិកសកម្ម៖ {formData.nameKhmer}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">ID: {formData.id}</span>
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-950/40 transition active:scale-95 cursor-pointer"
            >
              <Save size={14} />
              <span>រក្សាទុកគល់បញ្ជី</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-550 hover:to-emerald-650 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
            >
              <Printer size={14} />
              <span>ព្រីនចេញ PDF (A4)</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Style Rendering */}
        {viewStyle === 'modern' ? (
          
          /* == Style A: Premium Modern Screen Dashboard == */
          <div className="bg-gradient-to-b from-slate-950/80 to-slate-900/40 border border-indigo-500/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent -mr-20 -mt-20 pointer-events-none rounded-full" />
            
            {/* Ribbon header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-indigo-500/10 pb-6 mb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  រដ្ឋបាលថ្នាក់រៀន
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-100 mt-2">{formData.nameKhmer}</h3>
                <p className="text-xs text-slate-400 font-mono tracking-wider">{formData.nameEnglish} • {formData.gender}</p>
              </div>

              {/* Editable Photo Upload Preview URL */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="h-20 w-16 bg-blue-900/40 border border-blue-500/30 rounded-lg overflow-hidden flex items-center justify-center shadow-lg">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Teacher" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="text-center p-2 text-[10px] text-slate-400 font-serif">
                        រូបថត ៤x៦ <br/> លិខិតឆ្លង
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="block text-[10px] text-slate-400 font-bold uppercase">តំណភ្ជាប់រូបថត URL</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    placeholder="វាយបញ្ចូលតំណរូបភាព https://..."
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 w-48 text-[11px] text-indigo-300 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Field Editing Modern Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              
              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> ថ្នាក់ទី (Room/Class in charge):
                </label>
                <input 
                  type="text" 
                  name="classGrade" 
                  value={formData.classGrade} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> អត្តលេខ (ID Number):
                </label>
                <input 
                  type="text" 
                  name="id" 
                  value={formData.id} 
                  disabled
                  className="w-full bg-slate-950/60 border border-slate-800/80 rounded-lg px-3 py-2 text-slate-400 focus:outline-none cursor-not-allowed font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> កម្រិតវប្បធម៌ (Education Level):
                </label>
                <input 
                  type="text" 
                  name="educationLevel" 
                  value={formData.educationLevel} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> កម្រិតវិជ្ជាជីវៈ (Professional Pedagology):
                </label>
                <input 
                  type="text" 
                  name="profLevel" 
                  value={formData.profLevel} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> ថ្ងៃខែឆ្នាំកំណើត (DOB):
                </label>
                <input 
                  type="text" 
                  name="birthDate" 
                  value={formData.birthDate || 'N/A'} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> លេខទូរស័ព្ទ (Phone Contact):
                </label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> ថ្ងៃចូលបម្រើការងារ (Join Date):
                </label>
                <input 
                  type="text" 
                  name="joinDate" 
                  value={formData.joinDate} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> កម្រិត / កាំប្រាក់ (Rank Grade Level):
                </label>
                <input 
                  type="text" 
                  name="rankStep" 
                  value={formData.rankStep} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> តួនាទី (Role Position):
                </label>
                <input 
                  type="text" 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> តួនាទីបន្ថែម (Secondary Roles):
                </label>
                <input 
                  type="text" 
                  name="additionalRole" 
                  value={formData.additionalRole} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> ទីកន្លែងកំណើត (Place of Birth):
                </label>
                <input 
                  type="text" 
                  name="birthPlace" 
                  value={formData.birthPlace || ''} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> អាសយដ្ឋានបច្ចុប្បន្ន (Current Address):
                </label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address || ''} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Legal documents IDs */}
              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> អត្តសញ្ញាណបណ្ណលេខ (National ID No.):
                </label>
                <input 
                  type="text" 
                  name="nationalId" 
                  value={formData.nationalId || ''} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> លេខគណនីធនាគារ (Bank Acct Number):
                </label>
                <input 
                  type="text" 
                  name="bankAccount" 
                  value={formData.bankAccount || ''} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-indigo-500 font-bold text-emerald-300"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-450 font-bold text-slate-450 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span> ល.រ ក្នុងបញ្ជី & ការិយាល័យបោះឆ្នោត:
                </label>
                <input 
                  type="text" 
                  name="voterRegistry" 
                  value={formData.voterRegistry} 
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Class Students details stats */}
              <div className="border border-slate-850 bg-slate-950/40 rounded-xl p-4 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="space-y-1 md:col-span-4 border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-bold text-slate-350">ទិន្នន័យស្ថិតិសិស្សក្នុងថ្នាក់ (Class Student Metrics)</span>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">ចំនួនសិស្សសរុបរួម</label>
                  <input type="text" name="totalStudents" value={formData.totalStudents} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-[11px] font-bold font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">សិស្សរៀនជាក់ស្តែង</label>
                  <input type="text" name="actualStudents" value={formData.actualStudents} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-emerald-400 text-[11px] font-bold font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">សិស្សផ្ទេរការសិក្សា</label>
                  <input type="text" name="transferStudents" value={formData.transferStudents} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-amber-400 text-[11px] font-bold font-mono" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-500 font-medium">សិស្សបោះបង់ការសិក្សា</label>
                  <input type="text" name="dropoutStudents" value={formData.dropoutStudents} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-rose-500 text-[11px] font-semibold font-mono" />
                </div>
              </div>

              {/* Link integration sub table */}
              <div className="border border-slate-850 bg-slate-950/40 rounded-xl p-4 md:col-span-2 space-y-3">
                <span className="block text-[11px] font-bold text-indigo-300 border-b border-slate-800 pb-2 flex items-center gap-1">
                  <Link2 size={12} /> តំណភ្ជាប់ប្រព័ន្ធរដ្ឋបាលសាលា (Integrated G-Sheet Web Links)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">១. ឯកសារកិច្ចការ</span>
                    <input type="text" name="taskTitle1" value={formData.taskTitle1} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-200" />
                    <span className="text-[9px] text-slate-500 block font-mono truncate">{formData.taskLink1}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">តំណ Link (G-Sheet / Drive)</span>
                    <input type="text" name="taskLink1" value={formData.taskLink1} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-indigo-400 font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-900 pt-3">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">២. ឯកសារកិច្ចការ</span>
                    <input type="text" name="taskTitle2" value={formData.taskTitle2} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-200" />
                    <span className="text-[9px] text-slate-500 block font-mono truncate">{formData.taskLink2}</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 block font-semibold">តំណ Link (G-Sheet / Drive)</span>
                    <input type="text" name="taskLink2" value={formData.taskLink2} onChange={handleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-indigo-400 font-mono" />
                  </div>
                </div>
              </div>

            </div>

          </div>

        ) : (
          
          /* == Style B: Perfect Replica of Traditional Khmer School Certificate (The Image Style) == */
          <div className="bg-white border border-slate-300 rounded-3xl p-6 md:p-10 shadow-2xl relative text-black overflow-hidden max-w-3xl mx-auto font-serif">
            
            {/* Control Tips visible only in app layout */}
            <div className="no-print bg-indigo-50 border border-indigo-200 text-indigo-800 px-4 py-2 rounded-xl mb-6 text-xs flex justify-between items-center font-sans">
              <span>💡 ទិដ្ឋភាពឯកសារនេះត្រូវបានឌីហ្សាញតម្រង់ទិសច្បាប់ដើម និងអាចវាយកែប្រែបានផ្ទាល់លើក្រឡោននីមួយៗមុនពេលសម្រេចចិត្តបោះពុម្ព។</span>
              <span className="font-extrabold text-indigo-600">[ preview A4 ]</span>
            </div>

            {/* This block is formatted to replicate Cambodian official document layout */}
            <div id="printable-sheet-contents" className="bg-white text-black leading-relaxed text-xs">
              
              {/* Official Royal Header */}
              <div className="text-center space-y-1 mb-6">
                <h4 className="font-bold text-[14px] uppercase tracking-wide text-black moul-font" style={{ fontFamily: 'Moul, serif' }}>
                  ព្រះរាជាណាចក្រកម្ពុជា
                </h4>
                <h5 className="font-bold text-[11.5px] moul-font" style={{ fontFamily: 'Moul, serif' }}>
                  ជាតិ សាសនា ព្រះមហាក្សត្រ
                </h5>
                
                {/* Visual curved lines with double wave arc replica of official templates */}
                <div className="flex justify-center py-1">
                  <svg width="150" height="15" viewBox="0 0 150 15" fill="none" className="mx-auto">
                    <path d="M10 5 C 45 12, 105 12, 140 5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                    <path d="M25 10 C 60 14, 90 14, 125 10" stroke="currentColor" strokeWidth="0.8" fill="none"/>
                  </svg>
                </div>
              </div>

              {/* Secondary Header Layout: School Name & Badge on Left Side */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col items-center text-center space-y-1 w-44 shrink-0">
                  
                  {/* High Fidelity SVG School Logo with Torch and Book */}
                  <div className="relative w-16 h-16 flex items-center justify-center border-double border-2 border-red-500 rounded-full p-0.5 bg-yellow-50 shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-red-600">
                      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1" fill="none"/>
                      {/* Book and Torch drawing inside SVG */}
                      <path d="M30 65 C50 72, 50 72, 70 65 C60 60, 40 60, 30 65 Z" fill="currentColor" opacity="0.8"/>
                      <path d="M48 68 L52 68 L55 35 L45 35 Z" fill="currentColor" opacity="0.9"/>
                      <circle cx="50" cy="30" r="8" fill="orange" opacity="0.9"/>
                      {/* Sun ray lines drawing */}
                      <line x1="50" y1="18" x2="50" y2="10" stroke="orange" strokeWidth="2" />
                      <line x1="38" y1="23" x2="31" y2="16" stroke="orange" strokeWidth="1.5" />
                      <line x1="62" y1="23" x2="69" y2="16" stroke="orange" strokeWidth="1.5" />
                      <line x1="33" y1="33" x2="25" y2="33" stroke="orange" strokeWidth="1.5" />
                      <line x1="67" y1="33" x2="75" y2="33" stroke="orange" strokeWidth="1.5" />
                    </svg>
                  </div>
                  
                  <h6 className="font-bold text-[10.5px] uppercase tracking-tight font-serif pt-1 moul-font" style={{ fontFamily: 'Moul, serif' }}>
                    សាលាបឋមសិក្សាសំរោង
                  </h6>
                </div>

                <div className="text-center pr-12 pt-3 flex-1">
                  <h2 className="text-red-700 text-[18px] md:text-[21px] font-black tracking-wide leading-none uppercase moul-font" style={{ fontFamily: 'Moul, serif', color: '#c2410c' }}>
                    រដ្ឋបាលថ្នាក់រៀន
                  </h2>
                  <p className="text-blue-700 text-[11px] md:text-[12px] font-extrabold tracking-wide font-sans mt-0.5" style={{ color: '#1d4ed8' }}>
                    ឆ្នាំសិក្សា ២០២៥-២០២៦
                  </p>
                  
                  {/* Separator icon of diamond */}
                  <div className="flex justify-center items-center gap-1 py-1 text-amber-500">
                    <span className="h-1.5 w-1.5 rotate-45 bg-amber-500"/>
                    <span className="h-2 w-2 rotate-45 bg-amber-500"/>
                    <span className="h-1.5 w-1.5 rotate-45 bg-amber-500"/>
                  </div>
                </div>
              </div>

              {/* Core Information Layout: Columns with aligned double dots ( : ) */}
              <div className="grid grid-cols-12 gap-6 items-start relative mt-6">
                
                {/* Attributes specifications left side */}
                <div className="col-span-8 space-y-2.5 font-medium text-[11px] max-w-full text-black leading-relaxed">
                  
                  <div className="flex items-center">
                    <span className="w-48 text-black font-extrabold">ថ្នាក់ទី</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="classGrade" 
                      value={formData.classGrade} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 font-extrabold text-red-600 focus:outline-none w-52 bg-transparent leading-none py-0.5 focus:border-indigo-500"
                      style={{ color: '#dc2626' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-extrabold">គោត្តនាម និងនាម</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="nameKhmer" 
                      value={formData.nameKhmer} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 font-black text-blue-900 focus:outline-none w-52 bg-transparent leading-none py-0.5"
                      style={{ color: '#1e3a8a', fontStyle: 'bold' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-extrabold">គោត្តនាម និងនាមឡាតាំង</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="nameEnglish" 
                      value={formData.nameEnglish} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 font-bold uppercase tracking-wider text-blue-800 font-mono text-[10.5px] focus:outline-none w-52 bg-transparent leading-none py-0.5"
                      style={{ color: '#1e40af' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">អត្តលេខ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="id" 
                      value={formData.id} 
                      disabled
                      className="border-b border-dashed border-gray-400 text-slate-800 font-mono focus:outline-none w-52 bg-transparent cursor-not-allowed leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">ថ្ងៃខែឆ្នាំកំណើត</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="birthDate" 
                      value={formData.birthDate || ''} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-mono focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-baseline">
                    <span className="w-48 text-black shrink-0 font-bold">ទីកន្លែងកំណើត</span>
                    <span className="px-2 font-bold shrink-0">:</span>
                    <textarea 
                      name="birthPlace" 
                      value={formData.birthPlace || ''} 
                      onChange={handleChange}
                      rows={2}
                      className="border-b border-dashed border-gray-400 text-slate-900 w-full focus:outline-none bg-transparent leading-relaxed resize-none text-[10.5px] py-0.5"
                    />
                  </div>

                  <div className="flex items-baseline">
                    <span className="w-48 text-black shrink-0 font-bold">អាសយដ្ឋានបច្ចុប្បន្ន</span>
                    <span className="px-2 font-bold shrink-0">:</span>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address || ''} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 w-full focus:outline-none bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-extrabold text-red-700" style={{ color: '#b91c1c' }}>កម្រិតវប្បធម៌</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="educationLevel" 
                      value={formData.educationLevel} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 font-extrabold focus:outline-none w-52 bg-transparent text-red-700 leading-none py-0.5"
                      style={{ color: '#b91c1c' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-extrabold text-red-700" style={{ color: '#b91c1c' }}>កម្រិតវិជ្ជាជីវៈ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="profLevel" 
                      value={formData.profLevel} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 font-extrabold focus:outline-none w-52 bg-transparent text-red-700 leading-none py-0.5"
                      style={{ color: '#b91c1c' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">ថ្ងៃចូលបម្រើការងារ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="joinDate" 
                      value={formData.joinDate} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-mono focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">កំរិត/កាំប្រាក់</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="rankStep" 
                      value={formData.rankStep} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-serif font-extrabold focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">តួនាទី</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="position" 
                      value={formData.position} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-bold focus:outline-none w-full bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">តួនាទីបន្ថែម</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="additionalRole" 
                      value={formData.additionalRole} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-800 focus:outline-none w-full bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">លេខទូរស័ព្ទ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-mono font-bold focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-blue-800 font-bold font-mono">Email</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-blue-900 font-mono text-[10.5px] focus:outline-none w-full bg-transparent leading-none py-0.5"
                      style={{ color: '#1e3a8a' }}
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">លេខអត្តសញ្ញាណបណ្ណ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="nationalId" 
                      value={formData.nationalId || 'N/A'} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-mono focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">លេខគណនីធនាគារ</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="bankAccount" 
                      value={formData.bankAccount || 'N/A'} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-900 font-mono font-bold focus:outline-none w-52 bg-transparent leading-none py-0.5"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="w-48 text-black font-bold">ល.រ ក្នុងបញ្ជី & ការិយាល័យបោះឆ្នោត</span>
                    <span className="px-2 font-bold">:</span>
                    <input 
                      type="text" 
                      name="voterRegistry" 
                      value={formData.voterRegistry} 
                      onChange={handleChange}
                      className="border-b border-dashed border-gray-400 text-slate-800 focus:outline-none w-full bg-transparent leading-none py-0.5"
                    />
                  </div>

                  {/* Class student counts with nested indented layouts exactly as shown in the picture */}
                  <div className="space-y-1 mt-3">
                    <div className="flex items-center">
                      <span className="w-48 text-black font-bold">ចំនួនសិស្សសរុប</span>
                      <span className="px-2 font-bold">:</span>
                      <input 
                        type="text" 
                        name="totalStudents" 
                        value={formData.totalStudents} 
                        onChange={handleChange}
                        className="border-b border-dashed border-gray-450 text-slate-900 w-full focus:outline-none bg-transparent pb-0.5 font-bold"
                      />
                    </div>
                    
                    {/* Nested lists with finger indicators */}
                    <div className="pl-6 space-y-1 text-[10.5px]">
                      <div className="flex items-center">
                        <span className="w-42 text-slate-705 flex items-center gap-1">👉 សិស្សរៀនជាក់ស្តែង</span>
                        <span className="px-2">:</span>
                        <input type="text" name="actualStudents" value={formData.actualStudents} onChange={handleChange} className="border-b border-dashed border-gray-300 text-slate-900 focus:outline-none w-32 bg-transparent pb-0.5" />
                      </div>
                      <div className="flex items-center">
                        <span className="w-42 text-slate-705 flex items-center gap-1">👉 សិស្សផ្ទេរការសិក្សា</span>
                        <span className="px-2">:</span>
                        <input type="text" name="transferStudents" value={formData.transferStudents} onChange={handleChange} className="border-b border-dashed border-gray-300 text-slate-900 focus:outline-none w-32 bg-transparent pb-0.5" />
                      </div>
                      <div className="flex items-center">
                        <span className="w-42 text-slate-705 flex items-center gap-1">👉 សិស្សបោះបង់ការសិក្សា</span>
                        <span className="px-2">:</span>
                        <input type="text" name="dropoutStudents" value={formData.dropoutStudents} onChange={handleChange} className="border-b border-dashed border-gray-300 text-slate-900 focus:outline-none w-32 bg-transparent pb-0.5" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right side block containing the Photo + Gold separators */}
                <div className="col-span-4 flex flex-col items-center pt-2 gap-3">
                  
                  {/* Photo framed exact passport box with blue background backing */}
                  <div className="p-1 border border-indigo-400/30 rounded-lg shadow-md bg-sky-200">
                    <div className="h-44 w-32 border-2 border-white bg-sky-500 overflow-hidden relative flex flex-col items-center justify-center">
                      {formData.photoUrl ? (
                        <img 
                          src={formData.photoUrl} 
                          alt={formData.nameKhmer} 
                          className="h-full w-full object-cover rounded-none" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-center p-3 text-white text-[11px] font-bold select-none leading-relaxed">
                          សូមបញ្ចូល <br />រូបថត ៤x៦ <br/> ផ្ទៃខាងក្រោយពណ៌ខៀវ
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Orange/gold diamond point symbol below photo */}
                  <div className="text-amber-500 font-extrabold pb-4 rotate-45 select-none text-[12px]">
                     ♦
                  </div>
                </div>

              </div>

              {/* Lower Table Section - Google sheet task links with yellow headers */}
              <div className="mt-8 border border-amber-500/20 rounded-md overflow-hidden bg-white text-black text-[10.5px]">
                
                {/* Yellow Header */}
                <div className="grid grid-cols-12 bg-amber-100 border-b border-amber-300 text-center font-bold text-amber-900 py-1.5 font-serif select-none moul-font" style={{ fontFamily: 'Moul, serif', backgroundColor: '#fef3c7', color: '#78350f' }}>
                  <div className="col-span-6 border-r border-amber-300 text-amber-950 font-extrabold uppercase text-[10.5px]">កិច្ចការ</div>
                  <div className="col-span-6 text-amber-950 font-extrabold uppercase text-[10.5px]">តំណ Link</div>
                </div>

                {/* Task Row 1 */}
                <div className="grid grid-cols-12 border-b border-amber-100 text-[10px] py-1.5 hover:bg-amber-50/20">
                  <div className="col-span-6 border-r border-amber-100 pl-4 font-bold text-slate-800 flex items-center justify-between">
                    <input 
                      type="text" 
                      name="taskTitle1" 
                      value={formData.taskTitle1} 
                      onChange={handleChange}
                      className="bg-transparent border-none text-slate-900 font-bold focus:outline-none w-11/12 leading-relaxed"
                    />
                    <span className="px-2 text-slate-400">:</span>
                  </div>
                  <div className="col-span-6 pl-4 font-mono text-blue-700 font-medium truncate flex items-center pr-2">
                    <input 
                      type="text" 
                      name="taskLink1" 
                      value={formData.taskLink1} 
                      onChange={handleChange}
                      className="bg-transparent border-none text-blue-700 font-mono text-[9px] focus:outline-none w-full"
                    />
                  </div>
                </div>

                {/* Task Row 2 */}
                <div className="grid grid-cols-12 text-[10px] py-1.5 hover:bg-amber-50/20">
                  <div className="col-span-6 border-r border-amber-100 pl-4 font-bold text-slate-800 flex items-center justify-between">
                    <input 
                      type="text" 
                      name="taskTitle2" 
                      value={formData.taskTitle2} 
                      onChange={handleChange}
                      className="bg-transparent border-none text-slate-900 font-bold focus:outline-none w-11/12 leading-relaxed"
                    />
                    <span className="px-2 text-slate-400">:</span>
                  </div>
                  <div className="col-span-6 pl-4 font-mono text-blue-700 font-medium truncate flex items-center pr-2">
                    <input 
                      type="text" 
                      name="taskLink2" 
                      value={formData.taskLink2} 
                      onChange={handleChange}
                      className="bg-transparent border-none text-blue-700 font-mono text-[9px] focus:outline-none w-full opacity-90"
                    />
                  </div>
                </div>

              </div>

              {/* Printable footer stamp display to look high-class */}
              <div className="mt-8 border-t border-gray-250 pt-3 flex justify-between items-center text-[9px] text-gray-500 font-mono">
                <p>សាលាបឋមសិក្សាសំរោង - សន្លឹកឯកសារបញ្ជីគ្រូបង្រៀនជាក់ស្តែង</p>
                <p>ទាញចេញពីៈ Google Drive Registry • {new Date().toLocaleDateString('km-KH')}</p>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}
