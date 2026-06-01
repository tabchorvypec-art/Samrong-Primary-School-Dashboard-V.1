import React, { useState, useEffect } from 'react';
import StaffCharts from './components/StaffCharts';
import StaffInquiryCard from './components/StaffInquiryCard';
import StudentResultsDashboard from './components/StudentResultsDashboard';
import { 
  School, 
  Users, 
  GraduationCap, 
  Database, 
  TrendingUp, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar, 
  Bell, 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Save, 
  Award, 
  Clock, 
  ArrowRight, 
  Printer,
  FileText, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  Filter,
  UserCheck,
  RefreshCw,
  Copy,
  Check,
  Grid,
  Table,
  Eye,
  CreditCard,
  FileSpreadsheet,
  List
} from 'lucide-react';
import parsedStaff from './data/parsed_staff.json';

// === TypeScript Interfaces ===
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

interface Student {
  id: string;
  nameKhmer: string;
  nameEnglish: string;
  gender: 'ប្រុស' | 'ស្រី';
  grade: string; // "ថ្នាក់ទី ១" to "ថ្នាក់ទី ៦"
  parentName: string;
  phone: string;
  address: string;
  status: 'កំពុងរៀន' | 'ព្យួរការសិក្សា' | 'ឈប់រៀន';
}

interface AcademicRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  month: string; 
  khmerScore: number;  // 0 - 100
  mathScore: number;   // 0 - 100
  scienceScore: number; // 0 - 100
  socialScore: number;  // 0 - 100
  teacherRemarks: string;
}

// === Initial Staff Loaded from G-Sheet JSON ===
const initialStaff: Staff[] = (parsedStaff as any[]).map(s => ({
  ...s,
  teacherType: s.teacherType === 'កិច្ចសន្យា' || s.teacherType === 'គ្រូបង្រៀនកិច្ចសន្យា'
    ? 'គ្រូបង្រៀនកិច្ចសន្យា'
    : 'គ្រូបង្រៀនក្របខណ្ឌ'
})) as Staff[];

