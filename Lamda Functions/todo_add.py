import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('TodoList')

def lambda_handler(event, context):
    try:
        # Extract the todo item from the event body
        if 'task' not in event:
            raise ValueError("Task is missing from the request body")

        todo_item = event['task']
        
        # Create a unique ID for the item
        item_id = str(uuid.uuid4())
        
        # Prepare the item to be inserted into DynamoDB
        item = {
            'id': item_id,
            'task': todo_item,
            'completed': False
        }
        
        # Put the item into the DynamoDB table
        table.put_item(Item=item)
        
        # Return a success response
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Todo item added successfully!', 'id': item_id})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
