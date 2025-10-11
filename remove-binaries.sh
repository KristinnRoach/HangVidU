#!/bin/bash
# Remove dist binaries from Git and prepare for GitHub Releases

echo "Removing dist/ binaries from Git tracking..."
git rm -r --cached dist/

echo "Committing changes..."
git add .gitignore
git commit -m "Remove binaries from Git, use GitHub Releases instead"

echo ""
echo "✅ Done! Binaries removed from Git."
echo ""
echo "Next steps:"
echo "1. Rebuild binaries: npm run build"
echo "2. Create GitHub release:"
echo "   git tag v1.0.0"
echo "   git push origin main --tags"
echo "3. Go to GitHub → Releases → Create new release"
echo "4. Upload binaries from dist/ folder"
