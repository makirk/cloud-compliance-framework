#!/usr/bin/env python3
"""
EC2 Compliant CDK Application

This CDK app deploys an EC2 instance compliant with all AWS Security Hub EC2 controls.
"""

import aws_cdk as cdk
from ec2_compliant_stack import Ec2CompliantStack

app = cdk.App()

Ec2CompliantStack(
    app,
    "Ec2CompliantStack",
    env=cdk.Environment(
        region=app.node.try_get_context("region") or "us-east-1"
    ),
    description="EC2 instance compliant with all Security Hub EC2 controls"
)

app.synth()
