import json
import os
import boto3

dynamodb_client = boto3.client("dynamodb")


def lambda_handler(event, context):

    if "queryStringParameters" in event and "save_me" in event["queryStringParameters"]:
        save_data(event["queryStringParameters"]["save_me"])

    return {
        "statusCode": 200,
        "body": json.dumps({
            "saved_vales": get_items(),
        }),
    }


def get_items():
    return dynamodb_client.scan(
        TableName=os.environ["TABLE_NAME"]
    )["Items"]


def save_data(data):
    dynamodb_client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            'value': {
                'S': data
            }
        }
    )
