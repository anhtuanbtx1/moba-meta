import re

with open("src/pages/Factions.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add useNavigate import if not exists
if "useNavigate" not in content:
    content = content.replace('import { useState, useRef, useEffect } from "react";', 'import { useState, useRef, useEffect } from "react";\nimport { useNavigate } from "react-router-dom";')

# Inside Factions component, add const navigate = useNavigate();
if "const navigate = useNavigate();" not in content:
    content = content.replace(
        'export default function Factions() {',
        'export default function Factions() {\n  const navigate = useNavigate();'
    )

# Fix onClick to navigate
content = content.replace(
    'onClick={() => setSelectedHero(hero.id)}',
    'onClick={() => { setSelectedHero(hero.id); setIsModalOpen(false); navigate("/heroes/" + hero.id); }}'
)

with open("src/pages/Factions.tsx", "w", encoding="utf-8") as f:
    f.write(content)
