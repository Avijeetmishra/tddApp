# deploy.sh
#!/bin/bash
// Build Vue website
npm run build
// Copy Files to S3
aws --region us-west-2 --profile testUser s3 sync ./www/dist s3://testbucketeclipse --delete