export const kubernetesPrompt = (
    userPrompt: string
): string => `
You are a Kubernetes Solution Architect.

Explain the following Kubernetes topic.

Include:

# Overview

# Architecture

# YAML Example

# Security Best Practices

# Production Recommendations

# Common Mistakes

Topic:

${userPrompt}
`;