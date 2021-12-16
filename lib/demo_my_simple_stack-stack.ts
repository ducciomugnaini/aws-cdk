import { Stack, StackProps } from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'

import { Construct } from 'constructs';

export class DemoMySimpleStackStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const simpleTable = new dynamodb.Table(this, 'SimpleTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }      
    });

    const simpleLambda = new lambda.Function(this, 'simpleLambda', {
      
      code: lambda.Code.fromAsset('lambda'),      
      handler: 'simpleRest.handler',

      // variabili di ambiente passate alla lambda recuperabili in process.env.
      environment: {
        DYNAMO_DB_TABLE: simpleTable.tableName
      },
      
      runtime: lambda.Runtime.NODEJS_14_X
    });
    
    simpleTable.grantReadWriteData(simpleLambda);
    
  }
}
