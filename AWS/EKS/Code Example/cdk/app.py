#!/usr/bin/env python3
import aws_cdk as cdk
from eks_compliant_stack import EksCompliantStack

app = cdk.App()

EksCompliantStack(
    app,
    "EksCompliantStack",
    description="EKS cluster with all security controls implemented",
)

app.synth()
