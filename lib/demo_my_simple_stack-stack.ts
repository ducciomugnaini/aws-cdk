import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'

import { Construct } from 'constructs';
import * as path from "path";

export class DemoMySimpleStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const simpleTable = new dynamodb.Table(this, 'SimpleTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
    });

    const simpleLambda = new lambda.Function(this, 'simpleLambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),      
      handler: 'simpleRest.handler'      
    });
    
    simpleTable.grantReadWriteData(simpleLambda);
    
  }
}
