import re

with open("src/pages/LoreMap.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make the layout fully sticky and fixed so scrolling only happens inside components, not the whole page on mobile
content = content.replace(
    'return <Factions />;',
    'return <div className="h-[100dvh] overflow-hidden"><Factions /></div>;'
)

with open("src/pages/LoreMap.tsx", "w", encoding="utf-8") as f:
    f.write(content)
