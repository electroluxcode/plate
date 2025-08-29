'use client';

import { OtPlugin } from '@platejs/ot/react';

export const OTKit = [
  OtPlugin.configure({
    options: {
      sharedb: {
        url: 'ws://localhost:8080',
        collection: 'documents',
        documentId: 'slate-demo',
        reconnection: {
          enabled: true,
          interval: 1000,
          maxRetries: 10,
        },
      },
      debug: process.env.NODE_ENV !== 'production',
    },
  }),
]; 