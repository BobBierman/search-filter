aws s3 rm s3://searchenginefilter.com --recursive
aws s3 cp dist s3://searchenginefilter.com --recursive

# aws s3 rm s3://searchenginefilter.com --recursive --exclude="*" --include="css/*.*"
