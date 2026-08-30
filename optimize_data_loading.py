# -*- coding: utf-8 -*-
import json

with open("src/data/VietnamCurriculumData.ts", "r", encoding="utf-8") as f:
    content = f.read()

json_start = content.find("export const VIETNAM_CURRICULUM_DATA: CurriculumLesson[] = ") + len("export const VIETNAM_CURRICULUM_DATA: CurriculumLesson[] = ")
json_str = content[json_start:].strip()
if json_str.endswith(";"):
    json_str = json_str[:-1]

lessons = json.loads(json_str)

# Save to pure JSON
with open("src/data/vietnamCurriculumData.json", "w", encoding="utf-8") as f:
    json.dump(lessons, f, ensure_ascii=False, indent=2)

print("Saved src/data/vietnamCurriculumData.json")

# Update VietnamCurriculumData.ts
ts_code = """import rawCurriculumData from './vietnamCurriculumData.json';

export interface CurriculumSection {
    heading: { VN: string; EN: string };
    points: { VN: string; EN: string }[];
}

export interface CurriculumLesson {
    id: string;
    code: string;
    lessonNumber: number;
    grade: 8 | 9 | 10 | 11 | 12;
    chapterNumber: number;
    chapterTitle: { VN: string; EN: string };
    title: { VN: string; EN: string };
    summary: { VN: string; EN: string };
    sections?: CurriculumSection[];
    keyFormulas: string[];
    equations: string[];
    theoryPoints: { VN: string; EN: string }[];
    sampleQuestion: {
        question: { VN: string; EN: string };
        answer: { VN: string; EN: string };
    };
    suggestedReagents: string[];
}

export interface GradeTextbookInfo {
    grade: 8 | 9 | 10 | 11 | 12;
    title: { VN: string; EN: string };
    pdfFileName: string;
    pdfUrl: string;
    description: { VN: string; EN: string };
}

export const TEXTBOOK_CATALOG: Record<number, GradeTextbookInfo> = {
    8: {
        grade: 8,
        title: { VN: 'Sách Giáo Khoa Hóa Học 8', EN: 'Grade 8 Chemistry Textbook' },
        pdfFileName: 'sach-giao-khoa-hoa-hoc-8.pdf',
        pdfUrl: './textbooks/sach-giao-khoa-hoa-hoc-8.pdf',
        description: {
            VN: 'Nền tảng mở đầu: Chất, Nguyên tử, Phân tử, Phản ứng hóa học, Mol, Oxi - Không khí, Hiđro - Nước và Dung dịch (45 bài học đầy đủ).',
            EN: 'Foundations: Matter, Atoms, Molecules, Chemical Reactions, The Mole, Oxygen, Hydrogen & Solutions (45 complete lessons).'
        }
    },
    9: {
        grade: 9,
        title: { VN: 'Sách Giáo Khoa Hóa Học 9', EN: 'Grade 9 Chemistry Textbook' },
        pdfFileName: 'sach-giao-khoa-hoa-hoc-9.pdf',
        pdfUrl: './textbooks/sach-giao-khoa-hoa-hoc-9.pdf',
        description: {
            VN: 'Hợp chất vô cơ (Oxit, Axit, Bazơ, Muối), Kim loại, Phi kim, Bảng tuần hoàn và Đại cương Hóa hữu cơ (56 bài học đầy đủ).',
            EN: 'Inorganic Families (Oxides, Acids, Bases, Salts), Metals, Non-metals, Periodic Table & Organic Chemistry (56 complete lessons).'
        }
    },
    10: {
        grade: 10,
        title: { VN: 'SGK Hóa Học 10 (Kết Nối Tri Thức)', EN: 'Grade 10 Chemistry (Knowledge Connection)' },
        pdfFileName: 'sach-giao-khoa-hoa-hoc-10-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        pdfUrl: './textbooks/sach-giao-khoa-hoa-hoc-10-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        description: {
            VN: 'Chương trình GDPT 2018: Cấu tạo nguyên tử, Bảng tuần hoàn, Liên kết hóa học, Phản ứng oxi hóa - khử, Enthalpy nhiệt hóa học và Nhóm Halogen (23 bài học đầy đủ).',
            EN: 'GDPT 2018: Atomic Structure, Periodic Trends, Chemical Bonding, Redox Reactions, Enthalpy & Halogens (23 complete lessons).'
        }
    },
    11: {
        grade: 11,
        title: { VN: 'SGK Hóa Học 11 (Kết Nối Tri Thức)', EN: 'Grade 11 Chemistry (Knowledge Connection)' },
        pdfFileName: 'sach-giao-khoa-hoa-hoc-11-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        pdfUrl: './textbooks/sach-giao-khoa-hoa-hoc-11-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        description: {
            VN: 'Chương trình GDPT 2018: Cân bằng hóa học, Dung dịch nước & pH, Nitrogen - Sulfur, Đại cương hóa hữu cơ, Hydrocarbon, Dẫn xuất halogen, Alcohol, Phenol, Carbonyl & Axit cacboxylic (25 bài học đầy đủ).',
            EN: 'GDPT 2018: Chemical Equilibrium, Solution Chemistry & pH, N-S Cycles, Organic Mechanisms, Carbonyls & Acids (25 complete lessons).'
        }
    },
    12: {
        grade: 12,
        title: { VN: 'SGK Hóa Học 12 (Kết Nối Tri Thức)', EN: 'Grade 12 Chemistry (Knowledge Connection)' },
        pdfFileName: 'sach-giao-khoa-hoa-hoc-12-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        pdfUrl: './textbooks/sach-giao-khoa-hoa-hoc-12-ket-noi-tri-thuc-voi-cuoc-song.pdf',
        description: {
            VN: 'Chuyên sâu & Luyện thi THPTQG: Ester - Lipid, Carbohydrate, Hợp chất chứa Nitrogen (Amine, Peptide), Polymer, Pin điện hóa & Điện phân, Kim loại kiềm/kiềm thổ và Phức chất (30 bài học đầy đủ).',
            EN: 'National Exam Prep: Esters, Lipids, Carbohydrates, Amines, Polymers, Electrochemistry & Coordination Chemistry (30 complete lessons).'
        }
    }
};

export const VIETNAM_CURRICULUM_DATA: CurriculumLesson[] = rawCurriculumData as unknown as CurriculumLesson[];
"""

with open("src/data/VietnamCurriculumData.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Updated VietnamCurriculumData.ts to import JSON directly!")
