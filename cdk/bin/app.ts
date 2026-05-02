#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { WebAppStack } from "../lib/web-app-stack";

const app = new cdk.App();

new WebAppStack(app, "MyStoreWebAppStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? "eu-central-1",
  },
});
