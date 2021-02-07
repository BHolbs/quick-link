import json
import boto3
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('linkShortenerTable')

def lambda_handler(event, context):
    response = table.get_item(Key=
        {
            'ID': event['ID']
        }
    )
    if 'Item' not in response.keys():
        return {
            'statusCode': 404,
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']['Link'])
        }
