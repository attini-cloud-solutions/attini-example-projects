import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkApp from '../lib/attini-cdk-demo-stack';

test('Function Created', () => {
  const app = new cdk.App();
    // WHEN
  const stack = new CdkApp.AttiniCdkDemoStack(app, 'MyTestStack');
    // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime:  'nodejs18.x'
  });
});
