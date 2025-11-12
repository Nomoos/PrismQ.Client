# PrismQ Postman Collections

This directory contains Postman collections for testing and interacting with PrismQ APIs.

## Available Collections

### 1. TaskManager API Collection
**File**: `TaskManager_API.postman_collection.json`

Complete Postman collection for the TaskManager API endpoints.

**Production URL**: https://api.prismq.nomoos.cz/public/api  
**Documentation**: https://api.prismq.nomoos.cz/public/swagger-ui/

#### Features
- Task type registration with JSON schema validation
- Task creation, claiming, and completion workflow
- Worker coordination with timeout handling
- Health check and system status
- Database-driven API endpoints

#### Endpoints Included
- **Health** - System health check
- **Task Types** - Register and manage task types
  - Register/update task type
  - List all task types
  - Get task type details
  - Delete task type
- **Tasks** - Task management and worker coordination
  - Create tasks
  - Claim tasks (worker)
  - Complete tasks (worker)
  - List tasks
  - Get task details

#### Authentication
Most endpoints require an API key passed in the `X-API-Key` header. Configure the `apiKey` variable in Postman after importing the collection.

#### Usage
1. Import `TaskManager_API.postman_collection.json` into Postman
2. Set the `apiKey` variable in the collection variables
3. The `baseUrl` is pre-configured to point to production: `https://api.prismq.nomoos.cz/public/api`
4. Start making requests!

#### Local Development
To use this collection with a local development server:
1. In Postman, open the collection variables
2. Change `baseUrl` from `https://api.prismq.nomoos.cz/public/api` to `http://localhost:8000/api`
3. Start your local PHP server (see Backend/TaskManager/README.md)

---

### 2. PrismQ Web Client API Collection
**File**: `PrismQ_Web_Client.postman_collection.json`

Complete Postman collection for the PrismQ Web Client Backend API.

**Features**
- Module discovery and management
- Configuration persistence
- Module execution and monitoring
- Real-time log streaming
- System statistics

#### Endpoints Included
- **Health & System** - Health checks and system statistics
- **Modules** - Module discovery, configuration management
- **Runs** - Module execution management
- **Logs** - Log retrieval and streaming (SSE)

#### Usage
1. Import `PrismQ_Web_Client.postman_collection.json` into Postman
2. The `base_url` variable defaults to `http://localhost:8000`
3. Update the base URL if connecting to a different server
4. Start making requests!

---

## Getting Started with Postman

### Installing Postman
Download Postman from: https://www.postman.com/downloads/

### Importing Collections
1. Open Postman
2. Click **Import** button (top left)
3. Drag and drop the JSON file or click **Choose Files**
4. Select the collection file
5. Click **Import**

### Setting Variables
After importing:
1. Click on the collection name
2. Go to the **Variables** tab
3. Set the required values (like `apiKey`)
4. Click **Save**

### Making Requests
1. Expand the collection in the sidebar
2. Select an endpoint
3. Click **Send** to make the request
4. View the response in the bottom panel

---

## Related Documentation

- [TaskManager Backend Documentation](../../Backend/TaskManager/README.md)
- [TaskManager API Reference](../../Backend/TaskManager/_meta/docs/api/API_REFERENCE.md)
- [OpenAPI Specification](../../Backend/TaskManager/src/public/openapi.json)
- [Worker Examples](./workers/README.md)

## Generating Collections from OpenAPI

The TaskManager API collection was generated from the OpenAPI specification using:

```bash
npm install -g openapi-to-postmanv2
openapi2postmanv2 -s Backend/TaskManager/src/public/openapi.json -o TaskManager_API.postman_collection.json -p
```

To regenerate or update the collection after API changes, run the above command and update the `baseUrl` and `apiKey` variables as needed.
