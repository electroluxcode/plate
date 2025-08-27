# @platejs/ot

[![npm](https://img.shields.io/npm/v/@platejs/ot.svg)](https://www.npmjs.com/package/@platejs/ot)

> Operational Transform plugin for Plate - Real-time collaboration using ShareDB

## Installation

```bash
npm install @platejs/ot
```

## Quick Start

```tsx
import React from 'react';
import { createPlateEditor } from '@platejs/core/react';
import { OTPlugin } from '@platejs/ot/react';

// Configure your editor with OT support
const editor = createPlateEditor({
  plugins: [
    // ... other plugins
    OTPlugin.configure({
      options: {
        debug: true, // Enable debug logging
        queueOptions: {
          debounceMs: 100, // Debounce operations
          maxBatchSize: 50, // Maximum operations per batch
        },
      },
    }),
  ],
});

function CollaborativeEditor() {
  // Your editor implementation
  return <PlateEditor editor={editor} />;
}
```

## Setup ShareDB Server

First, create a ShareDB server:

```bash
npm install sharedb ws websocket-json-stream
```

Create `server.js`:

```javascript
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('websocket-json-stream');

const shareDb = new ShareDB();
const connection = shareDb.connect();

// Create initial document
const doc = connection.get('documents', 'slate-demo');
doc.fetch((err) => {
  if (err) throw err;
  if (doc.type === null) {
    doc.create({
      children: [
        {
          type: 'paragraph',
          children: [{ text: 'Welcome to collaborative editing!' }]
        }
      ]
    }, 'ot-slate', (err) => {
      if (err) throw err;
      console.log('Document created successfully');
    });
  }
});

const server = new WebSocket.Server({ port: 8110 });
server.on('connection', (ws) => {
  const stream = new WebSocketJSONStream(ws);
  shareDb.listen(stream);
});

console.log('ShareDB server running on port 8110');
```

Run the server:

```bash
node server.js
```

## Connect to ShareDB

```tsx
import { createShareDBClient } from '@platejs/ot';
import ReconnectingWebSocket from 'reconnecting-websocket';

// Create ShareDB client
const socket = new ReconnectingWebSocket('ws://localhost:8110');
const connection = new ShareDB.Connection(socket);
const doc = connection.get('documents', 'slate-demo');

// Subscribe to the document
doc.subscribe((error) => {
  if (error) {
    console.error('ShareDB subscription error:', error);
    return;
  }

  // Connect the OT plugin to the document
  editor.api.ot.connect(doc);
  
  // Set initial editor value from ShareDB
  if (doc.data?.children) {
    editor.children = doc.data.children;
  }
});
```

## API

### OTPlugin.configure(options)

Configure the OT plugin with the following options:

- `debug: boolean` - Enable debug logging (default: `false`)
- `queueOptions.debounceMs: number` - Debounce delay in milliseconds (default: `100`)
- `queueOptions.maxBatchSize: number` - Maximum operations per batch (default: `50`)

### Editor API

When the OT plugin is active, your editor gains the following methods:

- `editor.api.ot.connect(doc)` - Connect to a ShareDB document
- `editor.api.ot.disconnect()` - Disconnect from ShareDB
- `editor.api.ot.submitOperations(operations)` - Manually submit operations
- `editor.api.ot.getConnectionStatus()` - Check connection status
- `editor.api.ot.getDocument()` - Get the current ShareDB document

## Features

- ✅ Real-time collaborative editing
- ✅ Operational Transform with ShareDB
- ✅ Automatic operation batching and debouncing
- ✅ Connection management and error handling
- ✅ TypeScript support
- ✅ Works with all Plate plugins

## Demo

Check out the demo in the `demo/` directory for a complete working example.

## License

MIT 