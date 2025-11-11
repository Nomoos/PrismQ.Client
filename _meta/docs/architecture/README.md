# Architecture Documentation

System architecture, design decisions, and technical specifications.

## 🏛️ System Architecture

### Core Architecture
- **[Architecture Overview](ARCHITECTURE.md)** - Complete system design and component overview
- **[On-Demand Architecture](ONDEMAND_ARCHITECTURE.md)** - Client architecture principles and on-demand execution model

### Integration & APIs
- **[Integration Guide](INTEGRATION_GUIDE.md)** - Integration with PrismQ modules and external systems
- **[Postman Collection](POSTMAN_COLLECTION.md)** - API testing and documentation guide

## 🎯 Design Decisions

- **[Data Directory Rationale](DATA_DIRECTORY_RATIONALE.md)** - Data storage design decisions and rationale
- **[Screenshots Guide](SCREENSHOTS_GUIDE.md)** - UI screenshot capture and documentation

## 🔗 Component Architecture

### Backend
- FastAPI REST API
- TaskManager module for task queue
- Module discovery and configuration
- On-demand execution model

### Frontend
- Vue 3 with Composition API
- TypeScript for type safety
- Feature-based organization
- Real-time status monitoring

## 🔄 Communication Flow

```
User Interface (Vue 3)
       ↓
    REST API (FastAPI)
       ↓
Module Discovery & Execution
       ↓
  PrismQ Modules
       ↓
External Workers (optional)
```

See [Architecture Overview](ARCHITECTURE.md) for detailed component diagrams.

## 📡 API Design

The system uses a RESTful API design with:
- Health check endpoints
- Module management endpoints
- Task execution endpoints
- Real-time status updates

See [Integration Guide](INTEGRATION_GUIDE.md) and [Postman Collection](POSTMAN_COLLECTION.md) for API details.

## 🎨 Frontend Architecture

Feature-based organization following SOLID principles:
- Components grouped by feature
- Service layer for API communication
- Type-safe TypeScript interfaces
- Reusable UI components

See [Single Responsibility Module Pattern](../development/SINGLE_RESPONSIBILITY_MODULE_PATTERN.md) for implementation details.

## 🔌 Integration Points

### PrismQ Modules
- File-system based discovery
- JSON configuration
- Process-based execution
- Output streaming

### External Workers
- REST API integration
- Task queue pattern
- Asynchronous processing

See [Integration Guide](INTEGRATION_GUIDE.md) for complete integration documentation.

## 📚 Related Documentation

- [Development](../development/README.md) - Code organization and patterns
- [Operations](../operations/README.md) - Deployment and operations
- [Getting Started](../getting-started/README.md) - Setup guides
