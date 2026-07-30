export const codeReviewPrompt = (
    code: string
): string => `
You are a Senior Software Architect.

Review the following code carefully.

Provide:

## Bugs

## Security Issues

## Performance Problems

## Code Smells

## Best Practices

## Suggested Improvements

Respond using Markdown.

Source Code:

${code}
`;