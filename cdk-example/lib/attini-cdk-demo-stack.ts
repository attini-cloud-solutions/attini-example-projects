import * as cdk from 'aws-cdk-lib';
import { CfnOutput, CfnParameter } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Table } from 'aws-cdk-lib/aws-dynamodb';

export class AttiniCdkDemoStack extends cdk.Stack {
  public static readonly databaseArn: string = 'DatabaseArn';
  public static readonly functionNameOutputId: string = 'FunctionName';

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const databaseArn = new CfnParameter(this, AttiniCdkDemoStack.databaseArn, {
      type: 'String'
    });

    const functionRole = new Role(this, 'FunctionRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    });

    const table = Table.fromTableArn(this, 'DynamoTable', databaseArn.valueAsString)
    table.grantReadWriteData(functionRole);

    const lambdaFunction = new Function(this, 'DemoLambda', {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset("./src"),
      handler: 'index.handler',
      environment: {DATABASE_NAME: table.tableName},
      role: functionRole
    });

    new CfnOutput(this, AttiniCdkDemoStack.functionNameOutputId, {value: lambdaFunction.functionName})
  }
}
