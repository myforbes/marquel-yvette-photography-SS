#!/bin/bash
# Check CloudFront distribution deployment status

DISTRIBUTION_ID="E50QXXWNUFNYT"

echo "Checking CloudFront distribution status..."
echo ""

STATUS=$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query 'Distribution.Status' --output text 2>/dev/null)

if [ "$STATUS" == "Deployed" ]; then
    echo "✓ Status: DEPLOYED"
    echo ""
    echo "Your CloudFront distribution is ready!"
    echo ""
    echo "Test URLs:"
    echo "  CloudFront: https://d1pqc8zade8idc.cloudfront.net"
    echo "  Custom domain: https://www.marquelyvette.com (after DNS update)"
    echo ""
elif [ "$STATUS" == "InProgress" ]; then
    echo "⏳ Status: IN PROGRESS"
    echo ""
    echo "Your distribution is still deploying to all edge locations."
    echo "This typically takes 15-20 minutes."
    echo ""
    echo "Run this script again in a few minutes to check status."
else
    echo "❌ Could not get status. Error occurred."
fi
