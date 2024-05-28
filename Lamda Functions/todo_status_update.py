import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TodoList')

def lambda_handler(event, context):
    try:
        # Extract the task ID from the request body
        task_id = event['taskId']
        
        # Get the task from DynamoDB
        response = table.get_item(Key={'id': task_id})
        
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT'
                },
                'body': json.dumps({'error': 'Task not found'})
            }
        
        task = response['Item']
        
        # Toggle the completion status
        updated_completed = not task['completed']
        
        # Update the task in DynamoDB
        response = table.update_item(
            Key={'id': task_id},
            UpdateExpression='SET completed = :val',
            ExpressionAttributeValues={':val': updated_completed},
            ReturnValues='ALL_NEW'
        )
        
        updated_task = response['Attributes']
        
        # Return the updated task
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(updated_task)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'error': str(e)})
        }
