import * as cdk from 'aws-cdk-lib';
import { CfnOutput, CfnParameter } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Effect, Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class AttiniCdkDemoStack extends cdk.Stack {
  public static readonly databaseName: string = 'databaseName';
  public static readonly databaseArn: string = 'databaseArn';
  public static readonly functionNameOutputId: string = 'functionName';

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let databaseNameParam = new CfnParameter(this, AttiniCdkDemoStack.databaseName, {
      type: 'String'
    });

    let databaseArn = new CfnParameter(this, AttiniCdkDemoStack.databaseArn, {
      type: 'String'
    });

    let policyStatement = new PolicyStatement({
      actions: ['dynamodb:PutItem', 'dynamodb:GetItem'],
      effect: Effect.ALLOW,
      resources: [databaseArn.valueAsString]
    });

    let policy = new Policy(this, 'functionPolicy', {
      statements: [policyStatement]
    });

    let lambdaFunction = new Function(this, 'demoLambda', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset("./src"),
      handler: 'index.handler',
      environment: {DATABASE_NAME: databaseNameParam.valueAsString,},
    });

    lambdaFunction.role?.attachInlinePolicy(policy)

    new CfnOutput(this, AttiniCdkDemoStack.functionNameOutputId, {value: lambdaFunction.functionName})
  }
}
