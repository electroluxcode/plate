# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-19

### Added

- Initial release of @platejs/ot
- BaseOTPlugin for Operational Transform support
- ShareDB client integration
- Operation queue with batching and debouncing
- React plugin wrapper (OTPlugin)
- TypeScript support with complete type definitions
- Utility functions for operation transforms and validation
- Demo server and client application
- Comprehensive documentation and README

### Features

- ✅ Real-time collaborative editing with ShareDB
- ✅ Automatic operation batching and debouncing
- ✅ WebSocket connection management
- ✅ Error handling and validation
- ✅ TypeScript support
- ✅ Plate plugin architecture compliance
- ✅ Demo server with comprehensive logging
- ✅ Production-ready code structure

### Technical Details

- Follows Plate's plugin architecture patterns
- Compatible with Plate v49+
- Uses ShareDB for Operational Transform backend
- Supports json0 OT type (most compatible)
- WebSocket transport with reconnection support
- Debounced operation submission for performance
- Comprehensive error handling and logging 