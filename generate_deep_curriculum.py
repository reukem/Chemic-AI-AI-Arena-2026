# -*- coding: utf-8 -*-
import json

# Comprehensive In-Depth Vietnamese Chemistry Curriculum Generator
# Provides textbook-quality, multi-section explanations, detailed physical/chemical properties,
# mechanisms, formulas, and experimental phenomena.

def create_deep_lesson(grade, num, ch_num, ch_title, title, summary, sections, formulas, equations, theory_points, q, a, reagents):
    code_prefix = f"HH{grade}"
    clean_title = title.split(':', 1)[1].strip() if ':' in title else title
    return {
        "id": f"hh{grade}_b{num}",
        "code": f"{code_prefix}-B{num:02d}",
        "lessonNumber": num,
        "grade": grade,
        "chapterNumber": ch_num,
        "chapterTitle": ch_title,
        "title": {
            "VN": title,
            "EN": f"Lesson {num}: {clean_title}"
        },
        "summary": {
            "VN": summary,
            "EN": summary
        },
        "sections": [
            {
                "heading": {"VN": sec["heading"], "EN": sec["heading"]},
                "points": [{"VN": p, "EN": p} for p in sec["points"]]
            }
            for sec in sections
        ],
        "keyFormulas": formulas if isinstance(formulas, list) else [formulas],
        "equations": equations if isinstance(equations, list) else [equations],
        "theoryPoints": [{"VN": tp, "EN": tp} for tp in (theory_points if isinstance(theory_points, list) else [theory_points])],
        "sampleQuestion": {
            "question": {"VN": q, "EN": q},
            "answer": {"VN": a, "EN": a}
        },
        "suggestedReagents": reagents if isinstance(reagents, list) else [reagents]
    }

print("Loaded create_deep_lesson schema")
