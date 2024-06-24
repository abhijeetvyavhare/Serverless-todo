# Serverless To-Do Application

This project is a serverless To-Do application built using AWS Lambda and Amazon API Gateway. It demonstrates the use of serverless architecture to create a scalable, cost-efficient, and easy-to-manage application.

## Features

- **Scalable**: Automatically scales with the number of requests.
- **Cost-Efficient**: Pay only for what you use.
- **Serverless**: No need to manage servers.
- **Secure**: Uses AWS IAM for secure access to services.
- **Fast**: Utilizes Amazon DynamoDB for quick data access.

  
## Architecture Overview

1. **Client**: The front-end of the application interacts with the API.
2. **API Gateway**: Routes API requests to the appropriate Lambda functions.
3. **Lambda Functions**: Execute the business logic and interact with DynamoDB.
4. **DynamoDB**: Stores and retrieves the To-Do items.
5. **S3 Bucket**: Stores static files and backups.
6. **CloudFront**: Distributes static and dynamic content globally with low latency.
7. **Route 53**: Provides DNS services.
8. **CloudWatch**: Logs API Gateway events and monitors application performance.


![Serverless_app drawio (1)](https://github.com/abhijeetvyavhare/Serverless-todo/assets/94742219/4d940783-8fe9-476c-8d57-309d8a70c3d1)

![Demo video (2)](https://github.com/abhijeetvyavhare/Serverless-todo)


## Tech Stack

- **AWS Lambda**: Executes the backend logic.
- **Amazon API Gateway**: Manages and deploys RESTful APIs.
- **Amazon DynamoDB**: Serves as the NoSQL database.
- **AWS IAM**: Manages access policies for AWS resources.
- **Amazon S3**: Stores static assets and backups.
- **Amazon CloudFront**: Distributes content with low latency and high transfer speeds.
- **Amazon Route 53**: Manages domain names and routes traffic.
- **Amazon CloudWatch**: Monitors and logs API Gateway events.


### API Endpoints

- **GET /todos**: Retrieve all to-do items.
- **POST /todos**: Create a new to-do item.
- **PUT /todos/{id}**: Update an existing status of to-do item.
- **DELETE /todos/{id}**: Delete a to-do item.


   

