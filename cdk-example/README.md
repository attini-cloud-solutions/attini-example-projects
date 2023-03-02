# Example CDK project

This is an example meant to demonstrate how deploy use the CDK and Attini together. The
example contains e deployment plan written with the CDK and it contains three steps:

1. Deploy a CloudFormation template using the AttiniCfn step. The template contains a DynamoDB table.
2. Deploy a CDK app with the AttiniCdk step. The CDK app contains a Lambda function that will read and write to the
   DynamoDB table from step 1.
3. Invoke the Lambda function from step 2 using the AttiniLambdaInvoke step.

Deploy the distribution using the Attini CLI:

```bash
attini deploy run .
```

The example is further explained in [this guide](https://attini.io/guides/cdk/)

# CDK Tips

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
