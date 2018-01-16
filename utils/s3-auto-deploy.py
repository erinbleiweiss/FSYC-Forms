import boto3
import urllib.parse

print('Loading function')


aws_lambda = boto3.client('lambda')
bucketName = "fsyc-forms-lambda-code"

def lambda_handler(event, context):
    key = urllib.parse.unquote(event['Records'][0]['s3']['object']['key'])
    bucket = event['Records'][0]['s3']['bucket']['name']

    if bucket == bucketName:
        function_name = key.replace(".zip", "")
        try:
            aws_lambda.update_function_code(
                    FunctionName=function_name,
                    S3Key=key,
                    S3Bucket=bucket,
                    Publish=True
            )

            print(">> Successfully deployed to lambda function: {0}".format(function_name))
        except Exception as e:
            print(">> Failed to deploy to lambda function: {0}".format(function_name))
            print(e)
    else:
        print("Skipping zip {0} in bucket {1}".format(key, bucket))
