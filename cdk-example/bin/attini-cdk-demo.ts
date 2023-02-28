#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AttiniCdkDemoStack } from '../lib/attini-cdk-demo-stack';

const app = new cdk.App();

export const stackId: string = 'AttiniCdkDemoStack';

new AttiniCdkDemoStack(app, stackId);