const initialStudents: Student[] = [
  {
    id: 'SD-001',
    nameKhmer: 'សុខ ម៉េងលី',
    nameEnglish: 'Sok Mengly',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៦',
    parentName: 'សុខ ម៉ៅ',
    phone: '012 999 888',
    address: 'ភូមិសំរោង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-002',
    nameKhmer: 'ចាន់ ស្រីមុំ',
    nameEnglish: 'Chan Sreymom',
    gender: 'ស្រី',
    grade: 'ថ្នាក់ទី ៦',
    parentName: 'ចាន់ សុខា',
    phone: '015 777 666',
    address: 'ភូមិថ្មី ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-003',
    nameKhmer: 'គឹម ហុក',
    nameEnglish: 'Kim Hok',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៥',
    parentName: 'គឹម ហេង',
    phone: '098 333 444',
    address: 'ភូមិត្បូង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-004',
    nameKhmer: 'ម៉ៅ លីហួរ',
    nameEnglish: 'Mao Lyhour',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៤',
    parentName: 'ម៉ៅ គីម',
    phone: '077 444 222',
    address: 'ភូមិជើង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-005',
    nameKhmer: 'សេង ពិសិដ្ឋ',
    nameEnglish: 'Seng Piseth',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៣',
    parentName: 'សេង ហឿង',
    phone: '085 123 456',
    address: 'ភូមិខាងលិច ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-006',
    nameKhmer: 'ម៉ែន សុជាតា',
    nameEnglish: 'Men Socheata',
    gender: 'ស្រី',
    grade: 'ថ្នាក់ទី ២',
    parentName: 'ម៉ែន សូវណ្ណ',
    phone: '089 987 654',
    address: 'ភូមិខាងកើត ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-007',
    nameKhmer: 'ជា រចនា',
    nameEnglish: 'Chea Rachana',
    gender: 'ស្រី',
    grade: 'ថ្នាក់ទី ១',
    parentName: 'ជា វាសនា',
    phone: '099 234 567',
    address: 'ភូមិសំរោង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-008',
    nameKhmer: 'កែវ សំណាង',
    nameEnglish: 'Keo Samnang',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៦',
    parentName: 'កែវ សុខុម',
    phone: '011 885 522',
    address: 'ភូមិថ្មី ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  },
  {
    id: 'SD-009',
    nameKhmer: 'ណាក់ ស្រីណែត',
    nameEnglish: 'Nak Sreynet',
    gender: 'ស្រី',
    grade: 'ថ្នាក់ទី ៥',
    parentName: 'ណាក់ សំអុល',
    phone: '093 332 211',
    address: 'ភូមិជើង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'ព្យួរការសិក្សា'
  },
  {
    id: 'SD-010',
    nameKhmer: 'វ៉ាន់ សុភ័ក្ត្រ',
    nameEnglish: 'Van Sopheak',
    gender: 'ប្រុស',
    grade: 'ថ្នាក់ទី ៤',
    parentName: 'វ៉ាន់ ធឿន',
    phone: '017 665 544',
    address: 'ភូមិត្បូង ឃុំសំរោង ស្រុកសំរោង ខេត្តតាកែវ',
    status: 'កំពុងរៀន'
  }
];

const initialGrades: AcademicRecord[] = [
  {
    id: 'G-001',
    studentId: 'SD-001',
    studentName: 'សុខ ម៉េងលី',
    grade: 'ថ្នាក់ទី ៦',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 92,
    mathScore: 88,
    scienceScore: 85,
    socialScore: 90,
    teacherRemarks: 'ការសិក្សាល្អណាស់ ឧស្សាហ៍ព្យាយាម រួសរាយរាក់ទាក់។'
  },
  {
    id: 'G-002',
    studentId: 'SD-002',
    studentName: 'ចាន់ ស្រីមុំ',
    grade: 'ថ្នាក់ទី ៦',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 95,
    mathScore: 91,
    scienceScore: 89,
    socialScore: 94,
    teacherRemarks: 'សិស្សឆ្នើម ប្រចាំថ្នាក់ រក្សាការខិតខំប្រឹងប្រែងបន្តទៀត។'
  },
  {
    id: 'G-003',
    studentId: 'SD-003',
    studentName: 'គឹម ហុក',
    grade: 'ថ្នាក់ទី ៥',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 78,
    mathScore: 82,
    scienceScore: 80,
    socialScore: 75,
    teacherRemarks: 'ការសិក្សាល្អបង្គួរ មានការយកចិត្តទុកដាក់ខ្ពស់លើគណិតវិទ្យា។'
  },
  {
    id: 'G-004',
    studentId: 'SD-004',
    studentName: 'ម៉ៅ លីហួរ',
    grade: 'ថ្នាក់ទី ៤',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 65,
    mathScore: 70,
    scienceScore: 68,
    socialScore: 72,
    teacherRemarks: 'ការសិក្សាមធ្យម គួរព្យាយាមអានសៀវភៅ និងធ្វើលំហាត់បន្ថែមទៀត។'
  },
  {
    id: 'G-005',
    studentId: 'SD-005',
    studentName: 'សេង ពិសិដ្ឋ',
    grade: 'ថ្នាក់ទី ៣',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 82,
    mathScore: 75,
    scienceScore: 88,
    socialScore: 84,
    teacherRemarks: 'លទ្ធផលល្អច្រើន ពិសេសមុខវិជ្ជាវិទ្យាសាស្ត្រ ពូកែសង្កេតខ្លាំង។'
  },
  {
    id: 'G-006',
    studentId: 'SD-008',
    studentName: 'កែវ សំណាង',
    grade: 'ថ្នាក់ទី ៦',
    month: 'ប្រចាំឆមាសទី ១',
    khmerScore: 50,
    mathScore: 55,
    scienceScore: 60,
    socialScore: 58,
    teacherRemarks: 'ការសិក្សាខ្សោយ ត្រូវយកចិត្តទុកដាក់ស្ដាប់មេរៀនក្នុងថ្នាក់បន្ថែម។'
  }
];

export default function App() {
  // === Navigation Tab State ===
  // Tab 0: Overview (ផ្ទាំងគ្រប់គ្រង)
  // Tab 1: Staff Info (ទិន្នន័យបុគ្គលិក)
  // Tab 2: Student Info (ទិន្នន័យសិស្ស)
  // Tab 3: Academic Results (លទ្ធផលសិក្សា)
  const [activeTab, setActiveTab] = useState<number>(0);
  const [staffViewMode, setStaffViewMode] = useState<'card' | 'table' | 'inquiry'>('card');
  const [isSyncing, setIsSyncing] = useState(false);
  const [printingStaff, setPrintingStaff] = useState<Staff | null>(null);

  const handlePrintSingleStaff = (staff: Staff) => {
    setPrintingStaff(staff);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const handleSyncGoogleSheet = async () => {
    setIsSyncing(true);
    showToast('កំពុងចាប់ផ្តើមទាញយកទិន្នន័យជាក់ស្តែងពី Google Sheet...', 'info');
    const sheetId = '1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo';
    const sheetName = encodeURIComponent('Data_បុគ្គលិក');
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    
    try {
      const res = await fetch(url);
      const text = await res.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/);
      if (!match) {
        throw new Error('ពុំអាចបំប្លែងទិន្នន័យពី Google Sheet បានទេ។');
      }
      
      const obj = JSON.parse(match[1]);
      const table = obj.table;
      const rows = table.rows;
      const result: Staff[] = [];
      
      const colors = [
        'bg-indigo-600', 'bg-violet-600', 'bg-emerald-600', 'bg-blue-600',
        'bg-slate-600', 'bg-indigo-500', 'bg-pink-600', 'bg-amber-600',
        'bg-teal-500', 'bg-rose-500', 'bg-fuchsia-600', 'bg-cyan-600',
        'bg-purple-600', 'bg-sky-500', 'bg-violet-500', 'bg-pink-500',
        'bg-teal-600', 'bg-lime-600', 'bg-red-500', 'bg-orange-600'
      ];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (!row || !row.c) continue;
        const c = row.c;
        
        const getValue = (idx: number) => {
          if (idx >= c.length || !c[idx]) return '';
          const cell = c[idx];
          if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
          return '';
        };
        
        const getFormatted = (idx: number) => {
          if (idx >= c.length || !c[idx]) return '';
          const cell = c[idx];
          if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
          if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
          return '';
        };
        
        const id = getValue(3);
        if (!id || id === 'អត្តលេខ' || id.toLowerCase().includes('id') || id.toLowerCase().includes('code')) {
          continue;
        }
        
        const lastNameKh = getValue(4);
        const firstNameKh = getValue(5);
        const fullNameKh = getValue(6) || `${lastNameKh} ${firstNameKh}`.trim();
        
        const genderStr = getValue(7);
        let gender: 'ប្រុស' | 'ស្រី' = 'ប្រុស';
        if (genderStr.includes('ស្រី') || genderStr.includes('F') || genderStr.includes('f') || genderStr.includes('Female')) {
          gender = 'ស្រី';
        }
        
        const birthDate = getFormatted(11);
        const birthPlace = getValue(12);
        const address = getValue(13);
        
        const lastNameEn = getValue(14);
        const firstNameEn = getValue(15);
        const nameEng = firstNameEn && lastNameEn ? `${lastNameEn} ${firstNameEn}`.trim() : (getValue(15) || getValue(14) || 'Staff ' + id);
        
        const bankAccount = getValue(16);
        const nationalId = getValue(17);
        const phone = getValue(18);
        const joinDate = getFormatted(19);
        
        const eduLevelRaw = getValue(20);
        let educationLevel: any = 'បរិញ្ញាបត្រ';
        if (eduLevelRaw.includes('បឋម')) educationLevel = 'មធ្យមសិក្សាបឋមភូមិ';
        else if (eduLevelRaw.includes('ទុតិយ')) educationLevel = 'មធ្យមសិក្សាទុតិយភូមិ';
        else if (eduLevelRaw.includes('ជាន់ខ្ពស់') || eduLevelRaw.includes('អនុបណ្ឌិត')) educationLevel = 'បរិញ្ញាបត្រជាន់ខ្ពស់';
        else if (eduLevelRaw.includes('បណ្ឌិត')) educationLevel = 'បណ្ឌិត';
        
        const email = getValue(30) || `${nameEng.toLowerCase().replace(/\s+/g, '.')}@samraong.edu.kh`;
        const position = getValue(31) || 'គ្រូបង្រៀន';
        
        const avatarBg = colors[result.length % colors.length];
        const teacherType: 'គ្រូបង្រៀនក្របខណ្ឌ' | 'គ្រូបង្រៀនកិច្ចសន្យា' = getValue(45).includes('កិច្ចសន្យា') || position.includes('កិច្ចសន្យា') ? 'គ្រូបង្រៀនកិច្ចសន្យា' : 'គ្រូបង្រៀនក្របខណ្ឌ';
        
        // Extract the photo URL or Google Drive file ID from column BB (index 53)
        const BBValue = getValue(53);
        let photoUrl = '';
        if (BBValue) {
          const trimmedBBValue = BBValue.trim();
          const formulaMatch = trimmedBBValue.match(/=IMAGE\s*\(\s*["']([^"']+)["']/i);
          let rawUrlOrId = trimmedBBValue;
          if (formulaMatch && formulaMatch[1]) {
            rawUrlOrId = formulaMatch[1].trim();
          }

          // Check if it's a Google Drive URL and extract ID
          const driveIdMatch = rawUrlOrId.match(/(?:id=|folders\/|d\/|file\/d\/)([a-zA-Z0-9-_]{25,50})/);
          if (driveIdMatch && driveIdMatch[1]) {
            photoUrl = `https://lh3.googleusercontent.com/d/${driveIdMatch[1]}`;
          } else if (rawUrlOrId.startsWith('http')) {
            photoUrl = rawUrlOrId;
          } else if (rawUrlOrId.length >= 15 && /^[a-zA-Z0-9-_]+$/.test(rawUrlOrId)) {
            // If it's a raw Drive file ID (e.g., 1Wsd_ruWxMtTMddHMWYh7tEbGL_ibrcCw)
            photoUrl = `https://lh3.googleusercontent.com/d/${rawUrlOrId}`;
          }
        }

        result.push({
          id,
          nameKhmer: fullNameKh,
          nameEnglish: nameEng,
          gender,
          position,
          email,
          phone,
          joinDate: joinDate || '2015-10-01',
          status: 'សកម្ម',
          avatarBg,
          teacherType,
          educationLevel,
          birthDate: birthDate || '',
          birthPlace: birthPlace || '',
          address: address || '',
          bankAccount: bankAccount || '',
          nationalId: nationalId || '',
          profLevel: getValue(21) || '',
          photoUrl: photoUrl || undefined
        });
      }
      
      if (result.length > 0) {
        setStaffList(result);
        showToast(`បានទាញយក និងធ្វើបច្ចុប្បន្នភាពទិន្នន័យបុគ្គលិកចំនួន ${result.length} នាក់ពី Google Sheet ដោយជោគជ័យ!`, 'success');
      } else {
        showToast('ពុំមានទិន្នន័យដើម្បីធ្វើបច្ចុប្បន្នភាពឡើយ។', 'error');
      }
    } catch (err: any) {
      console.error(err);
      showToast('ទាញទិន្នន័យបរាជ័យ! សូមពិនិត្យការតភ្ជាប់បណ្តាញកុំព្យូទ័ររបស់អ្នក។', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // === Persistent States ===
  const [staffList, setStaffList] = useState<Staff[]>(() => {
    const saved = localStorage.getItem('samraong_staff_list_v5');
    const parsed = saved ? JSON.parse(saved) : initialStaff;
    return (parsed || []).map((s: any) => {
      let type: 'គ្រូបង្រៀនក្របខណ្ឌ' | 'គ្រូបង្រៀនកិច្ចសន្យា' = 'គ្រូបង្រៀនក្របខណ្ឌ';
      const rawType = String(s.teacherType || '').trim();
      if (rawType.includes('កិច្ចសន្យា') || String(s.position || '').includes('កិច្ចសន្យា')) {
        type = 'គ្រូបង្រៀនកិច្ចសន្យា';
      }
      return {
        ...s,
        teacherType: type
      };
    }) as Staff[];
  });

  const [staffImageErrors, setStaffImageErrors] = useState<Record<string, boolean>>({});

  const [studentList, setStudentList] = useState<Student[]>(() => {
    const saved = localStorage.getItem('samraong_student_list');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [recordsList, setRecordsList] = useState<AcademicRecord[]>(() => {
    const saved = localStorage.getItem('samraong_academic_records');
    return saved ? JSON.parse(saved) : initialGrades;
  });

  useEffect(() => {
    localStorage.setItem('samraong_staff_list_v5', JSON.stringify(staffList));
  }, [staffList]);

  useEffect(() => {
    localStorage.setItem('samraong_student_list', JSON.stringify(studentList));
  }, [studentList]);

  useEffect(() => {
    localStorage.setItem('samraong_academic_records', JSON.stringify(recordsList));
  }, [recordsList]);

  // === Notification Toast State ===
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // === Modals States ===
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [viewingStaffDetail, setViewingStaffDetail] = useState<Staff | null>(null);

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AcademicRecord | null>(null);

  const [viewingReportCardStudent, setViewingReportCardStudent] = useState<string | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awardTab, setAwardTab] = useState<'cert' | 'list'>('cert');

  // === Search & Filters States ===
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [staffStatusFilter, setStaffStatusFilter] = useState<string>('ទាំងអស់');

  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [studentGradeFilter, setStudentGradeFilter] = useState<string>('ទាំងអស់');
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>('ទាំងអស់');

  const [recordSearchQuery, setRecordSearchQuery] = useState('');
  const [recordGradeFilter, setRecordGradeFilter] = useState<string>('ទាំងអស់');

  // === Quick Actions ===
  const handleOpenAddStaff = () => {
    setEditingStaff(null);
    setIsStaffModalOpen(true);
  };

  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  const handleOpenAddRecord = () => {
    setEditingRecord(null);
    setIsRecordModalOpen(true);
  };

  // === Delete Functions ===
  const handleDeleteStaff = (id: string, name: string) => {
    if (confirm(`តើអ្នកពិតជាចង់លុបទិន្នន័យរបស់លោកគ្រូ/អ្នកគ្រូ "${name}" មែនទេ?`)) {
      setStaffList(prev => prev.filter(s => s.id !== id));
      showToast(`បានលុបទិន្នន័យលោកគ្រូ/អ្នកគ្រូ "${name}" រួចរាល់!`, 'info');
    }
  };

  const handleDeleteStudent = (id: string, name: string) => {
    if (confirm(`តើអ្នកពិតជាចង់លុបទិន្នន័យរបស់សិស្ស "${name}" មែនទេ?`)) {
      setStudentList(prev => prev.filter(s => s.id !== id));
      // Delete their academic records as well
      setRecordsList(prev => prev.filter(r => r.studentId !== id));
      showToast(`បានលុបទិន្នន័យសិស្ស "${name}" រួចរាល់!`, 'info');
    }
  };

  const handleDeleteRecord = (id: string, studentName: string) => {
    if (confirm(`តើអ្នកពិតជាចង់លុបលទ្ធផលសិក្សារបស់សិស្ស "${studentName}" មែនទេ?`)) {
      setRecordsList(prev => prev.filter(r => r.id !== id));
      showToast(`បានលុបលទ្ធផលពិន្ទុរបស់សិស្ស "${studentName}" រួចរាល់!`, 'info');
    }
  };

  // === Save Handlers ===
  const getRandomAvatarBg = () => {
    const backgrounds = [
      'bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600', 
      'bg-fuchsia-600', 'bg-pink-600', 'bg-rose-600', 'bg-emerald-600', 
      'bg-teal-600', 'bg-amber-600'
    ];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };

  const handleSaveStaff = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const staffData: Staff = {
      id: editingStaff ? editingStaff.id : `ST-${String(staffList.length + 1).padStart(3, '0')}`,
      nameKhmer: formData.get('nameKhmer') as string,
      nameEnglish: formData.get('nameEnglish') as string,
      gender: formData.get('gender') as 'ប្រុស' | 'ស្រី',
      position: formData.get('position') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      joinDate: formData.get('joinDate') as string,
      status: formData.get('status') as 'សកម្ម' | 'ឈប់សម្រាក',
      avatarBg: editingStaff ? editingStaff.avatarBg : getRandomAvatarBg(),
      teacherType: formData.get('teacherType') as 'ក្របខណ្ឌ' | 'កិច្ចសន្យា',
      educationLevel: formData.get('educationLevel') as 'មធ្យមសិក្សាបឋមភូមិ' | 'មធ្យមសិក្សាទុតិយភូមិ' | 'បរិញ្ញាបត្រ' | 'បរិញ្ញាបត្រជាន់ខ្ពស់' | 'បណ្ឌិត',
      // Saved G-Sheet fields
      birthDate: formData.get('birthDate') as string || '',
      birthPlace: formData.get('birthPlace') as string || '',
      address: formData.get('address') as string || '',
      bankAccount: formData.get('bankAccount') as string || '',
      nationalId: formData.get('nationalId') as string || '',
      profLevel: formData.get('profLevel') as string || ''
    };

    if (editingStaff) {
      setStaffList(prev => prev.map(s => s.id === staffData.id ? staffData : s));
      showToast(`បានកែប្រែព័ត៌មាន លោកគ្រូ/អ្នកគ្រូ "${staffData.nameKhmer}" ដោយជោគជ័យ!`);
    } else {
      setStaffList(prev => [staffData, ...prev]);
      showToast(`បានបន្ថែម លោកគ្រូ/អ្នកគ្រូ "${staffData.nameKhmer}" ដោយជោគជ័យ!`);
    }
    setIsStaffModalOpen(false);
  };

  const handleSaveStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const studentData: Student = {
      id: editingStudent ? editingStudent.id : `SD-${String(studentList.length + 1).padStart(3, '0')}`,
      nameKhmer: formData.get('nameKhmer') as string,
      nameEnglish: formData.get('nameEnglish') as string,
      gender: formData.get('gender') as 'ប្រុស' | 'ស្រី',
      grade: formData.get('grade') as string,
      parentName: formData.get('parentName') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      status: formData.get('status') as 'កំពុងរៀន' | 'ព្យួរការសិក្សា' | 'ឈប់រៀន'
    };

    if (editingStudent) {
      setStudentList(prev => prev.map(s => s.id === studentData.id ? studentData : s));
      // If student info changed, also update name/grade in academic records
      setRecordsList(prev => prev.map(r => r.studentId === studentData.id ? { 
        ...r, 
        studentName: studentData.nameKhmer,
        grade: studentData.grade
      } : r));
      showToast(`បានកែប្រែព័ត៌មាន សិស្ស "${studentData.nameKhmer}" ដោយជោគជ័យ!`);
    } else {
      setStudentList(prev => [studentData, ...prev]);
      showToast(`បានបន្ថែម សិស្ស "${studentData.nameKhmer}" ដោយជោគជ័យ!`);
    }
    setIsStudentModalOpen(false);
  };

  const handleSaveRecord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedStudentId = formData.get('studentId') as string;
    const selectedStudent = studentList.find(s => s.id === selectedStudentId);

    if (!selectedStudent) {
      showToast('សូមជ្រើសរើសសិស្សដែលត្រឹមត្រូវ!', 'error');
      return;
    }

    const khmer = Number(formData.get('khmerScore'));
    const math = Number(formData.get('mathScore'));
    const sci = Number(formData.get('scienceScore'));
    const soc = Number(formData.get('socialScore'));

    if (khmer < 0 || khmer > 100 || math < 0 || math > 100 || sci < 0 || sci > 100 || soc < 0 || soc > 100) {
      showToast('ពិន្ទុត្រូវតែស្ថិតនៅចន្លោះពី ០ ដល់ ១០០!', 'error');
      return;
    }

    const recordData: AcademicRecord = {
      id: editingRecord ? editingRecord.id : `G-${String(recordsList.length + 1).padStart(3, '0')}`,
      studentId: selectedStudentId,
      studentName: selectedStudent.nameKhmer,
      grade: selectedStudent.grade,
      month: formData.get('month') as string,
      khmerScore: khmer,
      mathScore: math,
      scienceScore: sci,
      socialScore: soc,
      teacherRemarks: formData.get('teacherRemarks') as string || 'គ្មាន'
    };

    if (editingRecord) {
      setRecordsList(prev => prev.map(r => r.id === recordData.id ? recordData : r));
      showToast(`បានកែប្រែពិន្ទុរបស់សិស្ស "${recordData.studentName}" រួចរាល់!`);
    } else {
      setRecordsList(prev => [recordData, ...prev]);
      showToast(`បានបញ្ចូលពិន្ទុរបស់សិស្ស "${recordData.studentName}" រួចរាល់!`);
    }
    setIsRecordModalOpen(false);
  };

  // === Computations & Metrics ===
  const totalStaffCount = staffList.length;
  const activeStaffCount = staffList.filter(s => s.status === 'សកម្ម').length;
  const totalStudentsCount = studentList.length;
  const activeStudentsCount = studentList.filter(s => s.status === 'កំពុងរៀន').length;

  // Specific Cambodian Staff Education and Position Metrics from Google Sheet
  const staffStats = {
    total: staffList.length,
    female: staffList.filter(s => s.gender === 'ស្រី').length,
    framework: staffList.filter(s => String(s.teacherType || '').includes('ក្របខណ្ឌ')).length,
    frameworkFemale: staffList.filter(s => String(s.teacherType || '').includes('ក្របខណ្ឌ') && s.gender === 'ស្រី').length,
    contract: staffList.filter(s => String(s.teacherType || '').includes('កិច្ចសន្យា')).length,
    contractFemale: staffList.filter(s => String(s.teacherType || '').includes('កិច្ចសន្យា') && s.gender === 'ស្រី').length,
    lowerSecondary: staffList.filter(s => s.educationLevel === 'មធ្យមសិក្សាបឋមភូមិ').length,
    lowerSecondaryFemale: staffList.filter(s => s.educationLevel === 'មធ្យមសិក្សាបឋមភូមិ' && s.gender === 'ស្រី').length,
    upperSecondary: staffList.filter(s => s.educationLevel === 'មធ្យមសិក្សាទុតិយភូមិ').length,
    upperSecondaryFemale: staffList.filter(s => s.educationLevel === 'មធ្យមសិក្សាទុតិយភូមិ' && s.gender === 'ស្រី').length,
    bachelor: staffList.filter(s => s.educationLevel === 'បរិញ្ញាបត្រ').length,
    bachelorFemale: staffList.filter(s => s.educationLevel === 'បរិញ្ញាបត្រ' && s.gender === 'ស្រី').length,
    master: staffList.filter(s => s.educationLevel === 'បរិញ្ញាបត្រជាន់ខ្ពស់').length,
    masterFemale: staffList.filter(s => s.educationLevel === 'បរិញ្ញាបត្រជាន់ខ្ពស់' && s.gender === 'ស្រី').length,
    phd: staffList.filter(s => s.educationLevel === 'បណ្ឌិត').length,
    phdFemale: staffList.filter(s => s.educationLevel === 'បណ្ឌិត' && s.gender === 'ស្រី').length,
  };

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.nameKhmer.includes(staffSearchQuery) || 
      s.nameEnglish.toLowerCase().includes(staffSearchQuery.toLowerCase()) || 
      s.phone.includes(staffSearchQuery) || 
      s.position.includes(staffSearchQuery);
    const matchesStatus = staffStatusFilter === 'ទាំងអស់' || s.status === staffStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredStudents = studentList.filter(s => {
    const matchesSearch = s.nameKhmer.includes(studentSearchQuery) || 
      s.nameEnglish.toLowerCase().includes(studentSearchQuery.toLowerCase()) || 
      s.phone.includes(studentSearchQuery) || 
      s.id.includes(studentSearchQuery);
    const matchesGrade = studentGradeFilter === 'ទាំងអស់' || s.grade === studentGradeFilter;
    const matchesStatus = studentStatusFilter === 'ទាំងអស់' || s.status === studentStatusFilter;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const filteredRecords = recordsList.filter(r => {
    const matchesSearch = r.studentName.includes(recordSearchQuery) || r.studentId.includes(recordSearchQuery);
    const matchesGrade = recordGradeFilter === 'ទាំងអស់' || r.grade === recordGradeFilter;
    return matchesSearch && matchesGrade;
  });
  
  // Grade Distribution Counts
  const gradeDistribution = {
    'ថ្នាក់ទី ១': studentList.filter(s => s.grade === 'ថ្នាក់ទី ១').length,
    'ថ្នាក់ទី ២': studentList.filter(s => s.grade === 'ថ្នាក់ទី ២').length,
    'ថ្នាក់ទី ៣': studentList.filter(s => s.grade === 'ថ្នាក់ទី ៣').length,
    'ថ្នាក់ទី ៤': studentList.filter(s => s.grade === 'ថ្នាក់ទី ៤').length,
    'ថ្នាក់ទី ៥': studentList.filter(s => s.grade === 'ថ្នាក់ទី ៥').length,
    'ថ្នាក់ទី ៦': studentList.filter(s => s.grade === 'ថ្នាក់ទី ៦').length,
  };

  const maxGradeCount = Math.max(...Object.values(gradeDistribution), 1);

  // Calculating overall passing percentage among students who have records
  const totalGradeRecords = recordsList.length;
  const passedGroup = recordsList.filter(r => {
    const avg = (r.khmerScore + r.mathScore + r.scienceScore + r.socialScore) / 4;
    return avg >= 50;
  });
  const passedPercentage = totalGradeRecords > 0 
    ? Math.round((passedGroup.length / totalGradeRecords) * 100) 
    : 100;

  const totalScoresWithRecords = recordsList.map(r => (r.khmerScore + r.mathScore + r.scienceScore + r.socialScore) / 4);
  const overallAvgScores = totalScoresWithRecords.length > 0 
    ? totalScoresWithRecords.reduce((a, b) => a + b, 0) / totalScoresWithRecords.length 
    : 0;

  const getStudentResultDetails = (studentId: string) => {
    const student = studentList.find(s => s.id === studentId);
    const record = recordsList.find(r => r.studentId === studentId);
    if (!student || !record) return null;

    const average = Math.round((record.khmerScore + record.mathScore + record.scienceScore + record.socialScore) / 4);
    
    let gradeLetter = 'F';
    let khmerMention = 'ខ្សោយ';
    let textStyle = 'text-rose-400';
    let badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

    if (average >= 90) {
      gradeLetter = 'A';
      khmerMention = 'ល្អប្រសើរ';
      textStyle = 'text-emerald-400';
      badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    } else if (average >= 80) {
      gradeLetter = 'B';
      khmerMention = 'ល្អណាស់';
      textStyle = 'text-indigo-400';
      badgeStyle = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    } else if (average >= 70) {
      gradeLetter = 'C';
      khmerMention = 'ល្អ';
      textStyle = 'text-blue-400';
      badgeStyle = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    } else if (average >= 60) {
      gradeLetter = 'D';
      khmerMention = 'ល្អបង្គួរ';
      textStyle = 'text-amber-400';
      badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    } else if (average >= 50) {
      gradeLetter = 'E';
      khmerMention = 'មធ្យម';
      textStyle = 'text-orange-400';
      badgeStyle = 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    }

    return { student, record, average, gradeLetter, khmerMention, textStyle, badgeStyle };
  };


  useEffect(() => {
    // Inject @media print custom rules directly
    const styleId = 'print-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #single-staff-print-area, #single-staff-print-area * {
            visibility: visible;
          }
          #single-staff-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div id="school-mgmt-root" className="min-h-screen bg-[#05070f] bg-gradient-to-br from-[#0c0f1e] via-[#05070f] to-[#120a21] text-slate-100 flex flex-col md:flex-row antialiased font-sans ambient-glowing-dots relative overflow-x-hidden">
      
      {/* Toast Alert Portal */}
      {toast && (
        <div id="toast-notify" className="fixed top-5 right-5 z-50 flex items-center space-x-3 glass-panel-heavy p-4 rounded-xl shadow-[0_12px_40px_rgba(31,38,135,0.4)] border border-white/20 animate-bounce">
          {toast.type === 'success' && <CheckCircle className="text-emerald-400 shrink-0" size={20} />}
          {toast.type === 'info' && <AlertCircle className="text-indigo-400 shrink-0" size={20} />}
          {toast.type === 'error' && <X className="text-rose-400 shrink-0" size={20} />}
          <p className="text-xs font-semibold text-white">{toast.message}</p>
        </div>
      )}

      {/* --- Sidebar Menu Section --- */}
      <aside id="sidebar" className="w-full md:w-72 glass-sidebar flex flex-col justify-between shrink-0 z-10">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
            <div className="bg-gradient-to-tr from-indigo-500 to-indigo-750 p-2.5 rounded-xl shadow-[0_4px_15px_rgba(99,102,241,0.25)] border border-indigo-400/20">
              <School className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-md font-extrabold tracking-wide text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">បឋមសិក្សាសំរោង</h1>
              <span className="text-[9px] text-indigo-300 uppercase tracking-widest font-mono font-medium">ប្រព័ន្ធគ្រប់គ្រងសាលា</span>
            </div>
          </div>

          {/* Quick Date Indicator */}
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-indigo-300" />
              <span className="text-[11px] text-slate-300">{new Date().toLocaleDateString('km-KH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 px-2.5 py-0.5 rounded-full text-[9px] font-semibold">
              ឆមាសទី ១
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button 
              id="btn-nav-dashboard"
              onClick={() => setActiveTab(0)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                activeTab === 0 
                  ? 'glass-pill-active font-medium' 
                  : 'glass-pill-inactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <Database size={16} />
                <span>ផ្ទាំងគ្រប់គ្រង (Overview)</span>
              </div>
              <ArrowRight size={13} className={`opacity-0 transition-all ${activeTab === 0 ? 'opacity-100 translate-x-1' : ''}`} />
            </button>

            <button 
              id="btn-nav-staff"
              onClick={() => setActiveTab(1)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                activeTab === 1 
                  ? 'glass-pill-active font-medium' 
                  : 'glass-pill-inactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={16} />
                <span>ទិន្នន័យបុគ្គលិក (Staff)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/10 border border-white/5 text-[9px] px-1.5 py-0.5 rounded-full text-slate-300">{staffList.length}</span>
                <ArrowRight size={13} className={`opacity-0 transition-all ${activeTab === 1 ? 'opacity-100 translate-x-1' : ''}`} />
              </div>
            </button>

            <button 
              id="btn-nav-students"
              onClick={() => setActiveTab(2)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                activeTab === 2 
                  ? 'glass-pill-active font-medium' 
                  : 'glass-pill-inactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap size={16} />
                <span>ទិន្នន័យសិស្ស (Students)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/10 border border-white/5 text-[9px] px-1.5 py-0.5 rounded-full text-slate-300">{studentList.length}</span>
                <ArrowRight size={13} className={`opacity-0 transition-all ${activeTab === 2 ? 'opacity-100 translate-x-1' : ''}`} />
              </div>
            </button>

            <button 
              id="btn-nav-grades"
              onClick={() => setActiveTab(3)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                activeTab === 3 
                  ? 'glass-pill-active font-medium' 
                  : 'glass-pill-inactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp size={16} />
                <span>លទ្ធផលសិក្សា (Results)</span>
              </div>
              <ArrowRight size={13} className={`opacity-0 transition-all ${activeTab === 3 ? 'opacity-100 translate-x-1' : ''}`} />
            </button>
          </nav>
        </div>

        {/* School Footer Branding */}
        <div className="p-6 border-t border-white/5 bg-white/[0.01] text-[11px] text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">សាលាបឋមសិក្សាសំរោង</p>
          <p>© {new Date().getFullYear()} All Rights Reserved.</p>
          <p className="text-[9px] text-slate-500 font-mono">Version 2.4.0 (Glass)</p>
        </div>
      </aside>

      {/* --- Main Dashboard Container --- */}
      <main id="main-content" className="flex-1 flex flex-col min-w-0 bg-transparent overflow-y-auto z-10">
        
        {/* Universal Top Bar Header */}
        <header id="top-bar" className="h-16 glass-header px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div>
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              {activeTab === 0 && 'ផ្ទាំងគ្រប់គ្រងទូទៅ'}
              {activeTab === 1 && 'ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក និងលោកគ្រូ-អ្នកគ្រូ'}
              {activeTab === 2 && 'ប្រព័ន្ធគ្រប់គ្រង និងតាមដានព័ត៌មានសិស្ស'}
              {activeTab === 3 && 'ប្រព័ន្ធគ្រប់គ្រង និងស្វែងរកលទ្ធផលសិក្សា'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quick school activity notifications */}
            <div className="relative group cursor-pointer p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition">
              <Bell size={18} className="text-slate-400 hover:text-slate-200" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#05070f]"></span>
            </div>

            {/* Profile Dropdown avatar mock */}
            <div className="flex items-center gap-3 border-l border-white/5 pl-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-slate-950 shadow-[0_4px_12px_rgba(99,102,241,0.3)] border border-indigo-300/20 text-xs">
                គត
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-slate-200">គង់ ថារី</p>
                <p className="text-[9.5px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  ម៉ោងសិក្សាធម្មតា
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Fluid Content Canvas */}
        <div id="canvas-content" className="p-6 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          
          {/* ======================================= */}
          {/* TAB 0: OVERVIEW / DASHBOARD GENERAL INFO */}
          {/* ======================================= */}
          {activeTab === 0 && (
            <div id="tab-overview" className="space-y-6 animate-fadeIn">
              
              {/* Top Row: Split cards design to look modular (ដាច់ៗពីគ្នា មិនធំស្កឹមស្កៃពេក) */}
              <div id="top-portal-row" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* 1. School Information Card */}
                <div id="school-info-card" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0e1a] to-[#121630] border border-indigo-500/15 p-6 flex flex-col justify-between min-h-[290px] shadow-[0_12px_36px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent)] z-0"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[11px] font-bold">
                      <School size={12} className="text-amber-400" />
                      <span>ព័ត៌មានទូទៅ</span>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
                        សាលាបឋមសិក្សាសំរោង
                      </h3>
                      <p className="text-[11px] text-amber-400 font-sans">
                        ក្រុងសំរោង ខេត្តឧត្តរមានជ័យ
                      </p>
                    </div>
                    
                    <p className="text-xs text-slate-350 leading-relaxed font-light antialiased">
                      សាលាបឋមសិក្សាសំរោង គឺជាថ្នាលបណ្តុះបណ្តាលចំណេះដឹង គុណធម៌ និងវិន័យដ៏ចម្បងក្នុងសហគមន៍តាំងពីឆ្នាំ ១៩៥៨។ យើងប្តេជ្ញាចិត្តផ្តល់ការអប់រំប្រកបដោយសមធម៌ និងការច្នៃប្រឌិតខ្ពស់។
                    </p>
                  </div>

                  <div className="relative z-10 pt-4">
                    <button 
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="flex items-center justify-center gap-2 group px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-indigo-300 hover:text-white transition duration-300 font-bold text-[11.5px] cursor-pointer active:scale-95 w-full"
                    >
                      <Clock size={12} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                      <span>អានប្រវត្តិសាលាពេញលេញ</span>
                    </button>
                  </div>
                </div>

                {/* 2. Core Pillars Card (Separated) */}
                <div id="core-pillars-card" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0c16] to-[#10132c] border border-indigo-500/15 p-6 flex flex-col justify-between min-h-[290px] shadow-[0_12px_36px_rgba(0,0,0,0.3)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.06),transparent)] z-0"></div>
                  
                  <div className="relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-[11px] font-bold">
                      <Award size={12} className="text-emerald-400" />
                      <span>គុណតម្លៃស្នូល</span>
                    </div>
                    <p className="text-[11.5px] text-slate-400 font-light leading-snug">
                      ទិសដៅយុទ្ធសាស្ត្រ និងគុណធម៌ចម្បងទាំង ៣ របស់សាលា៖
                    </p>
                  </div>

                  <div className="relative z-10 space-y-2.5 my-2">
                    {/* Pillar 1 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/5 hover:border-indigo-500/15 transition duration-200">
                      <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0"></span>
                      <div className="text-left">
                        <span className="text-xs font-black text-amber-400">ចំណេះដឹង</span>
                        <span className="text-[10px] text-slate-450 ml-2 font-light">ស្វែងយល់គ្មានដែនកំណត់</span>
                      </div>
                    </div>
                    {/* Pillar 2 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/5 hover:border-indigo-500/15 transition duration-200">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0"></span>
                      <div className="text-left">
                        <span className="text-xs font-black text-emerald-400">គុណធម៌</span>
                        <span className="text-[10px] text-slate-450 ml-2 font-light">អត្តចរិតល្អ សេចក្តីថ្លៃថ្នូរ</span>
                      </div>
                    </div>
                    {/* Pillar 3 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-500/5 hover:border-indigo-500/15 transition duration-200">
                      <span className="h-2 w-2 rounded-full bg-violet-400 shrink-0"></span>
                      <div className="text-left">
                        <span className="text-xs font-black text-violet-400">វិន័យ</span>
                        <span className="text-[10px] text-slate-450 ml-2 font-light">គោរពច្បាប់ និងពេលវេលា</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-2"></div>
                </div>

                {/* 3. Elegant Public Service Award Showcase Card (Oddar Meanchey Certificate) */}
                <div id="school-award-showcase-panel" className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1b1509] via-[#2a1f0d] to-[#120e06] border border-amber-500/30 p-6 flex flex-col justify-between min-h-[290px] shadow-[0_15px_40px_rgba(245,158,11,0.12),inset_0_1px_2px_rgba(255,255,255,0.08)] group text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.08),transparent)] z-0"></div>
                  
                  <div className="absolute top-3 right-3 bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md text-[8.5px] font-black tracking-wider uppercase z-10 font-sans">
                    ពានរង្វាន់ជាតិ
                  </div>

                  <div className="relative z-10 space-y-3.5">
                    {/* Glowing Big Gold Badge icon */}
                    <div className="relative inline-flex items-center justify-center mt-1">
                      <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full scale-110 group-hover:scale-120 transition-transform duration-500"></div>
                      <div className="relative bg-gradient-to-b from-amber-400 to-amber-600 p-3 rounded-xl border border-amber-300/40 shadow-lg text-slate-950">
                        <Award size={24} className="stroke-[1.8] animate-pulse" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-amber-500 border border-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full text-slate-950 shadow-md">
                        #៩
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-amber-400 font-extrabold text-[11px] tracking-wider">
                        ជ័យលាភីអង្គភាពផ្តល់សេវាគំរូ
                      </h4>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                        ចំណាត់ថ្នាក់ថ្នាក់ជាតិ លេខ ៩
                      </h3>
                      <p className="text-[10.5px] text-slate-350 leading-relaxed font-light">
                        សាលាបឋមសិក្សាសំរោង ទទួលបានពានរង្វាន់គំរូថ្នាក់ជាតិ សម្រាប់ឆ្នាំសិក្សា ២០២៣។
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-amber-500/25">
                    <button 
                      onClick={() => setIsAwardModalOpen(true)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-550 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-950/30 transition active:scale-95 cursor-pointer border border-amber-300/20"
                    >
                      <Award size={12} className="stroke-[2.5]" />
                      <span>បង្ហាញវិញ្ញាបនបត្រជ័យលាភី</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Glowing Interactive Score Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metric Card 1: Teachers */}
                <div className="bg-slate-950/70 backdrop-blur-md rounded-2xl border border-indigo-500/10 p-6 flex items-center justify-between shadow-xl hover:shadow-indigo-950/40 transition duration-300 group hover:border-indigo-500/20">
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-slate-300 font-bold">គ្រូបង្រៀន & បុគ្គលិក</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#ffffff] font-mono tracking-tight">{totalStaffCount}</span>
                      <span className="text-sm font-bold text-slate-400">នាក់</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-semibold text-emerald-400">កំពុងសកម្ម {activeStaffCount} នាក់</span>
                    </div>
                  </div>
                  <div className="bg-indigo-500/10 p-3.5 rounded-xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-slate-950 transition duration-300">
                    <Users size={24} />
                  </div>
                </div>

                {/* Metric Card 2: Total Students */}
                <div className="bg-slate-950/70 backdrop-blur-md rounded-2xl border border-indigo-500/10 p-6 flex items-center justify-between shadow-xl hover:shadow-indigo-950/40 transition duration-300 group hover:border-indigo-500/20">
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-slate-300 font-bold">សិស្សសរុប</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-[#ffffff] font-mono tracking-tight">{totalStudentsCount}</span>
                      <span className="text-sm font-bold text-slate-400">នាក់</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                      <span className="text-xs font-semibold text-emerald-400">កំពុងរៀន {activeStudentsCount} នាក់</span>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 p-3.5 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition duration-300">
                    <GraduationCap size={24} />
                  </div>
                </div>

                {/* Metric Card 3: Study Avg GPA */}
                <div className="bg-slate-950/70 backdrop-blur-md rounded-2xl border border-indigo-500/10 p-6 flex items-center justify-between shadow-xl hover:shadow-indigo-950/40 transition duration-300 group hover:border-indigo-500/20">
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-slate-300 font-bold">អត្រាជាប់ឆមាស</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">{passedPercentage}%</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                      <span className="text-xs font-semibold text-indigo-400">លទ្ធផលជាមធ្យមគ្រប់ថ្នាក់</span>
                    </div>
                  </div>
                  <div className="bg-teal-500/10 p-3.5 rounded-xl text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-950 transition duration-300">
                    <TrendingUp size={24} />
                  </div>
                </div>

                {/* Metric Card 4: Excellent Ratio */}
                <div className="bg-slate-950/70 backdrop-blur-md rounded-2xl border border-indigo-500/10 p-6 flex items-center justify-between shadow-xl hover:shadow-indigo-950/40 transition duration-300 group hover:border-indigo-500/20">
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base text-slate-300 font-bold">ពិន្ទុមធ្យមភាគរួម</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-mono tracking-tight">{overallAvgScores > 0 ? overallAvgScores.toFixed(1) : '០.០'}</span>
                      <span className="text-sm font-bold text-slate-400">/១០០</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="h-2 w-2 rounded-full bg-amber-450"></span>
                      <span className="text-xs font-semibold text-[#f59e0b]">ផ្អែកលើការវាយតម្លៃចុងក្រោយ</span>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 p-3.5 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300">
                    <Award size={22} />
                  </div>
                </div>

              </div>

              {/* Data Visualization & Events Double Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SVG Enrollment Distribution Chart */}
                <div className="lg:col-span-2 bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-slate-200">ការបែងចែកសិស្សតាមកម្រងថ្នាក់ ( Grades 1 - 6 )</h4>
                      <BookOpen size={16} className="text-indigo-400" />
                    </div>
                    <p className="text-xs text-slate-400 mb-6 font-light">
                      ស្ថិតិនៃចំនួនសិស្សសរុបដែលបានចុះឈ្មោះបែងចែកតាមកម្រិតថ្នាក់នីមួយៗក្នុងឆ្នាំសិក្សា ២០២៦។
                    </p>
                  </div>

                  {/* Fully responsive design graph inside custom SVG wrapper */}
                  <div className="space-y-4">
                    {Object.entries(gradeDistribution).map(([gradeName, count]) => {
                      const barPercentage = Math.max((count / maxGradeCount) * 100, 4);
                      return (
                        <div key={gradeName} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-slate-300">{gradeName}</span>
                            <span className="text-slate-400 font-mono">{count} នាក់</span>
                          </div>
                          <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                            <div 
                              style={{ width: `${barPercentage}%` }}
                              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 shadow-lg min-w-[2%]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-[10px] text-slate-500 mt-6 pt-4 border-t border-slate-800/40 text-center font-mono">
                    កាលបរិច្ឆេទធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ {new Date().toLocaleDateString('km-KH')}
                  </div>
                </div>

                {/* Information / Event Calendar Feed widget */}
                <div className="bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
                      <Clock size={16} className="text-amber-400" />
                      ព្រឹត្តិការណ៍ & សកម្មភាពសាលា
                    </h4>
                    
                    <div className="space-y-4">
                      
                      {/* Activity 1 */}
                      <div className="flex gap-3 border-l-2 border-indigo-500/45 pl-3 py-1">
                        <div>
                          <p className="text-xs text-slate-400 font-mono">ថ្ងៃទី ១២ មិថុនា ២០២៦</p>
                          <p className="text-xs font-semibold text-slate-200">ប្រឡងឆមាសទី ១</p>
                          <p className="text-[10.5px] text-slate-400 mt-1">ការប្រឡងចុងឆមាសដំបូងសម្រាប់សិស្សថ្នាក់ទី ១ ដល់ថ្នាក់ទី ៦។</p>
                        </div>
                      </div>

                      {/* Activity 2 */}
                      <div className="flex gap-3 border-l-2 border-amber-500/45 pl-3 py-1">
                        <div>
                          <p className="text-xs text-slate-400 font-mono">ថ្ងៃទី ២៥ មិថុនា ២០២៦</p>
                          <p className="text-xs font-semibold text-slate-200">កិច្ចប្រជុំមាតាបិតាសិស្ស</p>
                          <p className="text-[10.5px] text-slate-400 mt-1">ជួបពិភាក្សាអំពីវឌ្ឍនភាពនៃការសិក្សារបស់កូនៗជាមួយលោកគ្រូអ្នកគ្រូ។</p>
                        </div>
                      </div>

                      {/* Activity 3 */}
                      <div className="flex gap-3 border-l-2 border-emerald-500/45 pl-3 py-1">
                        <div>
                          <p className="text-xs text-slate-400 font-mono">ថ្ងៃទី ០៥ កក្កដា ២០២៦</p>
                          <p className="text-xs font-semibold text-slate-200">ទិវាពលកម្មសាលាស្អាត</p>
                          <p className="text-[10.5px] text-slate-400 mt-1">សកម្មភាពរួមគ្នាលើកកម្ពស់អនាម័យបរិស្ថានក្នុង និងក្រៅសាលារៀន។</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/40 text-center">
                    <button 
                      onClick={() => showToast('ប្រព័ន្ធប្រតិទិនសកម្មភាពកំពុងស្ថិតក្នុងការសាកល្បង', 'info')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                    >
                      មើលប្រតិទិនពេញលេញ →
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================= */}
          {/* TAB 1: STAFF DATA SECTION                */}
          {/* ======================================= */}
          {activeTab === 1 && (
            <div id="tab-staff" className="space-y-6 animate-fadeIn">
              
              {/* Cambodian Staff Statistics Charts Dashboard */}
              <StaffCharts staffStats={staffStats} />

              {/* Filter and Command Hub bar */}
              <div className="bg-slate-950/50 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Box inputs */}
                <div className="relative w-full md:w-96">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-slate-400" size={17} />
                  </span>
                  <input 
                    type="text" 
                    id="input-search-staff"
                    placeholder="ស្វែងរកតាមឈ្មោះ មុខតំណែង ទូរស័ព្ទ..."
                    value={staffSearchQuery}
                    onChange={(e) => setStaffSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  {staffSearchQuery && (
                    <button 
                      onClick={() => setStaffSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <X className="text-slate-400 hover:text-slate-200" size={15} />
                    </button>
                  )}
                </div>

                {/* Filter and Add Hub buttons */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center space-x-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                    <Filter size={14} className="text-indigo-400" />
                    <span className="text-slate-400">ស្ថានភាព៖</span>
                    <select 
                      id="select-filter-staff-status"
                      value={staffStatusFilter}
                      onChange={(e) => setStaffStatusFilter(e.target.value)}
                      className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                    >
                      <option value="ទាំងអស់" className="bg-slate-950">ទាំងអស់ (All)</option>
                      <option value="សកម្ម" className="bg-slate-950">សកម្ម (Active)</option>
                      <option value="ឈប់សម្រាក" className="bg-slate-950">ឈប់សម្រាក (On Leave)</option>
                    </select>
                  </div>

                  
                  <button 
                    onClick={handleSyncGoogleSheet}
                    disabled={isSyncing}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
                    <span>{isSyncing ? 'កំពុងទាញយក...' : 'ទាញទិន្នន័យពី G-Sheet'}</span>
                  </button>

                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
                    <button 
                      onClick={() => setStaffViewMode('card')}
                      className={`p-2 rounded-lg transition-all ${staffViewMode === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      title="បង្ហាញជាកាត (Cards)"
                    >
                      <Grid size={15} />
                    </button>
                    <button 
                      onClick={() => setStaffViewMode('table')}
                      className={`p-2 rounded-lg transition-all ${staffViewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                      title="បង្ហាញជាតារាង (Table)"
                    >
                      <Table size={15} />
                    </button>
                    <button 
                      onClick={() => setStaffViewMode('inquiry')}
                      className={`p-2 px-3 rounded-lg transition-all flex items-center gap-1.5 text-[11px] font-bold ${staffViewMode === 'inquiry' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
                      title="សាលាកបត្រព័ត៌មាន (Inquiry Profile Card)"
                    >
                      <FileText size={14} className="text-amber-400 shrink-0" strokeWidth={2.5} />
                      <span className="hidden md:inline">សាលាកបត្រព័ត៌មាន</span>
                    </button>
                  </div>

                  <button 
                    id="btn-add-staff-modal"
                    onClick={handleOpenAddStaff}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition transform active:scale-95 cursor-pointer ml-auto md:ml-0"
                  >
                    <Plus size={15} />
                    <span>បន្ថែមបុគ្គលិក</span>
                  </button>
                </div>

              </div>

              
              {/* Table / Grid list of Staff */}
              {staffViewMode === 'card' ? (
                /* Breathtakingly Grid of Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn pb-10">
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff) => (
                      <div 
                        key={staff.id} 
                        onClick={() => setViewingStaffDetail(staff)}
                        className="glass-panel hover:border-indigo-500/40 transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.015] hover:shadow-2xl hover:bg-slate-900/40"
                        title="ចុចទីនេះដើម្បីបើកមើលបណ្ណព័ត៌មានលម្អិត"
                      >
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        
                        <div>
                          <div className="flex items-start gap-4 mb-4">
                            <div className={`h-12 w-12 rounded-full ${staff.avatarBg || 'bg-indigo-600'} text-slate-950 flex items-center justify-center font-bold text-sm shadow-xl shrink-0 border border-white/10 uppercase relative overflow-hidden`}>
                              {staff.photoUrl && !staffImageErrors[staff.id] ? (
                                <img
                                  src={staff.photoUrl}
                                  alt={staff.nameKhmer}
                                  className="absolute inset-0 h-full w-full object-cover rounded-full"
                                  referrerPolicy="no-referrer"
                                  onError={() => setStaffImageErrors(prev => ({ ...prev, [staff.id]: true }))}
                                />
                              ) : (
                                <span>{staff.nameKhmer.replace(/\s+/g, '').substring(0, 2)}</span>
                              )}
                            </div>
                            <div className="space-y-0.5 min-w-0 flex-1">
                              <h5 className="font-extrabold text-[#ffffff] text-xs tracking-wide leading-tight truncate">{staff.nameKhmer}</h5>
                              <p className="text-[9.5px] text-slate-400 font-mono font-medium uppercase truncate">{staff.nameEnglish}</p>
                              <div className="flex items-center gap-1 mt-1 flex-wrap">
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-bold border border-white/5">
                                  ID: {staff.id}
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 rounded ${staff.gender === 'ប្រុស' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/25' : 'bg-rose-500/10 text-rose-300 border border-rose-500/25'}`}>
                                  {staff.gender}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1 mb-4">
                            <div className="flex flex-wrap gap-1">
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-extrabold shadow-sm">
                                {staff.position}
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                {staff.teacherType}
                              </span>
                              <span className="text-[9px] px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
                                {staff.educationLevel}
                              </span>
                            </div>
                          </div>

                          <div className="border-t border-white/5 pt-4 space-y-2 text-[10.5px] text-slate-300">
                            <div className="flex items-center gap-2 font-mono">
                              <Phone size={11} className="text-slate-400 shrink-0" />
                              <a href={`tel:${staff.phone}`} onClick={(e) => e.stopPropagation()} className="hover:text-indigo-400 transition">{staff.phone}</a>
                            </div>
                            <div className="flex items-center gap-2 font-mono">
                              <Mail size={11} className="text-slate-400 shrink-0" />
                              <a href={`mailto:${staff.email}`} onClick={(e) => e.stopPropagation()} className="hover:text-indigo-400 transition truncate" title={staff.email}>{staff.email}</a>
                            </div>

                            {staff.birthDate && (
                              <div className="flex items-start gap-2">
                                <Calendar size={11} className="text-slate-400 shrink-0 mt-0.5" />
                                <div className="leading-tight">
                                  <span className="text-slate-400 text-[9px]">ថ្ងៃកំណើត៖</span> <span className="font-mono text-slate-200">{staff.birthDate}</span>
                                </div>
                              </div>
                            )}

                            {staff.birthPlace && (
                              <div className="flex items-start gap-2">
                                <MapPin size={11} className="text-slate-400 shrink-0 mt-0.5" />
                                <div className="leading-tight">
                                  <span className="text-slate-400 text-[9px]">ទីកំណើត៖</span> <span className="text-slate-200">{staff.birthPlace}</span>
                                </div>
                              </div>
                            )}

                            {staff.address && (
                              <div className="flex items-start gap-2">
                                <MapPin size={11} className="text-slate-400 shrink-0 mt-0.5" />
                                <div className="leading-tight flex-1">
                                  <span className="text-slate-400 text-[9px]">អាសយដ្ឋាន៖</span> <span className="text-slate-200">{staff.address}</span>
                                </div>
                              </div>
                            )}

                            {staff.bankAccount && (
                              <div className="flex items-center justify-between bg-slate-950 border border-slate-800/60 rounded-lg p-2 max-w-full" onClick={(e) => e.stopPropagation()}>
                                <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1 shrink-0">
                                  <CreditCard size={10} className="text-slate-500" /> Pay ID:
                                </span>
                                <span className="font-mono text-[10px] font-bold text-emerald-300 select-all truncate px-1">{staff.bankAccount}</span>
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(staff.bankAccount || '');
                                    showToast('បានចម្លងគណនីបៀវត្សរួចរាល់!', 'success');
                                  }}
                                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded transition cursor-pointer"
                                  title="ចម្លងគណនី"
                                >
                                  <Copy size={10} />
                                </button>
                              </div>
                            )}

                            {staff.nationalId && (
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-[9px]">អត្តសញ្ញាណបណ្ណ៖</span> <span className="font-semibold text-slate-200 font-mono">{staff.nationalId}</span>
                              </div>
                            )}

                            {staff.profLevel && (
                              <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-[9px]">កម្រិតវិជ្ជាជីវៈ៖</span> <span className="text-indigo-300 leading-none">{staff.profLevel}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-[9px] text-slate-400 border-t border-white/5 pt-2">
                              <span>ចូលបម្រើការ៖</span>
                              <span className="font-mono text-slate-300">{staff.joinDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-white/5 shrink-0">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border ${
                            staff.status === 'សកម្ម' 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                          }`}>
                            <span className={`h-1 w-1 rounded-full ${staff.status === 'សកម្ម' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                            {staff.status}
                          </span>

                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button 
                              title="ព្រីនប្រវត្តិរូប"
                              onClick={() => handlePrintSingleStaff(staff)}
                              className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-emerald-550 hover:text-emerald-400 text-slate-400 transition cursor-pointer"
                            >
                              <Printer size={12} />
                            </button>
                            <button 
                              title="កែប្រែ"
                              onClick={() => {
                                setEditingStaff(staff);
                                setIsStaffModalOpen(true);
                              }}
                              className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-indigo-550/45 text-slate-400 hover:text-indigo-450 transition cursor-pointer"
                            >
                              <Edit size={12} />
                            </button>
                            <button 
                              title="លុប"
                              onClick={() => handleDeleteStaff(staff.id, staff.nameKhmer)}
                              className="p-1 rounded bg-slate-900 border border-slate-800 hover:border-rose-550/45 text-slate-400 hover:text-rose-455 transition cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-16 text-center text-slate-500 font-light text-xs bg-slate-950/20 rounded-2xl border border-dashed border-slate-800">
                      មិនមានទិន្នន័យបុគ្គលិកដែលអ្នកស្វែងរកទេ។
                    </div>
                  )}
                </div>
              ) : staffViewMode === 'table' ? (
                /* Traditional Table view - keep as optional toggle! */
                <div className="bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/80 border-b border-indigo-500/10 text-xs text-slate-400 font-semibold">
                          <th className="p-4 pl-6 text-center w-16">កូដ</th>
                          <th className="p-4">ព័ត៌មានលម្អិត</th>
                          <th className="p-4">មុខតំណែង</th>
                          <th className="p-4">ទំនាក់ទំនង</th>
                          <th className="p-4 text-center">ថ្ងៃចូលបម្រើការ</th>
                          <th className="p-4 text-center">ស្ថានភាព</th>
                          <th className="p-4 text-center w-28">សកម្មភាព</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                        {filteredStaff.length > 0 ? (
                          filteredStaff.map((staff) => (
                            <tr 
                              key={staff.id} 
                              onClick={() => setViewingStaffDetail(staff)}
                              className="hover:bg-slate-900/40 transition cursor-pointer"
                              title="ចុចទីនេះដើម្បីមើលបណ្ណព័ត៌មានលម្អិត"
                            >
                              <td className="p-4 pl-6 text-center font-mono font-semibold text-indigo-400">
                                {staff.id}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className={`h-10 w-10 rounded-full ${staff.avatarBg || 'bg-indigo-600'} text-slate-950 flex items-center justify-center font-bold text-sm shadow-inner uppercase relative overflow-hidden`}>
                                    {staff.photoUrl && !staffImageErrors[staff.id] ? (
                                      <img
                                        src={staff.photoUrl}
                                        alt={staff.nameKhmer}
                                        className="absolute inset-0 h-full w-full object-cover rounded-full"
                                        referrerPolicy="no-referrer"
                                        onError={() => setStaffImageErrors(prev => ({ ...prev, [staff.id]: true }))}
                                      />
                                    ) : (
                                      <span>{staff.nameKhmer.replace(/\s+/g, '').substring(0, 2)}</span>
                                    )}
                                  </div>
                                  <div className="space-y-0.5">
                                    <p className="font-bold text-slate-200">{staff.nameKhmer}</p>
                                    <p className="text-[10.5px] text-slate-400 font-mono uppercase">{staff.nameEnglish} ({staff.gender})</p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="space-y-1 flex flex-col items-start">
                                  <span className="font-semibold text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                                    {staff.position}
                                  </span>
                                  <div className="flex flex-wrap gap-1">
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium">
                                      {staff.teacherType}
                                    </span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                                      {staff.educationLevel}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 space-y-1" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-1.5 text-slate-300 font-mono">
                                  <Phone size={12} className="text-slate-500" />
                                  <a href={`tel:${staff.phone}`} className="hover:text-amber-400 transition">{staff.phone}</a>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400 font-mono">
                                  <Mail size={12} className="text-slate-500" />
                                  <a href={`mailto:${staff.email}`} className="hover:text-amber-400 transition">{staff.email}</a>
                                </div>
                              </td>
                              <td className="p-4 text-center font-mono text-slate-400">
                                {staff.joinDate}
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                  staff.status === 'សកម្ម' 
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                                }`}>
                                  <span className={`h-1 w-1 rounded-full ${staff.status === 'សកម្ម' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                                  {staff.status}
                                </span>
                              </td>
                              <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-center gap-2">
                                  <button 
                                    title="កែប្រែ"
                                    onClick={() => {
                                      setEditingStaff(staff);
                                      setIsStaffModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-indigo-400 transition cursor-pointer"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button 
                                    title="លុប"
                                    onClick={() => handleDeleteStaff(staff.id, staff.nameKhmer)}
                                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/45 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-slate-500 font-light text-xs">
                              មិនមានទិន្នន័យបុគ្គលិកដែលអ្នកស្វែងរកទេ។
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <StaffInquiryCard 
                  staffList={staffList} 
                  onUpdateStaff={(updatedStaff) => {
                    setStaffList(prevList => prevList.map(s => s.id === updatedStaff.id ? updatedStaff : s));
                  }} 
                  showToast={showToast}
                />
              )}
            </div>
          )}
          {/* ======================================= */}
          {/* TAB 2: STUDENT DATA SECTION              */}
          {/* ======================================= */}
          {activeTab === 2 && (
            <div id="tab-students" className="space-y-6 animate-fadeIn">
              
              {/* Complex Command and Query Control board */}
              <div className="bg-slate-950/50 backdrop-blur-lg border border-indigo-500/10 rounded-2xl p-5 shadow-xl flex flex-col xl:flex-row gap-4 items-center justify-between">
                
                {/* ID and Name search input */}
                <div className="relative w-full xl:w-80">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-slate-400" size={17} />
                  </span>
                  <input 
                    type="text" 
                    id="input-search-students"
                    placeholder="ស្វែងរកតាមឈ្មោះ ឪពុកម្តាយ លេខកូដ..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  {studentSearchQuery && (
                    <button 
                      onClick={() => setStudentSearchQuery('')}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <X className="text-slate-400 hover:text-slate-200" size={15} />
                    </button>
                  )}
                </div>

                {/* Interactive dropdown filtering parameters */}
                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto xl:justify-end">
                  
                  {/* Select Grade level */}
                  <div className="flex items-center space-x-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                    <BookOpen size={14} className="text-indigo-400" />
                    <span className="text-slate-400">កម្រិតថ្នាក់៖</span>
                    <select 
                      id="select-filter-student-grade"
                      value={studentGradeFilter}
                      onChange={(e) => setStudentGradeFilter(e.target.value)}
                      className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs animate-none"
                    >
                      <option value="ទាំងអស់" className="bg-slate-950">ទាំងអស់ (All)</option>
                      <option value="ថ្នាក់ទី ១" className="bg-slate-950">ថ្នាក់ទី ១</option>
                      <option value="ថ្នាក់ទី ២" className="bg-slate-950">ថ្នាក់ទី ២</option>
                      <option value="ថ្នាក់ទី ៣" className="bg-slate-950">ថ្នាក់ទី ៣</option>
                      <option value="ថ្នាក់ទី ៤" className="bg-slate-950">ថ្នាក់ទី ៤</option>
                      <option value="ថ្នាក់ទី ៥" className="bg-slate-950">ថ្នាក់ទី ៥</option>
                      <option value="ថ្នាក់ទី ៦" className="bg-slate-950">ថ្នាក់ទី ៦</option>
                    </select>
                  </div>

                  {/* Select Enrollment Status */}
                  <div className="flex items-center space-x-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-xs">
                    <UserCheck size={14} className="text-indigo-400" />
                    <span className="text-slate-400">ស្ថានភាព៖</span>
                    <select 
                      id="select-filter-student-status"
                      value={studentStatusFilter}
                      onChange={(e) => setStudentStatusFilter(e.target.value)}
                      className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs animate-none"
                    >
                      <option value="ទាំងអស់" className="bg-slate-950">ទាំងអស់ (All)</option>
                      <option value="កំពុងរៀន" className="bg-slate-950">កំពុងរៀន (Active)</option>
                      <option value="ព្យួរការសិក្សា" className="bg-slate-950">ព្យួរការសិក្សា (Suspended)</option>
                      <option value="ឈប់រៀន" className="bg-slate-950">ឈប់រៀន (Dropped)</option>
                    </select>
                  </div>

                  <button 
                    id="btn-add-student-modal"
                    onClick={handleOpenAddStudent}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition transform active:scale-95 cursor-pointer ml-auto xl:ml-0"
                  >
                    <Plus size={15} />
                    <span>បញ្ចូលទិន្នន័យសិស្ស</span>
                  </button>
                </div>

              </div>

              {/* Spread-sheet style student Directory table */}
              <div className="bg-slate-950/60 backdrop-blur-lg border border-indigo-500/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950/80 border-b border-indigo-500/10 text-xs text-slate-400 font-semibold sticky top-0 z-10 backdrop-blur">
                        <th className="p-4 pl-6 text-center w-16">កូដ</th>
                        <th className="p-4">ឈ្មោះសិស្ស</th>
                        <th className="p-4 text-center">ភេទ</th>
                        <th className="p-4 text-center">កម្រិតថ្នាក់</th>
                        <th className="p-4">អាណាព្យាបាល (ឪពុក/ម្តាយ)</th>
                        <th className="p-4">លេខទូរស័ព្ទ</th>
                        <th className="p-4 max-w-xs truncate">អាសយដ្ឋាន</th>
                        <th className="p-4 text-center">ស្ថានភាព</th>
                        <th className="p-4 text-center w-28 font-semibold">សកម្មភាព</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((stud) => (
                          <tr key={stud.id} className="hover:bg-slate-900/40 transition">
                            <td className="p-4 pl-6 text-center font-mono font-semibold text-indigo-400">
                              {stud.id}
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-slate-200">{stud.nameKhmer}</div>
                              <div className="text-[10px] text-slate-400 font-mono uppercase">{stud.nameEnglish}</div>
                            </td>
                            <td className="p-4 text-center whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-md ${stud.gender === 'ស្រី' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                {stud.gender}
                              </span>
                            </td>
                            <td className="p-4 text-center whitespace-nowrap">
                              <span className="font-semibold px-2 py-1 rounded bg-slate-900 text-indigo-300 text-[11px] font-mono whitespace-nowrap">
                                {stud.grade}
                              </span>
                            </td>
                            <td className="p-4 text-slate-200">
                              {stud.parentName}
                            </td>
                            <td className="p-4 font-mono text-[11.5px] whitespace-nowrap">
                              {stud.phone}
                            </td>
                            <td className="p-4 max-w-xs truncate" title={stud.address}>
                              {stud.address}
                            </td>
                            <td className="p-4 text-center whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                stud.status === 'កំពុងរៀន' 
                                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
                                  : stud.status === 'ព្យួរការសិក្សា'
                                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-400'
                                  : 'bg-rose-500/10 border-rose-500/25 text-rose-400'
                              }`}>
                                <span className={`h-1 w-1 rounded-full ${
                                  stud.status === 'កំពុងរៀន' 
                                    ? 'bg-emerald-400' 
                                    : stud.status === 'ព្យួរការសិក្សា'
                                    ? 'bg-amber-400'
                                    : 'bg-rose-400'
                                }`}></span>
                                {stud.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  title="កែប្រែ"
                                  onClick={() => {
                                    setEditingStudent(stud);
                                    setIsStudentModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-400 hover:text-indigo-400 transition cursor-pointer"
                                >
                                  <Edit size={14} />
                                </button>
                                <button 
                                  title="លុប"
                                  onClick={() => handleDeleteStudent(stud.id, stud.nameKhmer)}
                                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/45 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="p-8 text-center text-slate-500 font-light text-xs">
                            មិនមានទិន្នន័យសិស្សដែលអ្នកចង់ស្វែងរកឡើយ។
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ======================================= */}
          {/* TAB 3: ACADEMIC RESULTS / GRADES SECTION */}
          {/* ======================================= */}
          {activeTab === 3 && (
            <StudentResultsDashboard showToast={showToast} staffList={staffList} />
          )}

        </div>
      
      {/* Target for Printing single staff profile */}
      {printingStaff && (
        <div id="single-staff-print-area" className="hidden print:block bg-white text-black p-8 font-sans text-xs">
          <div className="max-w-2xl mx-auto border-2 border-slate-300 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <School className="text-indigo-600" size={32} />
                <div>
                  <h3 className="text-sm font-bold">សាលាបឋមសិក្សាសំរោង</h3>
                  <p className="text-[10px] text-slate-500 font-mono">SAMRAONG PRIMARY SCHOOL</p>
                </div>
              </div>
              <div className="text-right">
                <h4 className="font-extrabold text-indigo-700">បណ្ណព័ត៌មានបុគ្គលិក</h4>
                <p className="font-mono text-[10px]">ID: {printingStaff.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1 border rounded-xl p-2 flex flex-col items-center justify-center bg-slate-50 aspect-square relative overflow-hidden">
                {printingStaff.photoUrl && !staffImageErrors[printingStaff.id] ? (
                  <img 
                    src={printingStaff.photoUrl} 
                    alt={printingStaff.nameKhmer} 
                    className="h-20 w-20 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={() => setStaffImageErrors(prev => ({ ...prev, [printingStaff.id]: true }))}
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center">
                    {printingStaff.nameKhmer.replace(/\s+/g, '').substring(0, 2)}
                  </div>
                )}
              </div>

              <div className="col-span-3 space-y-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-slate-500 text-[10px] block">នាមត្រកូល នាមខ្លួន៖</span>
                    <strong className="text-xs font-bold text-slate-900">{printingStaff.nameKhmer}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">English Name:</span>
                    <strong className="text-xs font-bold text-slate-900 font-mono uppercase">{printingStaff.nameEnglish}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">ភេទ៖</span>
                    <strong className="text-slate-900">{printingStaff.gender}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">តួនាទី៖</span>
                    <span className="font-semibold text-slate-900">{printingStaff.position}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">ប្រភេទគ្រូបង្រៀន៖</span>
                    <span className="text-slate-900">{printingStaff.teacherType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">កម្រិតវប្បធម៌៖</span>
                    <span className="text-slate-900">{printingStaff.educationLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-[10px] text-slate-800">
              <div className="space-y-1.5">
                <p><strong>លេខទូរស័ព្ទ៖</strong> {printingStaff.phone}</p>
                <p><strong>អុីមែល៖</strong> {printingStaff.email}</p>
                {printingStaff.birthDate && <p><strong>ថ្ងៃខែឆ្នាំកំណើត៖</strong> {printingStaff.birthDate}</p>}
                {printingStaff.birthPlace && <p><strong>ទីកន្លែងកំណើត៖</strong> {printingStaff.birthPlace}</p>}
              </div>
              <div className="space-y-1.5">
                {printingStaff.bankAccount && <p><strong>គណនីបៀវត្ស (Payroll ID)៖</strong> {printingStaff.bankAccount}</p>}
                {printingStaff.nationalId && <p><strong>អត្តសញ្ញាណបណ្ណលេខ៖</strong> {printingStaff.nationalId}</p>}
                {printingStaff.address && <p><strong>អាសយដ្ឋានបច្ចុប្បន្ន៖</strong> {printingStaff.address}</p>}
                <p><strong>ថ្ងៃចូលបម្រើការងារ៖</strong> {printingStaff.joinDate}</p>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-center text-[9px] text-slate-400 font-mono">
              <p>បោះពុម្ព៖ {new Date().toLocaleString('km-KH')}</p>
              <p>ប្រព័ន្ធគ្រប់គ្រងសាលារៀនសំរោង v2.4.0</p>
            </div>
          </div>
        </div>
      )}
      </main>


      {/* ======================================================= */}
      {/* MODAL WINDOWS STATE overlays                            */}
      {/* ======================================================= */}

      {/* 0. Digital Staff Card & Profile Detail Modal (Popup) */}
      {viewingStaffDetail && (
        <div 
          id="modal-staff-detail" 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setViewingStaffDetail(null)}
        >
          <div 
            className="bg-[#0b0e21] border border-indigo-550/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] w-full max-w-2xl overflow-hidden text-xs relative dynamic-glow transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient subtle decorative lights inside card */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Modal Header */}
            <div className="bg-slate-950/90 p-5 border-b border-indigo-500/15 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30">
                  <UserCheck size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">បណ្ណព័ត៌មានលម្អិតរបស់បុគ្គលិក</h4>
                  <p className="text-[10px] text-indigo-300 font-mono tracking-wide uppercase font-semibold">STAFF DIGITAL PROFILE CARD</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingStaffDetail(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer hover:bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body Info Container */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto relative z-10 scrollbar-thin">
              
              {/* Profile card layout & Avatar */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-950/50 p-6 rounded-2xl border border-white/5 relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                {/* Left: Beautiful Photo/Avatar frame with glowing indicator */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                    <div className={`relative h-28 w-28 rounded-full ${viewingStaffDetail.avatarBg || 'bg-indigo-600'} text-slate-950 flex items-center justify-center font-bold text-3xl shadow-2xl shrink-0 border-2 border-slate-900 uppercase overflow-hidden`}>
                      {viewingStaffDetail.photoUrl && !staffImageErrors[viewingStaffDetail.id] ? (
                        <img 
                          src={viewingStaffDetail.photoUrl} 
                          alt={viewingStaffDetail.nameKhmer} 
                          className="absolute inset-0 h-full w-full object-cover" 
                          referrerPolicy="no-referrer"
                          onError={() => setStaffImageErrors(prev => ({ ...prev, [viewingStaffDetail.id]: true }))}
                        />
                      ) : (
                        <span>{viewingStaffDetail.nameKhmer.replace(/\s+/g, '').substring(0, 2)}</span>
                      )}
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                    viewingStaffDetail.status === 'សកម្ម' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-550'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${viewingStaffDetail.status === 'សកម្ម' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                    {viewingStaffDetail.status}
                  </span>
                </div>

                {/* Middle and Right: Core Identifiers */}
                <div className="md:col-span-2 space-y-3.5 text-center md:text-left">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase font-mono">បុគ្គលិកបម្រើការ</span>
                    <h3 className="text-xl font-bold text-white mt-1 leading-tight">{viewingStaffDetail.nameKhmer}</h3>
                    <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wide mt-0.5">{viewingStaffDetail.nameEnglish}</h4>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="text-[11px] px-3 py-1 rounded-xl bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/25">
                      {viewingStaffDetail.position}
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-xl bg-slate-900 text-slate-300 font-mono font-bold border border-slate-800">
                      ID: {viewingStaffDetail.id}
                    </span>
                    <span className="text-[11px] px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      {viewingStaffDetail.gender === 'ប្រុស' ? 'បុរស' : 'នារី'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns: Professional credentials & Personal background */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                
                {/* Section A: Professional Details Info */}
                <div className="space-y-3.5 bg-slate-950/25 p-5 rounded-2xl border border-indigo-500/10">
                  <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 border-b border-indigo-500/10 pb-2.5">
                    <Award size={14} className="text-indigo-400 shrink-0" />
                    <span>ព័ត៌មានការងារ & វិជ្ជាជីវៈ (Academic Info)</span>
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-white/5 pb-2">
                      <span className="text-slate-400">ប្រភេទគ្រូបង្រៀន៖</span>
                      <span className="font-bold text-slate-200">{viewingStaffDetail.teacherType || 'គ្រូបង្រៀនក្របខណ្ឌ'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-white/5 pb-2">
                      <span className="text-slate-400">កម្រិតវប្បធម៌៖</span>
                      <span className="font-extrabold text-slate-200">{viewingStaffDetail.educationLevel || 'បរិញ្ញាបត្រ'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-white/5 pb-2">
                      <span className="text-slate-400">កម្រិតវិជ្ជាជីវៈ៖</span>
                      <span className="font-bold text-indigo-300">{viewingStaffDetail.profLevel || 'គ្រូបង្រៀនកម្រិតខ្ពស់'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] py-0.5 pb-1">
                      <span className="text-slate-400">ថ្ងៃចូលបម្រើការងារ៖</span>
                      <span className="font-bold text-emerald-400 font-mono">{viewingStaffDetail.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Personal Data Info */}
                <div className="space-y-3.5 bg-slate-950/25 p-5 rounded-2xl border border-indigo-500/10">
                  <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 border-b border-indigo-500/10 pb-2.5">
                    <School size={14} className="text-indigo-400 shrink-0" />
                    <span>ព័ត៌មានអត្តសញ្ញាណ និងសាវតារ</span>
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-white/5 pb-2">
                      <span className="text-slate-400">អត្តសញ្ញាណបណ្ណ៖</span>
                      <span className="font-extrabold text-slate-200 font-mono">{viewingStaffDetail.nationalId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] py-0.5 border-b border-white/5 pb-2">
                      <span className="text-slate-400">ថ្ងៃខែឆ្នាំកំណើត៖</span>
                      <span className="font-bold text-slate-200 font-mono">{viewingStaffDetail.birthDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-start text-[11px] py-0.5 pb-1 gap-2">
                      <span className="text-slate-400 shrink-0">ទីកន្លែងកំណើត៖</span>
                      <span className="font-bold text-slate-200 text-right leading-tight max-w-[170px]">{viewingStaffDetail.birthPlace || 'N/A'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Section C: Contact Details and payroll information */}
              <div className="space-y-4 bg-slate-950/45 p-5 rounded-2xl border border-white/5">
                <h5 className="text-xs font-bold text-indigo-300 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <Mail size={13} className="text-indigo-400 shrink-0" />
                  <span>ព័ត៌មានទំនាក់ទំនង & គណនីបៀវត្សធនាគារ</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-850">
                        <Phone size={13} className="text-slate-400" />
                      </div>
                      <div>
                        <span className="text-[9.5px] text-slate-500 block leading-none">លេខទូរស័ព្ទ៖</span>
                        <a href={`tel:${viewingStaffDetail.phone}`} className="font-bold text-indigo-300 font-mono hover:text-indigo-400 text-xs transition">{viewingStaffDetail.phone}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-850">
                        <Mail size={13} className="text-slate-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9.5px] text-slate-500 block leading-none">អុីមែល៖</span>
                        <a href={`mailto:${viewingStaffDetail.email}`} className="font-semibold text-slate-250 font-mono hover:text-indigo-400 break-all" title={viewingStaffDetail.email}>{viewingStaffDetail.email}</a>
                      </div>
                    </div>
                  </div>

                  <div>
                    {viewingStaffDetail.bankAccount ? (
                      <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between shadow-inner">
                        <div className="min-w-0 flex-1 mr-2">
                          <span className="text-[9px] text-[#10b981] uppercase font-bold tracking-wider font-mono">Bank Payroll (Canadia/Wing)</span>
                          <span className="font-mono text-[12px] font-extrabold text-[#10b981] select-all block mt-0.5 truncate">{viewingStaffDetail.bankAccount}</span>
                        </div>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(viewingStaffDetail.bankAccount || '');
                            showToast('បានចម្លងគណនីបៀវត្សរួចរាល់!', 'success');
                          }}
                          className="p-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 hover:text-emerald-400 text-slate-450 rounded-lg transition"
                          title="ចម្លងលេខគណនី"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 border border-dashed border-slate-800 rounded-xl text-center text-slate-550 leading-tight flex items-center justify-center h-full">
                        មិនទាន់បានបញ្ចូលព័ត៌មានគណនីធនាគារទេ
                      </div>
                    )}
                  </div>
                </div>

                {viewingStaffDetail.address && (
                  <div className="flex items-start gap-3 pt-3 border-t border-white/5">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-850 mt-0.5">
                      <MapPin size={13} className="text-slate-400" />
                    </div>
                    <div>
                      <span className="text-[9.5px] text-slate-500 block leading-none">អាសយដ្ឋានបច្ចុប្បន្ន៖</span>
                      <p className="font-medium text-slate-200 mt-1 leading-relaxed text-xs">{viewingStaffDetail.address}</p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Modal Footer (Controls) */}
            <div className="bg-slate-950 p-5 border-t border-indigo-500/15 flex flex-wrap items-center justify-between gap-3 relative z-10">
              <button 
                onClick={() => setViewingStaffDetail(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold transition active:scale-95 cursor-pointer text-xs"
              >
                ចាកចេញ (បិទ)
              </button>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setViewingStaffDetail(null);
                    setEditingStaff(viewingStaffDetail);
                    setIsStaffModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold transition active:scale-95 cursor-pointer text-xs shadow-lg shadow-indigo-950/20"
                >
                  <Edit size={13} />
                  <span>កែប្រែព័ត៌មាន</span>
                </button>
                <button 
                  onClick={() => handlePrintSingleStaff(viewingStaffDetail)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-550 hover:to-emerald-650 text-white font-bold transition active:scale-95 cursor-pointer text-xs shadow-lg shadow-emerald-950/20"
                >
                  <Printer size={13} />
                  <span>បោះពុម្ពបណ្ណលម្អិត</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 0. School History Detail Timeline Modal */}
      {isHistoryModalOpen && (
        <div id="modal-school-history" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b0d19] border border-amber-500/25 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-950/90 p-5 border-b border-indigo-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-amber-400">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">
                    ប្រវត្តិ និងដំណើរការអភិវឌ្ឍន៍សាលា
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    សាលាបឋមសិក្សាសំរោង ក្រុងសំរោង ខេត្តឧត្តរមានជ័យ
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition duration-200 cursor-pointer"
                title="បិទផ្ទាំងនេះ"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Scrollable History Journey */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 scrollbar-thin scrollbar-thumb-indigo-950">
              
              {/* Introduction Hero Section */}
              <div className="bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-4.5 flex gap-4 items-start">
                <School size={36} className="text-amber-405 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="font-extrabold text-[#ffffff] text-xs">សក្ខីកម្មនៃការអប់រំ និងការលះបង់</p>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    អស់រយៈពេលជាង ៦ ទសវត្សរ៍មកនេះ សាលាបឋមសិក្សាសំរោង បានឆ្លងកាត់របត់ប្រវត្តិសាស្ត្រជាច្រើនជំនាន់ ដោយធ្លាប់បានបណ្តុះបណ្តាលធនធានមនុស្ស មន្ត្រីរាជការ អាជីវករ និងបញ្ញវន្តឆ្នើមៗជាច្រើនរូបនៅខេត្តឧត្តរមានជ័យ។
                  </p>
                </div>
              </div>

              {/* Chronological Timeline */}
              <div className="relative border-l-2 border-slate-800/80 ml-4.5 pl-6 space-y-6">
                
                {/* Milestone 1 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center font-bold text-[9px] text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)] shrink-0">
                    ១
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៦៦ ~ ១៩៧០
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">របបសង្គមរាស្រ្តនិយម</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      សាលាបឋមសិក្សាសំរោង បានចាប់ផ្តើមបើកដំណើរការដែលមានកម្រិតថ្នាក់ពី ទី១២ ដល់ទី៧ (ប្រព័ន្ធអប់រំចាស់)។
                    </p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-blue-400 flex items-center justify-center font-bold text-[9px] text-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.3)] shrink-0">
                    ២
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-405 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៧០ ~ ១៩៧៥
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">របបសាធារណៈរដ្ឋខ្មែរ</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      ទោះបីជាស្ថិតក្នុងកាលៈទេសៈសង្គ្រាមស៊ីវិល សាលានៅតែបន្តសកម្មភាពបង្រៀន និងរៀនជាធម្មតា។
                    </p>
                  </div>
                </div>

                {/* Milestone 3 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-rose-500 flex items-center justify-center font-bold text-[9px] text-rose-450 shadow-[0_0_8px_rgba(244,63,94,0.3)] shrink-0">
                    ៣
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៧៥ ~ ១៩៧៩
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">របបកម្ពុជាប្រជាធិបតេយ្យ (ខ្មែរក្រហម)</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      ប្រព័ន្ធអប់រំត្រូវបានលុបបំបាត់។ ពួកខ្មែរក្រហមបានយកអគារសិក្សានៃសាលាបឋមសិក្សាសំរោងធ្វើជាឃ្លាំងសម្រាប់ដាក់ស្រូវ។
                    </p>
                  </div>
                </div>

                {/* Milestone 4 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center font-bold text-[9px] text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.3)] shrink-0">
                    ៤
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៧៩ ~ ១៩៨៤
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">របបសាធារណៈរដ្ឋប្រជាមានិតកម្ពុជា</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      សាលារៀនត្រូវបានកងទ័ពយកធ្វើជាទីលាន ឬបន្ទាយសម្រាប់ដាក់កងទ័ពវៀតណាម។
                    </p>
                  </div>
                </div>

                {/* Milestone 5 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-slate-500 flex items-center justify-center font-bold text-[9px] text-slate-400 shadow-[0_0_8px_rgba(100,116,139,0.3)] shrink-0">
                    ៥
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-550/10 border border-slate-500/20 text-slate-300 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៨៤ ~ ១៩៨៥
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">ការដ្ឋាន ក៥</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      សាលាត្រូវបានយកសម្រាប់ធ្វើជាកន្លែងស្នាក់នៅរបស់កម្លាំងពលករ (ការដ្ឋាន ក៥)។
                    </p>
                  </div>
                </div>

                {/* Milestone 6 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1 h-5 w-5 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center font-bold text-[9px] text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] shrink-0">
                    ៦
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] font-mono">
                      ឆ្នាំ ១៩៨៦ ~ បច្ចុប្បន្ន
                    </span>
                    <h5 className="font-extrabold text-white text-xs sm:text-sm">ការស្ដារ និងបើកដំណើរការឡើងវិញ</h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-light">
                      សាលាត្រូវបានបើកដំណើរការឡើងវិញជាផ្លូវការ និងបន្តអភិវឌ្ឍរហូតមកដល់បច្ចុប្បន្នជាគ្រឹះស្ថានសិក្សាមួយយ៉ាងសំខាន់។
                    </p>
                  </div>
                </div>

              </div>

              {/* School Directors Section (សមាសភាពនៃអ្នកដឹកនាំ និងគ្រប់គ្រងសាលា) */}
              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <h5 className="font-extrabold text-white text-xs sm:text-sm mb-4 flex items-center gap-2">
                  <Award size={15} className="text-amber-400" />
                  <span>សមាសភាពនៃអ្នកដឹកនាំ និងគ្រប់គ្រងសាលា (គណៈគ្រប់គ្រងគ្រប់ជំនាន់)</span>
                </h5>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Director 1 */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-indigo-400 font-mono font-bold">១៩៨៦ ~ ១៩៩៩</p>
                    <p className="font-extrabold text-white text-xs mt-1.5 leading-tight">លោក ខៀវ តឿង</p>
                    <p className="text-[9px] text-slate-450 mt-0.5">នាយកសាលា</p>
                  </div>
                  {/* Director 2 */}
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-indigo-400 font-mono font-bold">២០០០ ~ ២០១៣</p>
                    <p className="font-extrabold text-white text-xs mt-1.5 leading-tight">លោក ភូន សទ្ធា</p>
                    <p className="text-[9px] text-slate-450 mt-0.5">នាយកសាលា</p>
                  </div>
                  {/* Director 3 */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-xl p-3 text-center shadow-md">
                    <p className="text-[10px] text-amber-400 font-mono font-bold">២០១៣ ~ បច្ចុប្បន្ន</p>
                    <p className="font-extrabold text-white text-xs mt-1.5 leading-tight">លោក ធួន ចន្ថារី</p>
                    <p className="text-[9px] text-amber-305 mt-0.5">នាយកសាលាបច្ចុប្បន្ន</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-950 p-4 border-t border-indigo-500/10 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md shadow-indigo-950/50 transition cursor-pointer active:scale-95"
              >
                យល់ព្រម និងបិទផ្ទាំងនេះ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 0.5. National Public Service Award Certificate & Leaderboard Modal */}
      {isAwardModalOpen && (
        <div id="modal-award-certificate" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b0c15] border-2 border-amber-500/25 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleIn">
            
            {/* Modal Navigation Header */}
            <div className="bg-slate-950 p-4 border-b border-amber-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/15 border border-amber-500/30 p-2.5 rounded-xl text-amber-400">
                  <Award size={20} className="animate-spin-slow" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-[#ffffff]">
                    សមិទ្ធផលជ័យលាភីថ្នាក់ជាតិ ២០២៣
                  </h4>
                  <p className="text-[10px] text-amber-300 font-medium font-sans">
                    ពានរង្វាន់អង្គភាពផ្តល់សេវាសាធារណៈគំរូ ក្នុងវិស័យអប់រំ
                  </p>
                </div>
              </div>

              {/* Tabs Switcher & Close button */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex gap-1">
                  <button 
                    onClick={() => setAwardTab('cert')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${awardTab === 'cert' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <Award size={13} />
                    <span>វិញ្ញាបនបត្រ</span>
                  </button>
                  <button 
                    onClick={() => setAwardTab('list')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${awardTab === 'list' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    <List size={13} />
                    <span>សាលាជ័យលាភីទាំង ១០</span>
                  </button>
                </div>

                <button 
                  onClick={() => setIsAwardModalOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/5 transition duration-200 cursor-pointer border border-transparent hover:border-slate-800"
                  title="បិទផ្ទាំងនេះ"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body Info Panel */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#060810] scrollbar-thin scrollbar-thumb-amber-955 text-xs sm:text-sm">
              
              {awardTab === 'cert' ? (
                <div className="space-y-4">
                  {/* Digital Replica Design block */}
                  <div className="relative bg-[#fefaef] text-[#2c200c] rounded-2xl border-[10px] border-[#cb9a3a] p-4 sm:p-8 md:p-10 shadow-2xl selection:bg-amber-100 overflow-hidden text-center select-none font-serif leading-relaxed">
                    
                    {/* Decorative traditional corner templates inside card */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#b08027] rounded-tl-sm"></div>
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#b08027] rounded-tr-sm"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#b08027] rounded-bl-sm"></div>
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#b08027] rounded-br-sm"></div>

                    {/* Royal Header */}
                    <div className="space-y-1 mb-5">
                      <h5 className="text-[14px] sm:text-[17px] font-black tracking-widest text-[#936611]">ព្រះរាជាណាចក្រកម្ពុជា</h5>
                      <h6 className="text-[11px] sm:text-[13px] font-black text-[#a67414] tracking-wider">ជាតិ សាសនា ព្រះមហាក្សត្រ</h6>
                      <div className="flex justify-center items-center gap-1.5 mt-2">
                        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#b08027]"></span>
                        <span className="text-[7.5px] text-[#b08027]">✦ ✦ ✦</span>
                        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#b08027]"></span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between text-left mb-6 text-[10px] sm:text-[11px] font-bold text-[#624718]">
                      <div>
                        <p className="uppercase tracking-wider">រាជរដ្ឋាភិបាលកម្ពុជា</p>
                        <p className="text-[#a57a2e] text-[9.5px]">គណៈកម្មាធិការវាយតម្លៃជាតិ</p>
                      </div>
                      <div className="text-center sm:text-right mt-1 sm:mt-0 italic">
                        ក្របខ័ណ្ឌវាយតម្លៃគុណភាពសេវាសាធារណៈ
                      </div>
                    </div>

                    {/* Diploma Title */}
                    <div className="space-y-2 my-6">
                      <h2 className="text-2xl sm:text-4.5xl font-black tracking-tight text-[#d2301c] py-1 border-y border-[#dfb152]/30 w-fit mx-auto font-sans">
                        វិញ្ញាបនបត្រ
                      </h2>
                      <p className="text-[11px] sm:text-[13px] font-extrabold text-[#74501a] tracking-wide uppercase font-sans">
                        ទទួលស្គាល់ជ័យលាភីអង្គភាពផ្តល់សេវាសាធារណៈគំរូ
                      </p>
                    </div>

                    {/* Middle Text Content */}
                    <div className="space-y-4 max-w-xl mx-auto my-6 text-[#453215] text-[11.5px] sm:text-[13.5px]">
                      <p className="font-light antialiased">
                        រាជរដ្ឋាភិបាលកម្ពុជា សម្រេចទទួលស្គាល់ជ័យលាភីសាលាបឋមសិក្សាគំរូ ២០២៣
                      </p>
                      <div className="py-2.5">
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-sans font-black">ជ័យលាភីថ្នាក់ជាតិ ចំណាត់ថ្នាក់</p>
                        <h3 className="text-xl sm:text-3xl font-black text-[#9a6a12] mt-1 font-sans">
                          លេខ ៩ (ទូទាំងប្រទេស)
                        </h3>
                      </div>
                      <p className="font-light">ជូនចំពោះ</p>
                      
                      {/* Name Holder */}
                      <div className="bg-amber-500/5 border border-amber-500/20 py-2.5 px-6 rounded-xl w-fit mx-auto shadow-sm">
                        <h4 className="text-xl sm:text-3xl font-black text-[#c12918] tracking-wide">
                          សាលាបឋមសិក្សាសំរោង
                        </h4>
                        <p className="text-xs sm:text-sm font-extrabold text-[#644211] mt-1">
                          ក្រុងសំរោង ខេត្តឧត្តរមានជ័យ
                        </p>
                      </div>
                      
                      <p className="text-[10.5px] sm:text-xs leading-relaxed font-light mt-3 max-w-lg mx-auto">
                        ដែលជ័យលាភីនេះឆ្លុះបញ្ចាំងពីលទ្ធផលដ៏ឧត្តុង្គឧត្តមក្នុងការបំពេញភារកិច្ចបម្រើសេវាអប់រំ បណ្តុះបណ្តាលចំណេះដឹងទូទៅ គុណធម៌ ហេដ្ឋារចនាសម្ព័ន្ធបៃតង និងការចូលរួមយ៉ាងសកម្មបំផុតក្នុងសហគមន៍ជាតិ។
                      </p>
                    </div>

                    {/* Official Signatures Row */}
                    <div className="mt-8 pt-6 border-t border-[#e2ba64]/30 grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] sm:text-[11.5px] text-[#4d3a1f]">
                      <div className="text-left font-light flex flex-col justify-between h-20">
                        <p className="uppercase tracking-widest text-[#a8781d] text-[9.5px] font-black">លេខកូដសក្ខីកម្ម</p>
                        <p className="font-mono text-[9px] text-[#866736]">CERTIFICATE ID: ODC-SR-2023-009</p>
                      </div>
                      
                      {/* Signature Side */}
                      <div className="text-center md:text-right space-y-1 font-light relative">
                        <p className="text-[#644f2c]">រាជធានីភ្នំពេញ, ថ្ងៃចន្ទ ១០កើត ខែមាឃ ឆ្នាំថោះ បញ្ចស័ក ព.ស. ២៥៦៧</p>
                        <p className="italic text-[#83622c]">ត្រូវនឹងថ្ងៃទី ១៩ ខែ កុម្ភៈ ឆ្នាំ ២០២៤</p>
                        <p className="font-extrabold text-[#a37217] uppercase tracking-wider pt-2">នាយករដ្ឋមន្ត្រីៃនព្រះរាជាណាចក្រកម្ពុជា</p>
                        
                        {/* Red Signature Seal Replica */}
                        <div className="absolute right-6 -bottom-6 opacity-85 pointer-events-none w-24 h-24 rounded-full border-4 border-dashed border-rose-600/60 p-0.5 flex items-center justify-center -rotate-12">
                          <div className="w-full h-full rounded-full border-2 border-rose-600/35 flex flex-col items-center justify-center text-center p-1 text-rose-600 text-[6.5px] font-bold">
                            <span>គណៈកម្មាធិការ</span>
                            <span className="font-extrabold uppercase border-y border-rose-650/30 my-0.5 px-0.5 scale-90">វាយតម្លៃថ្នាក់ជាតិ</span>
                            <span>រដ្ឋបាលសាធារណៈ</span>
                          </div>
                        </div>

                        <div className="h-12"></div>
                        <p className="font-black text-slate-800 text-[12.5px] relative z-10">សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត</p>
                      </div>
                    </div>

                  </div>

                  {/* Encouraging caption */}
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3 text-slate-300">
                    <Award size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-xs text-amber-300">ការបញ្ជាក់សមិទ្ធផលជាតិ</p>
                      <p className="text-[11px] leading-relaxed mt-0.5 text-slate-400">
                        វិញ្ញាបនបត្រជ័យលាភីនេះត្រូវបានប្រគល់ជូនដោយផ្ទាល់ដោយប្រមុខរាជរដ្ឋាភិបាល សម្តេចមហាបវរធិបតី ហ៊ុន ម៉ាណែត ក្នុងពិធីប្រកាសផ្សព្វផ្សាយនៅរាជធានីភ្នំពេញ។ នេះជាកិត្តិយសដ៏ធំធេងមិនអាចកាត់ថ្លៃបានសម្រាប់គណៈគ្រប់គ្រងសាលា លោកគ្រូ-អ្នកគ្រូ និងសិស្សានុសិស្សទាំងអស់ក្នុងខេត្តឧត្តរមានជ័យ។
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Leaderboard layout representation matching Image 1 */}
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-200 mb-2 flex items-center gap-1.5">
                      <List size={14} className="text-amber-400" />
                      បញ្ជីឈ្មោះសាលាបឋមសិក្សាទាំង ១០ ដែលទទួលបានជ័យលាភី
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-normal font-light mb-4">
                      នេះជាបញ្ជីរាយនាមសាលាឆ្នើមទាំង ១០ ទូទាំងប្រទេស ដែលមានពិន្ទុវាយតម្លៃខ្ពស់បំផុតលើហេដ្ឋារចនាសម្ព័ន្ធ ការគ្រប់គ្រង វិន័យ សមត្ថភាពសិក្សា និងការបំពេញសេវាក្នុងវិស័យអប់រំ ឆ្នាំ ២០២៣៖
                    </p>
                  </div>

                  <div className="space-y-2">
                    {[
                      { rank: '១ ស្ទួន', name: 'សាលាបឋមសិក្សាស្វាយជ្រំ', province: 'ខេត្តស្វាយរៀង', active: false },
                      { rank: '១ ស្ទួន', name: 'សាលាបឋមសិក្សា សម្តេចជា ស៊ីម', province: 'ខេត្តបាត់ដំបង', active: false },
                      { rank: '៣', name: 'សាលាបឋមសិក្សាវត្តបូព៌', province: 'ខេត្តសៀមរាប', active: false },
                      { rank: '៤', name: 'សាលាបឋមសិក្សាចតុមុខ', province: 'រាជធានីភ្នំពេញ', active: false },
                      { rank: '៥', name: 'សាលាបឋមសិក្សាសិរីសុវណ្ណرង្សី', province: 'ខេត្តកំពង់ឆ្នាំង', active: false },
                      { rank: '៦', name: 'សាលាបឋមសិក្សាក្រវ៉ាន់', province: 'ខេត្តសៀមរាប', active: false },
                      { rank: '៧', name: 'សាលាបឋមសិក្សាវត្តចែង', province: 'ខេត្តបាត់ដំបង', active: false },
                      { rank: '៨', name: 'សាលាបឋមសិក្សាអនុវត្ត ហ៊ុន សែន អាចារ្យលាក់', province: 'ខេត្តកំពង់ធំ', active: false },
                      { rank: '៩', name: 'សាលាបឋមសិក្សាសំរោង', province: 'ខេត្តឧត្តរមានជ័យ', active: true },
                      { rank: '១០', name: 'សាលាបឋមសិក្សាអង្គរជុំ', province: 'ខេត្តកំពត', active: false }
                    ].map((school, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 ${school.active ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-950/45 scale-[1.01]' : 'bg-slate-950/45 border-slate-800 hover:border-slate-700/80'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${school.active ? 'bg-amber-550 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                            {school.rank}
                          </div>
                          <div>
                            <p className={`font-extrabold text-xs sm:text-sm ${school.active ? 'text-amber-400' : 'text-slate-200'}`}>
                              {school.name}
                              {school.active && (
                                <span className="ml-2.5 inline-block text-[9.5px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-sans">
                                  សាលារបស់យើង
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-light">{school.province}</p>
                          </div>
                        </div>

                        {/* Medal layout icon for ranks */}
                        <div className="shrink-0">
                          {school.active ? (
                            <Award size={18} className="text-amber-400 fill-amber-400/20 animate-bounce" />
                          ) : idx < 2 ? (
                            <Award size={16} className="text-[#ffd700]" />
                          ) : idx < 5 ? (
                            <Award size={15} className="text-[#c0c0c0]" />
                          ) : (
                            <span className="text-[11px] text-slate-500 font-bold font-mono">TOP 10</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Action Footer */}
            <div className="bg-slate-950 p-4 border-t border-amber-500/10 flex justify-end gap-3 shrink-0">
              <button 
                onClick={() => setIsAwardModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-550 to-yellow-500 hover:from-amber-500 hover:to-yellow-450 text-slate-950 font-black text-xs transition cursor-pointer active:scale-95 shadow-md shadow-amber-950/30"
              >
                យល់ព្រម និងបិទផ្ទាំងនេះ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 1. Add / Edit Staff Modal */}
      {isStaffModalOpen && (
        <div id="modal-staff" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-slate-950 p-4 border-b border-indigo-500/10 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200">
                {editingStaff ? `កែប្រែទិន្នន័យបុគ្គលិក៖ ${editingStaff.nameKhmer}` : 'បន្ថែមព័ត៌មានបុគ្គលិកថ្មី'}
              </h4>
              <button 
                onClick={() => setIsStaffModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Form Content */}
            <form onSubmit={handleSaveStaff} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ឈ្មោះជាភាសាខ្មែរ <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="nameKhmer" 
                    required
                    defaultValue={editingStaff?.nameKhmer || ''}
                    placeholder="ឧ. សុខ វណ្ណា"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">ឈ្មោះឡាតាំង (English) <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="nameEnglish" 
                    required
                    defaultValue={editingStaff?.nameEnglish || ''}
                    placeholder="e.g. Sok Vanna"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ភេទ <span className="text-rose-400">*</span></label>
                  <select 
                    name="gender" 
                    required
                    defaultValue={editingStaff?.gender || 'ប្រុស'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ប្រុស">ប្រុស</option>
                    <option value="ស្រី">ស្រី</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">មុខតំណែង <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="position" 
                    required
                    defaultValue={editingStaff?.position || ''}
                    placeholder="ឧ. គ្រូបង្រៀនថ្នាក់ទី ១"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">លេខទូរស័ព្ទ <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="phone" 
                    required
                    defaultValue={editingStaff?.phone || ''}
                    placeholder="ឧ. 012 345 678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">អុីមែល</label>
                  <input 
                    type="email" 
                    name="email" 
                    defaultValue={editingStaff?.email || ''}
                    placeholder="e.g. name@samraong.edu.kh"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ថ្ងៃចាប់ផ្តើមការងារ <span className="text-rose-400">*</span></label>
                  <input 
                    type="date" 
                    name="joinDate" 
                    required
                    defaultValue={editingStaff?.joinDate || new Date().toISOString().split('T')[0]}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">ស្ថានភាព</label>
                  <select 
                    name="status"
                    defaultValue={editingStaff?.status || 'សកម្ម'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="សកម្ម">សកម្ម</option>
                    <option value="ឈប់សម្រាក">ឈប់សម្រាក</option>
                  </select>
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ថ្ងៃខែឆ្នាំកំណើត</label>
                  <input 
                    type="text" 
                    name="birthDate" 
                    defaultValue={editingStaff?.birthDate || ''}
                    placeholder="ឧ. 01/12/1970"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">លេខអត្តសញ្ញាណបណ្ណ</label>
                  <input 
                    type="text" 
                    name="nationalId" 
                    defaultValue={editingStaff?.nationalId || ''}
                    placeholder="ឧ. 200154721"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">គណនីបៀវត្ស (Bank Payroll ID)</label>
                  <input 
                    type="text" 
                    name="bankAccount" 
                    defaultValue={editingStaff?.bankAccount || ''}
                    placeholder="ឧ. 33000167992310"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">កម្រិតវិជ្ជាជីវៈ (Professional Level)</label>
                  <input 
                    type="text" 
                    name="profLevel" 
                    defaultValue={editingStaff?.profLevel || ''}
                    placeholder="ឧ. ស.គ្រូបង្រៀនកម្រិតមូលដ្ឋាន"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">ទីកន្លែងកំណើត (Place of Birth)</label>
                <input 
                  type="text" 
                  name="birthPlace" 
                  defaultValue={editingStaff?.birthPlace || ''}
                  placeholder="ភូមិ, ឃុំ, ស្រុក, ខេត្ត..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">អាសយដ្ឋានបច្ចុប្បន្ន (Current Address)</label>
                <input 
                  type="text" 
                  name="address" 
                  defaultValue={editingStaff?.address || ''}
                  placeholder="ភូមិបច្ចុប្បន្ន..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ប្រភេទគ្រូបង្រៀន <span className="text-rose-400">*</span></label>
                  <select 
                    name="teacherType"
                    required
                    defaultValue={
                      editingStaff?.teacherType === 'កិច្ចសន្យា' || editingStaff?.teacherType === 'គ្រូបង្រៀនកិច្ចសន្យា'
                        ? 'គ្រូបង្រៀនកិច្ចសន្យា'
                        : 'គ្រូបង្រៀនក្របខណ្ឌ'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="គ្រូបង្រៀនក្របខណ្ឌ">គ្រូបង្រៀនក្របខណ្ឌ</option>
                    <option value="គ្រូបង្រៀនកិច្ចសន្យា">គ្រូបង្រៀនកិច្ចសន្យា</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">កម្រិតវប្បធម៌ <span className="text-rose-400">*</span></label>
                  <select 
                    name="educationLevel"
                    required
                    defaultValue={editingStaff?.educationLevel || 'បរិញ្ញាបត្រ'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="មធ្យមសិក្សាបឋមភូមិ">មធ្យមសិក្សាបឋមភូមិ</option>
                    <option value="មធ្យមសិក្សាទុតិយភូមិ">មធ្យមសិក្សាទុតិយភូមិ</option>
                    <option value="បរិញ្ញាបត្រ">បរិញ្ញាបត្រ</option>
                    <option value="បរិញ្ញាបត្រជាន់ខ្ពស់">បរិញ្ញាបត្រជាន់ខ្ពស់</option>
                    <option value="បណ្ឌិត">បណ្ឌិត</option>
                  </select>
                </div>
              </div>

              {/* Form Bottom Controls */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsStaffModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 cursor-pointer text-xs"
                >
                  បោះបង់
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-1 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer text-xs"
                >
                  <Save size={14} />
                  <span>រក្សាទុក</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 2. Add / Edit Student Modal */}
      {isStudentModalOpen && (
        <div id="modal-student" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-slate-950 p-4 border-b border-indigo-500/10 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200">
                {editingStudent ? `កែប្រែទិន្នន័យសិស្ស៖ ${editingStudent.nameKhmer}` : 'បន្ថែមព័ត៌មានសិស្សថ្មី'}
              </h4>
              <button 
                onClick={() => setIsStudentModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Form Content */}
            <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ឈ្មោះជាភាសាខ្មែរ <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="nameKhmer" 
                    required
                    defaultValue={editingStudent?.nameKhmer || ''}
                    placeholder="ឧ. ចាន់ វាសនា"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">ឈ្មោះឡាតាំង (English) <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="nameEnglish" 
                    required
                    defaultValue={editingStudent?.nameEnglish || ''}
                    placeholder="e.g. Chan Veasna"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ភេទ <span className="text-rose-400">*</span></label>
                  <select 
                    name="gender" 
                    required
                    defaultValue={editingStudent?.gender || 'ប្រុស'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ប្រុស">ប្រុស</option>
                    <option value="ស្រី">ស្រី</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">កម្រិតថ្នាក់ <span className="text-rose-400">*</span></label>
                  <select 
                    name="grade" 
                    required
                    defaultValue={editingStudent?.grade || 'ថ្នាក់ទី ១'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១</option>
                    <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២</option>
                    <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣</option>
                    <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤</option>
                    <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥</option>
                    <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ឈ្មោះអាណាព្យាបាល <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="parentName" 
                    required
                    defaultValue={editingStudent?.parentName || ''}
                    placeholder="ឧ. ចាន់ សុខា"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">លេខទូរស័ព្ទទាក់ទង <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="phone" 
                    required
                    defaultValue={editingStudent?.phone || ''}
                    placeholder="ឧ. 015 777 666"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">អាសយដ្ឋាន <span className="text-rose-400">*</span></label>
                <textarea 
                  name="address" 
                  required
                  rows={2}
                  defaultValue={editingStudent?.address || ''}
                  placeholder="ភូមិ, ឃុំ, ស្រុក, ខេត្តតាកែវ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">ស្ថានភាព</label>
                <select 
                  name="status"
                  defaultValue={editingStudent?.status || 'កំពុងរៀន'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="កំពុងរៀន">កំពុងរៀន (Active)</option>
                  <option value="ព្យួរការសិក្សា">ព្យួរការសិក្សា (Suspended)</option>
                  <option value="ឈប់រៀន">ឈប់រៀន (Dropped)</option>
                </select>
              </div>

              {/* Form Bottom Controls */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsStudentModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 cursor-pointer text-xs"
                >
                  បោះបង់
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-1 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer text-xs"
                >
                  <Save size={14} />
                  <span>រក្សាទុក</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Academic Score Record Modal */}
      {isRecordModalOpen && (
        <div id="modal-record" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-indigo-500/20 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-slate-950 p-4 border-b border-indigo-500/10 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-200">
                {editingRecord ? `កែប្រែពិន្ទុសិស្ស៖ ${editingRecord.studentName}` : 'បញ្ចូលលទ្ធផលពិន្ទុសិស្សថ្មី'}
              </h4>
              <button 
                onClick={() => setIsRecordModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Form Content */}
            <form onSubmit={handleSaveRecord} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-400">ជ្រើសរើសសិស្ស <span className="text-rose-400">*</span></label>
                  {editingRecord ? (
                    <input 
                      type="text" 
                      readOnly
                      value={editingRecord.studentName}
                      className="w-full bg-slate-950/60 border border-transparent rounded-lg px-3 py-2 text-slate-400 font-bold focus:outline-none"
                    />
                  ) : (
                    <select 
                      name="studentId" 
                      required
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="">-- ជ្រើសរើសសិស្ស --</option>
                      {studentList.map(s => (
                        <option key={s.id} value={s.id}>{s.nameKhmer} ({s.id}) - {s.grade}</option>
                      ))}
                    </select>
                  )}
                  {editingRecord && (
                    <input type="hidden" name="studentId" value={editingRecord.studentId} />
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">វគ្គសិក្សា / ខែប្រឡង <span className="text-rose-400">*</span></label>
                  <input 
                    type="text" 
                    name="month" 
                    required
                    defaultValue={editingRecord?.month || 'ប្រចាំឆមាសទី ១'}
                    placeholder="ឧ. ប្រចាំឆមាសទី ១ ឬ មិថុនា"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subjects Score grid */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="font-bold text-slate-300 border-b border-slate-800 pb-1 text-[11px] uppercase tracking-wide">ពិន្ទុមុខវិទ្យានីមួយៗ (0 - 100)</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400">ភាសាខ្មែរ (Khmer) <span className="text-rose-400">*</span></label>
                    <input 
                      type="number" 
                      name="khmerScore" 
                      required
                      min={0}
                      max={100}
                      defaultValue={editingRecord?.khmerScore !== undefined ? editingRecord.khmerScore : 85}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">គណិតវិទ្យា (Math) <span className="text-rose-400">*</span></label>
                    <input 
                      type="number" 
                      name="mathScore" 
                      required
                      min={0}
                      max={100}
                      defaultValue={editingRecord?.mathScore !== undefined ? editingRecord.mathScore : 80}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400">វិទ្យាសាស្ត្រ (Science) <span className="text-rose-400">*</span></label>
                    <input 
                      type="number" 
                      name="scienceScore" 
                      required
                      min={0}
                      max={100}
                      defaultValue={editingRecord?.scienceScore !== undefined ? editingRecord.scienceScore : 75}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400">សិក្សាសង្គម (Social) <span className="text-rose-400">*</span></label>
                    <input 
                      type="number" 
                      name="socialScore" 
                      required
                      min={0}
                      max={100}
                      defaultValue={editingRecord?.socialScore !== undefined ? editingRecord.socialScore : 80}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">មតិយោបល់របស់គ្រូទទួលបន្ទុក</label>
                <textarea 
                  name="teacherRemarks" 
                  rows={2}
                  maxLength={150}
                  defaultValue={editingRecord?.teacherRemarks || ''}
                  placeholder="ការសង្កេត ស្មារតីសិក្សារបស់សិស្ស..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none resize-none"
                />
              </div>

              {/* Form Bottom Controls */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button 
                  type="button" 
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-850 text-slate-400 cursor-pointer text-xs"
                >
                  បោះបង់
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-1 px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold cursor-pointer text-xs"
                >
                  <Save size={14} />
                  <span>រក្សាទុក</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
