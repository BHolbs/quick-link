import json
import botocore
import boto3
import uuid
resource = boto3.resource('dynamodb')
table = resource.Table('linkShortenerTable')

def lambda_handler(event, context):
    id=uuid.uuid4().hex
    id=id[0:len(id)//2]
    try:
        response = table.put_item(
            Item={
                'ID': id,
                'Link': event['Link']
            },
            ConditionExpression='attribute_not_exists(ID)'
            )
    except botocore.exceptions.ClientError as e:
        # for now, just throw our hands up and give up if we get an ID collision
        return{
            'statusCode': 500,
            'body': 'Something went wrong under the hood. Please try again.'
        }
    return {
        'statusCode': 200,
        'body': id
    }
