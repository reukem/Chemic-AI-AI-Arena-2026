import { GoogleAuthService } from './GoogleAuthService';
import { CHEMICAL_REGISTRY } from '../data/ChemicalRegistry';

export interface LabReportData {
    title: string;
    experimentType: string;
    containers: any[];
    reactionsEncountered: string[];
    temperatureRange: { min: number; max: number };
    phValues: number[];
    observations: string[];
    conclusions: string[];
}

export class LabReportExporter {
    public static generateHtmlReport(data: LabReportData, language: 'EN' | 'VN' = 'VN'): string {
        const isVi = language === 'VN';
        const user = GoogleAuthService.getUser();
        const now = new Date().toLocaleString(isVi ? 'vi-VN' : 'en-US', { dateStyle: 'full', timeStyle: 'short' });

        return `<!DOCTYPE html>
<html lang="${isVi ? 'vi' : 'en'}">
<head>
    <meta charset="UTF-8">
    <title>${data.title} - Chemic-AI Lab Report</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            color: #1e293b;
            background-color: #ffffff;
            margin: 0;
            padding: 40px;
            line-height: 1.6;
        }
        .header-table {
            width: 100%;
            border-bottom: 3px solid #0284c7;
            padding-bottom: 15px;
            margin-bottom: 30px;
        }
        .institution {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #0284c7;
        }
        .title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin: 5px 0;
        }
        .meta {
            font-size: 12px;
            color: #64748b;
        }
        .badge {
            display: inline-block;
            background: #e0f2fe;
            color: #0369a1;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
        }
        h2 {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            border-left: 4px solid #0284c7;
            padding-left: 10px;
            margin-top: 25px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 13px;
        }
        th, td {
            border: 1px solid #cbd5e1;
            padding: 10px 14px;
            text-align: left;
        }
        th {
            background-color: #f1f5f9;
            font-weight: 700;
            color: #334155;
        }
        .equation-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 15px;
            font-weight: 700;
            color: #0369a1;
            text-align: center;
            margin: 15px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
            font-size: 11px;
            color: #94a3b8;
            text-align: center;
        }
    </style>
</head>
<body>
    <table class="header-table" border="0">
        <tr>
            <td>
                <div class="institution">CHEMIC-AI // GOOGLE AI RISER VIETNAM 2026 // LAB REPORT</div>
                <div class="title">${data.title}</div>
                <div class="meta">
                    <strong>${isVi ? 'Học sinh / Thí nghiệm viên:' : 'Student Investigator:'}</strong> ${user.name} (${user.email})<br>
                    <strong>${isVi ? 'Thời gian thực nghiệm:' : 'Experiment Timestamp:'}</strong> ${now}
                </div>
            </td>
            <td style="text-align: right; vertical-align: top;">
                <span class="badge">Google Workspace Verified</span><br><br>
                <span class="badge">Gemini 2.5 Powered</span>
            </td>
        </tr>
    </table>

    <h2>1. ${isVi ? 'Mục Đích & Cơ Sở Lý Thuyết' : 'Objective & Theoretical Foundation'}</h2>
    <p>
        ${isVi 
            ? 'Thực hiện khảo sát động học, tính chất vật lý - hóa học và hiện tượng nhiệt động lực học trong mô phỏng phòng thí nghiệm lượng tử Chemic-AI theo chương trình Hóa học GDPT 2018.'
            : 'Investigate reaction kinetics, stoichiometric yields, and thermodynamic phenomena using the Chemic-AI virtual laboratory engine aligned with standard chemistry curricula.'}
    </p>

    <h2>2. ${isVi ? 'Hóa Chất & Dụng Cụ Thực Nghiệm' : 'Reagents & Laboratory Apparatus'}</h2>
    <table>
        <thead>
            <tr>
                <th>${isVi ? 'Dụng Cụ' : 'Apparatus'}</th>
                <th>${isVi ? 'Hóa Chất' : 'Reagent / Compound'}</th>
                <th>${isVi ? 'Công Thức' : 'Formula'}</th>
                <th>${isVi ? 'Thể Tích (mL)' : 'Volume (mL)'}</th>
                <th>pH</th>
            </tr>
        </thead>
        <tbody>
            ${data.containers.map(c => {
                const contents = Object.entries(c.contents || {});
                if (contents.length === 0) {
                    return `<tr>
                        <td>${c.type.toUpperCase()} #${c.id + 1}</td>
                        <td colspan="4"><em>${isVi ? 'Bình rỗng' : 'Empty Vessel'}</em></td>
                    </tr>`;
                }
                return contents.map(([chemId, vol]) => {
                    const reg = CHEMICAL_REGISTRY[chemId];
                    const name = reg ? ((reg.name as any)[language] || reg.name.EN) : chemId;
                    const formula = reg ? reg.formula : chemId;
                    return `<tr>
                        <td>${c.type.toUpperCase()} #${c.id + 1}</td>
                        <td><strong>${name}</strong></td>
                        <td style="font-family: 'JetBrains Mono', monospace;">${formula}</td>
                        <td>${Number(vol).toFixed(1)}</td>
                        <td>${c.ph ? c.ph.toFixed(1) : '7.0'}</td>
                    </tr>`;
                }).join('');
            }).join('')}
        </tbody>
    </table>

    <h2>3. ${isVi ? 'Phương Trình Phản Ứng & Hiện Tượng Quan Sát' : 'Reaction Equations & Observations'}</h2>
    ${data.reactionsEncountered.length > 0 ? data.reactionsEncountered.map(eq => `
        <div class="equation-box">${eq}</div>
    `).join('') : `<div class="equation-box">${data.title}</div>`}

    <ul>
        ${data.observations.map(obs => `<li>${obs}</li>`).join('')}
    </ul>

    <h2>4. ${isVi ? 'Dữ Liệu Nhiệt Động & Thông Số Vật Lý' : 'Thermodynamic & Telemetry Data'}</h2>
    <table>
        <tr>
            <td><strong>${isVi ? 'Nhiệt độ cực đại (T_max):' : 'Max Temperature Spike:'}</strong></td>
            <td>${data.temperatureRange.max}°C</td>
        </tr>
        <tr>
            <td><strong>${isVi ? 'Nhiệt độ môi trường (T_env):' : 'Ambient Temperature:'}</strong></td>
            <td>${data.temperatureRange.min}°C</td>
        </tr>
        <tr>
            <td><strong>${isVi ? 'Dải pH ghi nhận:' : 'Observed pH Range:'}</strong></td>
            <td>${Math.min(...data.phValues, 7.0).toFixed(1)} - ${Math.max(...data.phValues, 7.0).toFixed(1)}</td>
        </tr>
    </table>

    <h2>5. ${isVi ? 'Kết Luận & Đánh Giá An Toàn' : 'Conclusions & Lab Safety Assessment'}</h2>
    <ul>
        ${data.conclusions.map(c => `<li>${c}</li>`).join('')}
    </ul>

    <div class="footer">
        Generated automatically by Chemic-AI Laboratory Engine // Built for Google AI Riser Vietnam 2026 // #BuildwithGoogleAI
    </div>
</body>
</html>`;
    }

