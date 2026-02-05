import subprocess
from collections import defaultdict
from datetime import datetime

today = datetime.now().strftime("%Y-%m-%d")
START_TIME = f"{today} 00:00"
END_TIME   = f"{today} 23:59"

cmd = [
    "git", "log",
    "--since", START_TIME,
    "--until", END_TIME,
    "--numstat",
    "--pretty=format:"
]

result = subprocess.run(cmd, capture_output=True, text=True)

language_lines = defaultdict(int)

for line in result.stdout.split("\n"):
    parts = line.split("\t")
    if len(parts) == 3:
        added, removed, filename = parts
        if added.isdigit():
            ext = filename.split(".")[-1]
            language_lines[ext] += int(added)

print("\n📊 Code Report")
print(f"From {START_TIME} → {END_TIME}\n")

for lang, lines in language_lines.items():
    print(f"{lang.upper():6} : {lines} lines")
