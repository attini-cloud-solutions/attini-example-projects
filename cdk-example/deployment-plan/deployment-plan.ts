#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AttiniCdk, AttiniCfn, AttiniDeploymentPlanStack, AttiniLambdaInvoke, DeploymentPlan } from '@attini/cdk';
import { Construct } from 'constructs';
import { AttiniCdkDemoStack } from '../lib/attini-cdk-demo-stack';
import { JsonPath } from 'aws-cdk-lib/aws-stepfunctions';
import { stackId } from '../bin/attini-cdk-demo';

export class DeploymentPlanStack extends AttiniDeploymentPlanStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let deployDatabaseStep = new AttiniCfn(this, 'deploy-database', {
      stackName: "demo-database",
      template: "/database.yaml"
    });


    let deployCdkStep = new AttiniCdk(this, 'deploy-cdk-app', {
      path: '/',
      buildCommands: 'npm install',
      stackConfiguration: [
        {
          parameters: {
            [AttiniCdkDemoStack.databaseName]: JsonPath.stringAt(deployDatabaseStep.getOutputPath('TableName')),
            [AttiniCdkDemoStack.databaseArn]:  JsonPath.stringAt(deployDatabaseStep.getOutputPath('DatabaseArn'))

          }
        }
      ]
    });

    let invokeLambdaStep = new AttiniLambdaInvoke(this, 'invokeLambda', {
      functionName: JsonPath.stringAt(deployCdkStep.getOutputPath(stackId,AttiniCdkDemoStack.functionNameOutputId))
    });

    new DeploymentPlan(this, 'deploymentPlan', {
      definition: deployDatabaseStep.next(deployCdkStep).next(invokeLambdaStep)
    })
  }
}

const app = new cdk.App();
new DeploymentPlanStack(app, 'DeploymentPlanStack', {});