    public static async openInGoogleDocs(reportHtml: string, title: string = 'Chemic-AI_Lab_Report'): Promise<{ success: boolean; message: string }> {
        try {
            // 1. Copy rich HTML and plain text to clipboard for instant pasting in Google Docs
            if (navigator.clipboard && window.ClipboardItem) {
                const blobHtml = new Blob([reportHtml], { type: 'text/html' });
                const blobText = new Blob([`CHEMIC-AI LAB REPORT: ${title}\nGenerated with Gemini 2.5 Flash & Chemic-AI Quantum Engine`], { type: 'text/plain' });
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'text/html': blobHtml,
                        'text/plain': blobText
                    })
                ]);
            }

            // 2. Open official Google Docs new document creator
            window.open('https://docs.google.com/document/create', '_blank');

            return {
                success: true,
                message: 'Đã sao chép nội dung báo cáo! Chỉ cần nhấn Ctrl+V trong trang Google Docs vừa mở.'
            };
        } catch (e) {
            console.warn('Clipboard write failed, opening Docs directly:', e);
            window.open('https://docs.google.com/document/create', '_blank');
            return {
                success: false,
                message: 'Đang mở Google Docs. Bạn cũng có thể tải file về để tải lên Google Docs.'
            };
        }
    }

    public static downloadReport(reportHtml: string, filename: string = 'Chemic-AI_Lab_Report.html'): void {
        const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
