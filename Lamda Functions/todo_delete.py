import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TodoList')

def lambda_handler(event, context):
    try:
        # Extract the task id from the request body
        task_id = event['taskId']
        
        # Delete the task from the DynamoDB table
        table.delete_item(
            Key={
                'id': task_id
            }
        )
        
        # Return a success response with CORS headers
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            'body': json.dumps({'message': 'Todo item deleted successfully!'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'DELETE,OPTIONS'
            },
            'body': json.dumps({'error': str(e)})
        }
