# aws-lambda-cloudwatch-trigger 
Trigger AWS Lambda Function based on patterns matched in CloudWatch Logs

# Prerequisites
* [AWS CLI](https://aws.amazon.com/cli/)
* [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

# Setup
```
git clone https://github.com/sarthakj178/aws-lambda-cloudwatch-trigger.git aws-lambda-cloudwatch-trigger
cd aws-lambda-cloudwatch-trigger
npm install
```

# Deploy
```
sam package --template-file template.yaml  --s3-bucket <YOUR_S3_BUCKET_NAME> --output-template-file packaged.yaml
sam deploy --template-file ./packaged.yaml --stack-name <SOME_UNIQUE_CLOUDWATCH_STACK_NAME> --capabilities CAPABILITY_IAM
```

# Test

Post an INFO message. The destination lambda function WILL NOT BE triggered for the following -
```
sam local invoke CloudWatchLogWriterFunction  --event test-data/sample_info_message.json
```
Post an ERROR message. The destination lambda function WILL BE triggered for the following -
```
sam local invoke CloudWatchLogWriterFunction  --event test-data/sample_error_message.json  
```

