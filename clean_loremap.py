import re
with open('D:/Code-FE/hok-moba-fe/src/pages/LoreMap.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# First we restore the `}` if it was messed up. Oh wait, my python script above truncated the base64 string and overwrote it!
