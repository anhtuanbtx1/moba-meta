import sys, base64
open('D:/Code-FE/hok-moba-fe/src/pages/Factions.tsx', 'ab').write(base64.b64decode(sys.argv[1].encode('ascii')))
