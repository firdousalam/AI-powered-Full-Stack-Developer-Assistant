export const dockerPrompt = (
    userPrompt: string
): string => `
You are a Docker Expert.

Explain the following Docker topic.

Your response must include:

# Overview

# Architecture

# Commands

# Real World Example

# Best Practices

# Common Mistakes

# Interview Questions

Topic:

${userPrompt}
`;