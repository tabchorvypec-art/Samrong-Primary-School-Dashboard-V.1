import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Printer, 
  Layers, 
  Calendar, 
  User, 
  Download, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  Award, 
  Sparkles,
  ExternalLink,
  Info,
  Camera
} from 'lucide-react';

interface MonthlyResult {
  gradeLevel: string; // កម្រិតថ្នាក់ (e.g., កម្រិតថ្នាក់ទី១, កម្រិតថ្នាក់ទី២)
  classroom: string;  // ថ្នាក់រៀន (e.g., ថ្នាក់ទី១A, ថ្នាក់ទី១B)
  teacherName: string;// ឈ្មោះគ្រូទទួលបន្ទុកថ្នាក់
  teacherGender: 'ប្រុស' | 'ស្រី';
  month: string;       // ខែ (e.g., ខែមករា, ខែកុម្ភៈ)
  passed: number;      // ជាប់
  failed: number;      // ធ្លាក់
  gradeA: number;
  gradeB: number;
  gradeC: number;
  gradeD: number;
  gradeE: number;
  gradeF: number;
}

interface StudentResultsDashboardProps {
  showToast: (message: string, type: 'success' | 'info' | 'error') => void;
  staffList?: any[];
}

// Default high-fidelity dataset matching the screenshots perfectly
const DEFAULT_RESULTS_DATA: MonthlyResult[] = [
  // Grade 1 (កម្រិតថ្នាក់ទី១) - January (ខែមករា)
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១A',
    teacherName: 'អ្នកគ្រូ សាន គីមហុង',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 35,
    failed: 16,
    gradeA: 8,
    gradeB: 9,
    gradeC: 7,
    gradeD: 3,
    gradeE: 8,
    gradeF: 16
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១B',
    teacherName: 'អ្នកគ្រូ កៅ វណ្ណី',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 37,
    failed: 10,
    gradeA: 5,
    gradeB: 8,
    gradeC: 12,
    gradeD: 6,
    gradeE: 6,
    gradeF: 10
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១C',
    teacherName: 'លោកគ្រូ សុខ ភា',
    teacherGender: 'ប្រុស',
    month: 'ខែមករា',
    passed: 39,
    failed: 9,
    gradeA: 6,
    gradeB: 10,
    gradeC: 11,
    gradeD: 7,
    gradeE: 5,
    gradeF: 9
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១D',
    teacherName: 'អ្នកគ្រូ មាស វិច្ឆិកា',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 47,
    failed: 6,
    gradeA: 12,
    gradeB: 14,
    gradeC: 10,
    gradeD: 8,
    gradeE: 3,
    gradeF: 6
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១E',
    teacherName: 'លោកគ្រូ សុវណ្ណ មុនី',
    teacherGender: 'ប្រុស',
    month: 'ខែមករា',
    passed: 29,
    failed: 19,
    gradeA: 4,
    gradeB: 5,
    gradeC: 6,
    gradeD: 8,
    gradeE: 6,
    gradeF: 19
  },

  // Grade 1 (កម្រិតថ្នាក់ទី១) - February (ខែកុម្ភៈ)
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១A',
    teacherName: 'អ្នកគ្រូ សាន គីមហុង',
    teacherGender: 'ស្រី',
    month: 'ខែកុម្ភៈ',
    passed: 38,
    failed: 13,
    gradeA: 10,
    gradeB: 11,
    gradeC: 8,
    gradeD: 4,
    gradeE: 5,
    gradeF: 13
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១B',
    teacherName: 'អ្នកគ្រូ កៅ វណ្ណី',
    teacherGender: 'ស្រី',
    month: 'ខែកុម្ភៈ',
    passed: 40,
    failed: 7,
    gradeA: 6,
    gradeB: 11,
    gradeC: 10,
    gradeD: 7,
    gradeE: 6,
    gradeF: 7
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១C',
    teacherName: 'លោកគ្រូ សុខ ភា',
    teacherGender: 'ប្រុស',
    month: 'ខែកុម្ភៈ',
    passed: 41,
    failed: 7,
    gradeA: 7,
    gradeB: 12,
    gradeC: 10,
    gradeD: 8,
    gradeE: 4,
    gradeF: 7
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១D',
    teacherName: 'អ្នកគ្រូ មាស វិច្ឆិកា',
    teacherGender: 'ស្រី',
    month: 'ខែកុម្ភៈ',
    passed: 48,
    failed: 5,
    gradeA: 15,
    gradeB: 12,
    gradeC: 9,
    gradeD: 7,
    gradeE: 5,
    gradeF: 5
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី១',
    classroom: 'ថ្នាក់ទី១E',
    teacherName: 'លោកគ្រូ សុវណ្ណ មុនី',
    teacherGender: 'ប្រុស',
    month: 'ខែកុម្ភៈ',
    passed: 32,
    failed: 16,
    gradeA: 5,
    gradeB: 7,
    gradeC: 8,
    gradeD: 6,
    gradeE: 6,
    gradeF: 16
  },

  // Grade 2 (កម្រិតថ្នាក់ទី២) - January (ខែមករា)
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី២',
    classroom: 'ថ្នាក់ទី២A',
    teacherName: 'អ្នកគ្រូ ជា ម៉ារីយ៉ា',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 41,
    failed: 5,
    gradeA: 12,
    gradeB: 11,
    gradeC: 8,
    gradeD: 5,
    gradeE: 5,
    gradeF: 5
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី២',
    classroom: 'ថ្នាក់ទី២B',
    teacherName: 'លោកគ្រូ ហ៊ត សុផល',
    teacherGender: 'ប្រុស',
    month: 'ខែមករា',
    passed: 38,
    failed: 8,
    gradeA: 8,
    gradeB: 12,
    gradeC: 10,
    gradeD: 4,
    gradeE: 4,
    gradeF: 8
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី២',
    classroom: 'ថ្នាក់ទី២C',
    teacherName: 'អ្នកគ្រូ ទូច សុម៉ាលី',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 44,
    failed: 4,
    gradeA: 14,
    gradeB: 13,
    gradeC: 9,
    gradeD: 5,
    gradeE: 3,
    gradeF: 4
  },

  // Grade 3 (កម្រិតថ្នាក់ទី៣) - January (ខែមករា)
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី៣',
    classroom: 'ថ្នាក់ទី៣A',
    teacherName: 'លោកគ្រូ ចាន់ ដារ៉ា',
    teacherGender: 'ប្រុស',
    month: 'ខែមករា',
    passed: 36,
    failed: 12,
    gradeA: 7,
    gradeB: 8,
    gradeC: 10,
    gradeD: 6,
    gradeE: 5,
    gradeF: 12
  },
  {
    gradeLevel: 'កម្រិតថ្នាក់ទី៣',
    classroom: 'ថ្នាក់ទី៣B',
    teacherName: 'អ្នកគ្រូ ម៉ៅ ចាន់ដេត',
    teacherGender: 'ស្រី',
    month: 'ខែមករា',
    passed: 42,
    failed: 6,
    gradeA: 11,
    gradeB: 12,
    gradeC: 9,
    gradeD: 6,
    gradeE: 4,
    gradeF: 6
  }
];

