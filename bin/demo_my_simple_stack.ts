#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DemoMySimpleStackStack } from '../lib/demo_my_simple_stack-stack';

const app = new cdk.App();
new DemoMySimpleStackStack(app, 'DemoMySimpleStackStack');
