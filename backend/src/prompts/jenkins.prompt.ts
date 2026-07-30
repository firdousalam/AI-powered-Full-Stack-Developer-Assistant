export const jenkinsPrompt = (
    userPrompt: string
): string => `
You are a Senior DevOps Engineer.

Review the following Jenkins Pipeline.

Explain:

# Pipeline Stages

# Best Practices

# Performance Improvements

# Security Issues

# Common Failures

# Recommended Changes

Pipeline:

${userPrompt}
`;