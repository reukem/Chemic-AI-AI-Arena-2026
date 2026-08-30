# -*- coding: utf-8 -*-
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

grade = int(sys.argv[1]) if len(sys.argv) > 1 else 8
with open("untranslated_audit.json", "r", encoding="utf-8") as f:
    items = json.load(f)

g_items = [x for x in items if x["grade"] == grade]
print(f"=== GRADE {grade}: {len(g_items)} items ===")
for it in g_items:
    print(f"L{it['lesson']} ({it['type']}):")
    print(f"  VN:  {it['VN']}")
    print(f"  CUR: {it['EN']}")
