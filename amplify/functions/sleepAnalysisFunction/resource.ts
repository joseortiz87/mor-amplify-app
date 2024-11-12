import { defineFunction } from '@aws-amplify/backend';

export const sleepAnalysis = defineFunction({
    name: 'sleepAnalysis',
    // optionally specify a path to your handler (defaults to "./handler.ts")
    entry: './handler.ts'
});
