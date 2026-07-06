import re

with open("src/pages/Factions.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make search bar sticky
content = content.replace(
    '<div className="px-4 py-3 bg-[#0A0A0F] z-10 border-b border-[#1A1A24]">',
    '<div className="px-4 py-3 bg-[#0A0A0F] z-10 border-b border-[#1A1A24] sticky top-0">'
)

# Update the left sidebar fraction width and adjust scrolling
content = content.replace(
    '<div className="w-[35%] flex flex-col bg-[#0A0A0F] border-r border-[#1A1A24]">',
    '<div className="w-[35%] flex flex-col bg-[#0A0A0F] border-r border-[#1A1A24] h-full">'
)

with open("src/pages/Factions.tsx", "w", encoding="utf-8") as f:
    f.write(content)
