#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AttiniCdk, AttiniCfn, AttiniDeploymentPlanStack, AttiniLambdaInvoke, DeploymentPlan } from '@attini/cdk';
import { Construct } from 'constructs';
import { AttiniCdkDemoStack } from '../lib/attini-cdk-demo-stack';
import { stackId } from '../bin/attini-cdk-demo';

export class DeploymentPlanStack extends AttiniDeploymentPlanStack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const deployDatabaseStep = new AttiniCfn(this, 'DeployDatabase', {
      stackName: "demo-database",
      template: "/database.yaml"
    });

    const deployCdkStep = new AttiniCdk(this, 'DeployCdkApp', {
      path: './',
      buildCommands: 'npm install',
      stackConfiguration: [
        {
          parameters: {
            [AttiniCdkDemoStack.databaseArn]: deployDatabaseStep.getOutput('DatabaseArn')
          }
        }
      ]
    });

    const invokeLambdaStep = new AttiniLambdaInvoke(this, 'InvokeLambda', {
      functionName: deployCdkStep.getOutput(stackId, AttiniCdkDemoStack.functionNameOutputId)
    });

    new DeploymentPlan(this, 'DeploymentPlan', {
      definition: deployDatabaseStep.next(deployCdkStep).next(invokeLambdaStep)
    })
  }
}

const app = new cdk.App();
new DeploymentPlanStack(app, 'DeploymentPlanStack', {});
