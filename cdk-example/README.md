# Example CDK project

This example contains a simple Lambda function that will read and write to a
DynamoDB table not included in this CDK project. 

The project requires two parameters when deployed:

databaseName: the name of the table
databaseArn: the arn of the table


# CDK Tips

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