export default function StudentResultsDashboard({ showToast, staffList }: StudentResultsDashboardProps) {
  const [results, setResults] = useState<MonthlyResult[]>(DEFAULT_RESULTS_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(null);

  // Custom teacher photos uploaded locally and persisted in localStorage
  const [customTeacherPhotos, setCustomTeacherPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('samraong_custom_teacher_photos');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [teacherImageErrors, setTeacherImageErrors] = useState<Record<string, boolean>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, teacherName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('សូមជ្រើសរើសឯកសារប្រភេទរូបភាពតែប៉ុណ្ណោះ!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result as string;
      const updated = { ...customTeacherPhotos, [teacherName]: base64Data };
      setCustomTeacherPhotos(updated);
      try {
        localStorage.setItem('samraong_custom_teacher_photos', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving custom teacher photo:', err);
      }
      showToast(`បានបញ្ចូលរូបថតជោគជ័យជូន លោកគ្រូ/អ្នកគ្រូ ${teacherName}!`, 'success');
    };
    reader.onerror = () => {
      showToast('មានកំហុសក្នុងការអានរូបថត!', 'error');
    };
    reader.readAsDataURL(file);
  };

  const findTeacherStaff = (teacherName: string) => {
    if (!staffList || !teacherName) return null;
    
    const cleanName = (name: string) => {
      return name
        .replace(/^(លោកគ្រូ|អ្នកគ្រូ|លោក|អ្នក|គ្រូ)\s*/g, '')
        .replace(/\s+/g, '')
        .trim();
    };

    const target = cleanName(teacherName);
    
    let found = staffList.find(s => cleanName(s.nameKhmer || '') === target);
    
    if (!found) {
      found = staffList.find(s => {
        const sClean = cleanName(s.nameKhmer || '');
        return sClean.includes(target) || target.includes(sClean);
      });
    }
    
    return found;
  };

  // Filter lists dynamically
  const [availableClassrooms, setAvailableClassrooms] = useState<string[]>([]);
  const [availableGradeLevels, setAvailableGradeLevels] = useState<string[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);

  // Section 1 Selected States
  const [selectedClassroom, setSelectedClassroom] = useState('ថ្នាក់ទី១A');
  const [selectedMonth1, setSelectedMonth1] = useState('ខែមករា');

  // Section 2 Selected States
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('កម្រិតថ្នាក់ទី១');
  const [selectedMonth2, setSelectedMonth2] = useState('ខែមករា');

  // Load selection filters on mount & when results state changes
  useEffect(() => {
    if (results.length > 0) {
      const classrooms = Array.from(new Set(results.map(r => r.classroom))).sort();
      const gradeLevels = Array.from(new Set(results.map(r => r.gradeLevel))).sort();
      const months = Array.from(new Set(results.map(r => r.month)));

      setAvailableClassrooms(classrooms);
      setAvailableGradeLevels(gradeLevels);
      setAvailableMonths(months);

      // Verify that active selections still exist, otherwise set default
      if (!classrooms.includes(selectedClassroom) && classrooms.length > 0) {
        setSelectedClassroom(classrooms[0]);
      }
      if (!gradeLevels.includes(selectedGradeLevel) && gradeLevels.length > 0) {
        setSelectedGradeLevel(gradeLevels[0]);
      }
      if (!months.includes(selectedMonth1) && months.length > 0) {
        setSelectedMonth1(months[0]);
      }
      if (!months.includes(selectedMonth2) && months.length > 0) {
        setSelectedMonth2(months[0]);
      }
    }
  }, [results]);

  // Helper normalizers to map sheet data (e.g., "1", "1A") to dropdown keys ("កម្រិតថ្នាក់ទី១", "ថ្នាក់ទី១A")
  const normalizeGradeLevel = (val: string): string => {
    if (!val) return 'កម្រិតថ្នាក់ទី១';
    const trimmed = val.trim().replace(/\s+/g, '');
    if (trimmed.includes('កម្រិតថ្នាក់ទី')) return trimmed;
    if (trimmed.includes('កម្រិតថ្នាក់')) return trimmed.replace('កម្រិតថ្នាក់', 'កម្រិតថ្នាក់ទី');
    if (trimmed.includes('ថ្នាក់ទី')) return trimmed.replace('ថ្នាក់ទី', 'កម្រិតថ្នាក់ទី');

    const khmerMap: { [key: string]: string } = {
      '1': 'កម្រិតថ្នាក់ទី១', '2': 'កម្រិតថ្នាក់ទី២', '3': 'កម្រិតថ្នាក់ទី៣',
      '4': 'កម្រិតថ្នាក់ទី៤', '5': 'កម្រិតថ្នាក់ទី៥', '6': 'កម្រិតថ្នាក់ទី៦',
      '១': 'កម្រិតថ្នាក់ទី១', '២': 'កម្រិតថ្នាក់ទី២', '៣': 'កម្រិតថ្នាក់ទី៣',
      '៤': 'កម្រិតថ្នាក់ទី៤', '៥': 'កម្រិតថ្នាក់ទី៥', '៦': 'កម្រិតថ្នាក់ទី៦'
    };

    if (khmerMap[trimmed]) {
      return khmerMap[trimmed];
    }
    return `កម្រិតថ្នាក់ទី${trimmed}`;
  };

  const normalizeClassroom = (val: string): string => {
    if (!val) return '';
    const trimmed = val.trim().replace(/\s+/g, '').toUpperCase();
    if (trimmed.startsWith('ថ្នាក់ទី')) return trimmed;

    const digitMap: { [key: string]: string } = {
      '1': '១', '2': '២', '3': '៣', '4': '៤', '5': '៥', '6': '៦'
    };

    const match = trimmed.match(/^([1-6])(.*)$/);
    if (match) {
      const arabicDigit = match[1];
      const suffix = match[2];
      const khmerDigit = digitMap[arabicDigit];
      return `ថ្នាក់ទី${khmerDigit}${suffix}`;
    }

    const khmerMatch = trimmed.match(/^([១-៦])(.*)$/);
    if (khmerMatch) {
      return `ថ្នាក់ទី${trimmed}`;
    }

    return trimmed;
  };

  const parseRobustNumber = (val: any): number => {
    if (val === undefined || val === null) return 0;
    const str = String(val).trim();
    if (!str) return 0;
    
    // Check if it's already a clean number
    const num = Number(str);
    if (!isNaN(num)) return Math.round(num);

    // Convert Khmer numerals to Arabic in the string
    const khmerNumeralsMap: { [key: string]: string } = {
      '០': '0', '១': '1', '២': '2', '៣': '3', '៤': '4',
      '៥': '5', '៦': '6', '៧': '7', '៨': '8', '៩': '9'
    };
    let normalized = str;
    for (const khmerDigit in khmerNumeralsMap) {
      normalized = normalized.replace(new RegExp(khmerDigit, 'g'), khmerNumeralsMap[khmerDigit]);
    }

    // Capture the first sequence of digits representing the count
    const match = normalized.match(/(\d+)/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return 0;
  };

  // Synchronize with Google Sheets automatically when the dashboard mounts
  useEffect(() => {
    handleSyncGoogleSheet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load customized sheet values
  const handleSyncGoogleSheet = async () => {
    setIsLoading(true);
    showToast('កំពុងចាប់ផ្តើមទាញយកទិន្នន័យផលិតផលសិក្សាជាក់ស្តែងពី Google Sheet...', 'info');
    const sheetId = '1iTRS8uhoWFAVeaoCwjCwoWXVLTFNQX6oVWy8KQe_rWo';
    const sheetName = encodeURIComponent('លទ្ធផលសិក្សាប្រចាំខែ');
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('ពុំអាចទាញយកទិន្នន័យបានទេ');
      const text = await res.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/);
      if (!match) {
        throw new Error('ពុំអាចបំប្លែងទិន្នន័យពី Google Sheet បានទេ។');
      }
      
      const obj = JSON.parse(match[1]);
      const table = obj.table;
      const rows = table.rows;
      const fetchedResults: MonthlyResult[] = [];
      
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
        
        const rawGradeLevel = getValue(0); // Column A
        const rawClassroom = getValue(1);  // Column B

        // Skip header lines
        if (!rawGradeLevel || !rawClassroom || rawGradeLevel.includes('កម្រិតថ្នាក់') || rawClassroom.includes('ថ្នាក់')) {
          continue;
        }

        const gradeLevel = normalizeGradeLevel(rawGradeLevel);
        const classroom = normalizeClassroom(rawClassroom);
        const teacherName = getValue(2); // Column C
        const teacherGenderStr = getValue(3); // Column D
        const teacherGender = (teacherGenderStr.includes('ស្រី') || teacherGenderStr.includes('F') || teacherGenderStr.includes('f')) ? 'ស្រី' : 'ប្រុស';
        const month = getValue(4); // Column E
        
        const passed = parseRobustNumber(getValue(5)); // Column F
        const failed = parseRobustNumber(getValue(6)); // Column G
        const gradeA = parseRobustNumber(getValue(7)); // Column H
        const gradeB = parseRobustNumber(getValue(8)); // Column I
        const gradeC = parseRobustNumber(getValue(9)); // Column J
        const gradeD = parseRobustNumber(getValue(10)); // Column K
        const gradeE = parseRobustNumber(getValue(11)); // Column L
        const gradeF = parseRobustNumber(getValue(12)); // Column M
        
        // Only push valid records
        if (gradeLevel && classroom && month) {
          fetchedResults.push({
            gradeLevel,
            classroom,
            teacherName: teacherName || 'មិនស្គាល់ឈ្មោះគ្រូ',
            teacherGender,
            month: month.startsWith('ខែ') ? month : `ខែ${month}`,
            passed,
            failed,
            gradeA,
            gradeB,
            gradeC,
            gradeD,
            gradeE,
            gradeF
          });
        }
      }

      if (fetchedResults.length > 0) {
        setResults(fetchedResults);
        const now = new Date();
        setLastSyncedTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
        showToast(`បានទាញយក និងធ្វើបច្ចុប្បន្នភាពទិន្នន័យចំនួន ${fetchedResults.length} ជួរជោគជ័យពី Google Sheet!`, 'success');
      } else {
        throw new Error('ទិន្នន័យទទេ ឬមិនត្រូវគ្នាជាមួយទម្រង់ដែលចង់បាន។');
      }
    } catch (err: any) {
      console.error(err);
      showToast(`កំហុសក្នុងការ sync៖ ${err.message || 'សូមពិនិត្យការតភ្ជាប់អ៊ីនធឺណែត'}។ បានប្រើប្រាស់ទិន្នន័យក្របខណ្ឌគំរូ។`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // CALCULATIONS FOR SECTION 1 (BY CLASSROOM)
  // ==========================================
  const activeClassResult = results.find(
    r => r.classroom === selectedClassroom && r.month === selectedMonth1
  ) || {
    gradeLevel: 'មិនមានទិន្នន័យ',
    classroom: selectedClassroom,
    teacherName: 'មិនទាន់មានគ្រូបញ្ចូល',
    teacherGender: 'ស្រី' as const,
    month: selectedMonth1,
    passed: 0,
    failed: 0,
    gradeA: 0,
    gradeB: 0,
    gradeC: 0,
    gradeD: 0,
    gradeE: 0,
    gradeF: 0
  };

  const totalClassStudents = activeClassResult.passed + activeClassResult.failed;
  const classPassedRate = totalClassStudents > 0 ? Math.round((activeClassResult.passed / totalClassStudents) * 100) : 0;
  const classFailedRate = totalClassStudents > 0 ? Math.round((activeClassResult.failed / totalClassStudents) * 100) : 0;

  // Grade lists for charts
  const gradeDistributionData = [
    { label: 'និទ្ទេស A', count: activeClassResult.gradeA, color: 'bg-emerald-500', barColor: '#10b981' },
    { label: 'និទ្ទេស B', count: activeClassResult.gradeB, color: 'bg-teal-500', barColor: '#14b8a6' },
    { label: 'និទ្ទេស C', count: activeClassResult.gradeC, color: 'bg-blue-500', barColor: '#3b82f6' },
    { label: 'និទ្ទេស D', count: activeClassResult.gradeD, color: 'bg-amber-500', barColor: '#f59e0b' },
    { label: 'និទ្ទេស E', count: activeClassResult.gradeE, color: 'bg-orange-500', barColor: '#f97316' },
    { label: 'និទ្ទេស F', count: activeClassResult.gradeF, color: 'bg-rose-500', barColor: '#f43f5e' }
  ];

  const maxGradeCount = Math.max(...gradeDistributionData.map(g => g.count), 5);
  const roundedMaxGrade = Math.ceil(maxGradeCount / 5) * 5;

  // ==========================================
  // CALCULATIONS FOR SECTION 2 (BY GRADE LEVEL)
  // ==========================================
  const gradeLevelClasses = results.filter(
    r => r.gradeLevel === selectedGradeLevel && r.month === selectedMonth2
  );

  const totalGradePassed = gradeLevelClasses.reduce((sum, r) => sum + r.passed, 0);
  const totalGradeFailed = gradeLevelClasses.reduce((sum, r) => sum + r.failed, 0);
  const totalGradeStudents = totalGradePassed + totalGradeFailed;

  const gradePassedRatePercentage = totalGradeStudents > 0 ? Math.round((totalGradePassed / totalGradeStudents) * 100) : 0;
  const gradeFailedRatePercentage = totalGradeStudents > 0 ? Math.round((totalGradeFailed / totalGradeStudents) * 100) : 0;

  // Find class with highest passed rate in this grade level
  const classRecordsWithRates = gradeLevelClasses.map(c => {
    const total = c.passed + c.failed;
    const rate = total > 0 ? (c.passed / total) : 0;
    return { ...c, rate, total };
  });

  const topClassRecord = classRecordsWithRates.length > 0
    ? [...classRecordsWithRates].sort((a, b) => b.rate - a.rate || b.passed - a.passed)[0]
    : null;

  // Max value for Grouped Bar Chart
  const maxClassStudentsCount = gradeLevelClasses.length > 0
    ? Math.max(...gradeLevelClasses.map(c => Math.max(c.passed, c.failed, 5)))
    : 10;
  const roundedMaxClassCount = Math.ceil(maxClassStudentsCount / 10) * 10;

  // ==========================================
  // DOWNLOADING INTERFACE HANDLER (EXPORT / PRINT)
  // ==========================================
  const triggerDownloadPNG = (title: string) => {
    const elementId = title === 'លទ្ធផលសិក្សាតាមថ្នាក់រៀន' 
      ? 'classroom-analysis-viewport' 
      : 'grade-analysis-viewport';
      
    const element = document.getElementById(elementId);
    if (!element) {
      showToast('រកមិនឃើញតំបន់សម្រាប់រក្សាទុកជារូបភាពឡើយ!', 'error');
      try {
        window.print();
      } catch (err) {
        console.error(err);
      }
      return;
    }

    showToast(`កំពុងដំណើរការបង្កើតរូបភាព ${title}...`, 'info');

    // Temporarily hide elements we don't want in the final exported PNG image (like dropdown selects, buttons)
    const hiddenElements = element.querySelectorAll('button, select, input[type="file"]');
    hiddenElements.forEach((el: any) => {
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      el.style.transition = 'none';
    });

    // Run toPng conversion
    toPng(element, {
      backgroundColor: '#030712', // match design background perfectly
      style: {
        transform: 'scale(1)',
        padding: '24px', // Add beautiful breathing room padding on the exported graphic
        borderRadius: '16px',
        boxShadow: 'none'
      },
      cacheBust: true,
      skipFonts: true, // Bypass external fonts to ensure robust rendering and speed
    })
    .then((dataUrl) => {
      // Instantly restore visibility
      hiddenElements.forEach((el: any) => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.style.transition = '';
      });

      const link = document.createElement('a');
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
      showToast(`បានរក្សាទុក ${title} ជារូបភាព PNG រួចរាល់!`, 'success');
    })
    .catch((error) => {
      console.error('Error generating image:', error);
      // Restore on failure
      hiddenElements.forEach((el: any) => {
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.style.transition = '';
      });

      showToast('មានបញ្ហាក្នុងការរក្សាទុកជារូបភាព! កំពុងប្តូរទៅកាន់ផ្ទាំងបោះពុម្ពជំនួសវិញ។', 'info');
      try {
        window.print();
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-20">
      
      {/* Dynamic Sync Utility Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 border border-indigo-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20 shrink-0">
            <TrendingUp className="text-indigo-400" size={20} />
          </div>
          <div>
            <h4 className="text-slate-100 text-xs sm:text-sm font-bold flex items-center gap-1.5 font-sans">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              មជ្ឈមណ្ឌលវិភាគ និងវាយតម្លៃលទ្ធផលការសិក្សា
            </h4>
            <p className="text-[10px] text-slate-400 font-light mt-0.5">
              {lastSyncedTime ? `ធ្វើបច្ចុប្បន្នភាពសន្លឹកចុងក្រោយនៅ៖ ${lastSyncedTime}` : 'ទិន្នន័យស្វ័យប្រវត្តិកំពុងដំណើរការជាមួយសន្លឹកគំរូខ្ពស់'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSyncGoogleSheet}
          disabled={isLoading}
          className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-750 text-white font-black text-xs transition active:scale-95 shadow-lg shadow-indigo-950/40 cursor-pointer w-full sm:w-auto justify-center"
        >
          <RefreshCw size={14} className={`${isLoading ? 'animate-spin' : ''}`} />
          <span>ទាញយកទិន្នន័យពី G-Sheet</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: Results by Classroom / លទ្ធផលសិក្សាតាមថ្នាក់រៀន */}
      {/* ======================================================== */}
      <div id="classroom-analysis-card" className="bg-slate-950/10 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-0.5">
        
        {/* Banner header resembling standard PDF mockup layout */}
        <div className="bg-slate-900/60 p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-6 bg-emerald-500 rounded-full shrink-0 self-center"/>
            <div>
              <h2 className="text-slate-100 font-black text-md leading-none font-sans">ផ្នែកទី១៖ លទ្ធផលសិក្សាតាមថ្នាក់រៀន</h2>
              <p className="text-[10.5px] text-slate-400 font-light mt-1.5">
                ជ្រើសរើសថ្នាក់រៀន និងខែវិភាគ ដើម្បីវិភាគលទ្ធផលសិស្សជាប់-ធ្លាក់ និងកម្រិតនិទ្ទេសសិក្សា
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => triggerDownloadPNG('លទ្ធផលសិក្សាតាមថ្នាក់រៀន')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 transition text-[11px] font-bold"
          >
            <Download size={13} className="text-emerald-400" />
            <span>រក្សាទុកក្រាប PNG</span>
          </button>
        </div>

        {/* Control Box: Selector Dropdowns */}
        <div className="p-6 bg-slate-950/40 border-b border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Class Selector Dropdown */}
          <div className="md:col-span-4 space-y-2">
            <label className="text-[11px] text-slate-400 font-medium font-sans">ជ្រើសរើសថ្នាក់រៀន</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400">
                <Layers size={14} />
              </span>
              <select
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {availableClassrooms.map(c => (
                  <option key={c} value={c} className="bg-slate-950 font-sans">{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Month Selector Dropdown */}
          <div className="md:col-span-4 space-y-2">
            <label className="text-[11px] text-slate-400 font-medium font-sans">ជ្រើសរើសខែសិក្សា</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
                <Calendar size={14} />
              </span>
              <select
                value={selectedMonth1}
                onChange={(e) => setSelectedMonth1(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {availableMonths.map(m => (
                  <option key={m} value={m} className="bg-slate-950 font-sans">{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Teacher Info display exactly matching mock */}
          {(() => {
            const matchedTeacher = findTeacherStaff(activeClassResult.teacherName);
            const customPhoto = customTeacherPhotos[activeClassResult.teacherName];
            const hasMatchedPhoto = matchedTeacher?.photoUrl && !teacherImageErrors[matchedTeacher.id];
            const displayPhoto = customPhoto || (hasMatchedPhoto ? matchedTeacher.photoUrl : null);
            const initials = matchedTeacher?.nameKhmer 
              ? matchedTeacher.nameKhmer.replace(/\s+/g, '').substring(0, 2)
              : activeClassResult.teacherName.replace(/^(លោកគ្រូ|អ្នកគ្រូ|លោក|អ្នក|គ្រូ)\s*/g, '').replace(/\s+/g, '').substring(0, 2);

            return (
              <div 
                id="teacher-info-card" 
                className="md:col-span-4 lg:col-span-4 bg-gradient-to-br from-emerald-950/20 via-slate-900/40 to-slate-950/60 border border-emerald-500/20 md:border-emerald-500/30 rounded-xl p-3 flex flex-col items-center justify-center relative group shadow-[0_10px_25px_-5px_rgba(16,185,129,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:shadow-[0_20px_35px_-5px_rgba(16,185,129,0.15)] transition-all duration-300 min-h-[92px]"
              >
                <div 
                  onClick={() => document.getElementById(`upload-dashboard-file`)?.click()}
                  className={`h-15 w-15 rounded-full flex items-center justify-center font-bold text-base font-sans shrink-0 relative overflow-hidden cursor-pointer border shadow-[0_4px_12px_rgba(0,0,0,0.4)] ring-4 ${
                    displayPhoto 
                      ? 'border-emerald-400/40 ring-emerald-500/10 group-hover:ring-emerald-500/25 group-hover:scale-105' 
                      : (activeClassResult.teacherGender === 'ស្រី' 
                          ? 'bg-gradient-to-br from-pink-500/20 to-pink-600/10 text-pink-400 border-pink-500/30 ring-pink-500/10 group-hover:ring-pink-500/20 group-hover:scale-105' 
                          : 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 text-indigo-400 border-indigo-500/30 ring-indigo-500/10 group-hover:ring-indigo-500/20 group-hover:scale-105')
                  } transition-all duration-300`}
                  title="ចុចទីនេះ ដើម្បីប្តូររូបថត"
                >
                  {displayPhoto ? (
                    <img 
                      src={displayPhoto} 
                      alt={activeClassResult.teacherName} 
                      className="absolute inset-0 h-full w-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (matchedTeacher?.id) {
                          setTeacherImageErrors(prev => ({ ...prev, [matchedTeacher.id]: true }));
                        }
                      }}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}

                  {/* Camera Icon Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-full">
                    <Camera size={14} className="text-emerald-400" />
                  </div>
                </div>

                {/* Hidden File Input */}
                <input 
                  type="file" 
                  id="upload-dashboard-file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handlePhotoUpload(e, activeClassResult.teacherName)} 
                />

                <div className="text-center mt-2.5 w-full flex flex-col items-center">
                  <p className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">គ្រូទទួលបន្ទុកថ្នាក់</p>
                  <h5 className="text-emerald-400 text-xs font-black mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] select-none truncate max-w-[200px]">
                    {activeClassResult.teacherName}
                  </h5>
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 mt-1 font-sans">
                    <span className="text-[9.5px] text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">
                      កម្រិត៖ {activeClassResult.gradeLevel}
                    </span>
                    {matchedTeacher?.phone && (
                      <span className="text-[9.5px] text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded font-mono">
                        {matchedTeacher.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

        </div>

        {/* Dashboard Analytics Viewport */}
        <div id="classroom-analysis-viewport" className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Summary Blocks (សិស្សជាប់ & សិស្សធ្លាក់) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Passed Card */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-left relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient from-emerald-500/5 via-transparent to-transparent pointer-events-none rounded-full" />
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold font-sans">សិស្សជាប់</span>
                <h3 className="text-2xl md:text-3xl font-black text-emerald-400 font-sans mt-1">
                  {activeClassResult.passed} <span className="text-slate-350 text-xs font-normal">នាក់</span>
                </h3>
                <p className="text-[10px] text-slate-450 font-light text-slate-400">លើចំនួនសិស្សសរុប {totalClassStudents} នាក់</p>
              </div>

              <div className="mt-4 space-y-1.5 pt-2 border-t border-slate-900">
                {/* Horizontal Progress bar */}
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${classPassedRate}%` }}
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-450 font-light text-slate-400">អត្រាជាប់</span>
                  <span className="text-emerald-400 font-mono">{classPassedRate}%</span>
                </div>
              </div>
            </div>

            {/* Failed Card */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 text-left relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 h-16 w-16 bg-radial-gradient from-rose-500/5 via-transparent to-transparent pointer-events-none rounded-full" />
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold font-sans">សិស្សធ្លាក់</span>
                <h3 className="text-2xl md:text-3xl font-black text-rose-450 text-rose-400 font-sans mt-1">
                  {activeClassResult.failed} <span className="text-slate-350 text-xs font-normal">នាក់</span>
                </h3>
                <p className="text-[10px] text-rose-500/80 font-normal">តម្រូវឱ្យពង្រឹងការរៀនបន្ថែម និងជួយគាំទ្រ</p>
              </div>

              <div className="mt-4 space-y-1.5 pt-2 border-t border-slate-900">
                {/* Horizontal Progress bar */}
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${classFailedRate}%` }}
                    className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-slate-455 font-light text-slate-400">អត្រាធ្លាក់</span>
                  <span className="text-rose-400 font-mono">{classFailedRate}%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right SVG Grades Bar Chart exactly duplicating Screenshot 1 */}
          <div className="lg:col-span-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            
            <div className="border-b border-slate-900 pb-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                ក្រាបបង្ហាញលទ្ធផលសិក្សានិទ្ទេស (A - F) ថ្នាក់ {selectedClassroom} ខែ {selectedMonth1.substring(2)}
              </h4>
            </div>

            {/* Live SVG Graph Renderer */}
            <div className="h-64 mt-6 flex relative">
              
              {/* Y Scale Column Indicators */}
              <div className="w-12 h-48 flex flex-col justify-between text-[10px] font-mono font-bold text-slate-400 select-none pb-2 text-right pr-2">
                <span>{roundedMaxGrade} នាក់</span>
                <span>{Math.round(roundedMaxGrade * 0.75)} នាក់</span>
                <span>{Math.round(roundedMaxGrade * 0.5)} នាក់</span>
                <span>{Math.round(roundedMaxGrade * 0.25)} នាក់</span>
                <span>0</span>
              </div>

              {/* Chart Core Canvas */}
              <div className="flex-1 h-48 relative border-b border-l border-slate-800/60 flex items-end justify-around px-2 sm:px-4">
                
                {/* Dotted horizontal grids */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-0.5">
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="h-0 w-full"></div>
                </div>

                {/* Draw Individual Colored Bars */}
                {gradeDistributionData.map((gradeVal, index) => {
                  const percentageHeight = (gradeVal.count / roundedMaxGrade) * 80;
                  
                  return (
                    <div key={index} className="h-full flex flex-col justify-end items-center relative w-12 sm:w-16 group pb-7">
                      
                      {/* Interactive block bar with dynamic height */}
                      <div 
                        style={{ height: `${Math.max(percentageHeight, 3)}%` }}
                        className={`w-8 sm:w-10 rounded-t-lg transition-all duration-1000 ease-out hover:brightness-110 shadow-lg cursor-pointer ${gradeVal.color} relative`}
                        title={`${gradeVal.label}៖ ${gradeVal.count} នាក់`}
                      >
                        {/* Active count badge positioned absolutely above the bar */}
                        <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-[10px] sm:text-[11px] font-black font-sans text-slate-200 select-none whitespace-nowrap">
                          {gradeVal.count} នាក់
                        </span>
                      </div>

                      {/* X Label */}
                      <span className="absolute bottom-1 text-[10px] sm:text-[11px] font-medium text-slate-400 font-sans whitespace-nowrap">
                        {gradeVal.label}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* SECTION 2: Results by Grade Level / លទ្ធផលសិក្សាតាមកម្រិតថ្នាក់ */}
      {/* ======================================================== */}
      <div id="grade-analysis-card" className="bg-slate-950/10 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-0.5">
        
        {/* Banner header */}
        <div className="bg-slate-900/60 p-5 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-start gap-3">
            <span className="w-2.5 h-6 bg-indigo-500 rounded-full shrink-0 self-center"/>
            <div>
              <h2 className="text-slate-100 font-black text-md leading-none font-sans">ផ្នែកទី២៖ លទ្ធផលសិក្សាតាមកម្រិតថ្នាក់</h2>
              <p className="text-[10.5px] text-slate-400 font-light mt-1.5">
                វាយតម្លៃកម្រិតសិក្សារួមប្រៀបធៀបគ្រប់ថ្នាក់ ក្នុងកម្រិតថ្នាក់តែមួយ និងស្វែងរកថ្នាក់គំរូ
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => triggerDownloadPNG('លទ្ធផលសិក្សាតាមកម្រិតថ្នាក់')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 transition text-[11px] font-bold"
          >
            <Download size={13} className="text-indigo-400" />
            <span>រក្សាទុកក្រាប PNG</span>
          </button>
        </div>

        {/* Control Box: Selector Dropdowns */}
        <div className="p-6 bg-slate-950/40 border-b border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Grade Selector Dropdown */}
          <div className="space-y-2 text-left">
            <label className="text-[11px] text-slate-400 font-medium font-sans">ជ្រើសរើសកម្រិតថ្នាក់</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400">
                <Layers size={14} />
              </span>
              <select
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold focus:outline-none cursor-pointer"
              >
                {availableGradeLevels.map(g => (
                  <option key={g} value={g} className="bg-slate-950 font-sans">{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Month Selector Dropdown */}
          <div className="space-y-2 text-left">
            <label className="text-[11px] text-slate-400 font-medium font-sans">ជ្រើសរើសការសង្កេត</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-emerald-400">
                <Calendar size={14} />
              </span>
              <select
                value={selectedMonth2}
                onChange={(e) => setSelectedMonth2(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 font-bold focus:outline-none cursor-pointer"
              >
                {availableMonths.map(m => (
                  <option key={m} value={m} className="bg-slate-950 font-sans">{m}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Dashboard Analytics Viewport */}
        <div id="grade-analysis-viewport" className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Summary: Donut Stats & Numeric Insights */}
          <div className="lg:col-span-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between gap-6">
            
            {/* Header */}
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">ស្ថិតិប្រៀបធៀបក្នុងកម្រិត</p>
              <h4 className="text-md font-black text-[#ffffff]" style={{ color: '#ffffff' }}>
                {selectedGradeLevel.replace('កម្រិត', 'កម្រិតថ្នាក់')}
              </h4>
              <p className="text-[10px] text-slate-400 mt-1">
                ចំនួនសរុបបង្ហាញការប្រកួតប្រជែងសិក្សាយ៉ាងសកម្ម រវាងថ្នាក់រៀនទាំងឡាយ។
              </p>
            </div>

            {/* High fidelity SVG Donut Ring matching Screenshot 2 */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center shrink-0">
              
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                {/* Ring background */}
                <circle cx="70" cy="70" r="54" className="stroke-slate-900 fill-none" strokeWidth="12" />
                
                {/* Passed slice (Green) */}
                <circle 
                  cx="70" 
                  cy="70" 
                  r="54" 
                  className="stroke-emerald-500 fill-none transition-all duration-1000" 
                  strokeWidth="12"
                  strokeDasharray={`${(gradePassedRatePercentage / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                />

                {/* Failed slice (Red) */}
                <circle 
                  cx="70" 
                  cy="70" 
                  r="54" 
                  className="stroke-rose-500 fill-none transition-all duration-1000" 
                  strokeWidth="11"
                  strokeDasharray={`${(gradeFailedRatePercentage / 100) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                  strokeDashoffset={-((gradePassedRatePercentage / 100) * 2 * Math.PI * 54)}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Metrics details */}
              <div className="absolute flex flex-col items-center text-center pointer-events-none">
                <span className="text-[10px] text-slate-400 font-medium">សិស្សសរុប</span>
                <span className="text-lg font-black text-slate-100 font-sans tracking-tight mt-0.5">
                  {totalGradeStudents}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">នាក់</span>
              </div>

            </div>

            {/* Custom donut chart legends */}
            <div className="flex justify-center items-center gap-4 text-[10.5px] font-bold border-b border-slate-900 pb-3">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                ជាប់ {gradePassedRatePercentage}%
              </span>
              <span className="flex items-center gap-1 text-rose-455 text-rose-400">
                <span className="h-2 w-2 rounded-full bg-rose-500"/>
                ធ្លាក់ {gradeFailedRatePercentage}%
              </span>
            </div>

            {/* Insights text items matching mockup exactly */}
            <div className="space-y-2 text-[11px] pt-1">
              
              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400">ថ្នាក់ដែលមានអត្រាជាប់ខ្ពស់បំផុត៖</span>
                <span className="text-emerald-400 font-black">{topClassRecord ? topClassRecord.classroom : 'N/A'}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-900">
                <span className="text-slate-400">ចំនួនសិស្សជាប់សរុបកម្រិត៖</span>
                <span className="text-slate-100 font-bold font-mono">{totalGradePassed} នាក់</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400">ចំនួនសិស្សធ្លាក់សរុបកម្រិត៖</span>
                <span className="text-rose-455 font-bold font-mono text-rose-400">{totalGradeFailed} នាក់</span>
              </div>

            </div>

          </div>

          {/* Right SVG Grouped Side-by-Side Bar Chart exactly duplicating Screenshot 2 */}
          <div className="lg:col-span-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            
            <div className="border-b border-slate-900 pb-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-200">
                ក្រាបប្រៀបធៀបលទ្ធផលសិក្សាក្នុងកម្រិតថ្នាក់ {selectedGradeLevel} ខែ {selectedMonth2.substring(2)}
              </h4>
            </div>

            {/* Live SVG Graph Canvas */}
            <div className="h-68 mt-6 flex relative">
              
              {/* Y Axis scales */}
              <div className="w-12 h-48 flex flex-col justify-between text-[9.5px] font-mono font-bold text-slate-400 select-none pb-2 text-right pr-2">
                <span>{roundedMaxClassCount} នាក់</span>
                <span>{Math.round(roundedMaxClassCount * 0.75)} នាក់</span>
                <span>{Math.round(roundedMaxClassCount * 0.5)} នាក់</span>
                <span>{Math.round(roundedMaxClassCount * 0.25)} នាក់</span>
                <span>0</span>
              </div>

              {/* Chart Core Canvas */}
              <div className="flex-1 h-52 relative border-b border-l border-slate-800/60 flex items-end justify-around px-2 sm:px-4">
                
                {/* Dotted grids background */}
                <div className="absolute inset-y-0 inset-x-0 bottom-4 flex flex-col justify-between pointer-events-none pb-0.5">
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="border-t border-dashed border-slate-900/60 w-full"></div>
                  <div className="h-0 w-full"></div>
                </div>

                {/* Render Group of Bars */}
                {gradeLevelClasses.map((item, index) => {
                  const passedHeight = (item.passed / roundedMaxClassCount) * 80;
                  const failedHeight = (item.failed / roundedMaxClassCount) * 80;

                  return (
                    <div key={index} className="h-48 flex flex-col justify-end items-center relative w-16 sm:w-20 pb-7">
                      
                      {/* Paired pillars container side-by-side */}
                      <div className="flex items-end gap-1.5 sm:gap-2 h-36">
                        
                        {/* 1. Passed Bar (Green) */}
                        <div className="h-full flex flex-col justify-end items-center relative w-6 sm:w-8 group/passed">
                          <div 
                            style={{ height: `${Math.max(passedHeight, 3)}%` }}
                            className="w-3 sm:w-4.5 bg-emerald-500 rounded-t transition-all duration-1000 ease-out hover:brightness-110 shadow relative"
                            title={`${item.classroom} ជាប់៖ ${item.passed}`}
                          >
                            <span className="absolute -top-4.5 left-1/2 transform -translate-x-1/2 text-[9px] text-emerald-400 font-bold select-none whitespace-nowrap">
                              {item.passed}
                            </span>
                          </div>
                        </div>

                        {/* 2. Failed Bar (Red) */}
                        <div className="h-full flex flex-col justify-end items-center relative w-6 sm:w-8 group/failed">
                          <div 
                            style={{ height: `${Math.max(failedHeight, 3)}%` }}
                            className="w-3 sm:w-4.5 bg-rose-500 rounded-t transition-all duration-1000 ease-out hover:brightness-110 shadow relative"
                            title={`${item.classroom} ធ្លាក់៖ ${item.failed}`}
                          >
                            <span className="absolute -top-4.5 left-1/2 transform -translate-x-1/2 text-[9px] text-rose-400 font-bold select-none whitespace-nowrap">
                              {item.failed}
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* X axis Classroom label */}
                      <span className="absolute bottom-1 text-[10px] sm:text-[11px] font-bold text-slate-250 font-sans whitespace-nowrap border-t border-slate-900/80 pt-1 w-full text-center">
                        {item.classroom}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Custom chart legend indicators at the bottom */}
            <div className="border-t border-slate-900 pt-3 flex justify-end gap-4 text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-emerald-500"/>
                សិស្សជាប់
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded bg-rose-500"/>
                សិស្សធ្លាក់
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
