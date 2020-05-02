npm run build
cd dist
git init
git add -A
git commit -m 'deploy page v2'
git push -f https://github.com/mitsuoysharag/admision-virtual.git  master:gh-pages