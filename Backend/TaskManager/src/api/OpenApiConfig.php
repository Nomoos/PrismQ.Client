<?php
/**
 * OpenAPI Base Configuration
 * 
 * This file contains the base OpenAPI specification attributes.
 * All endpoint-specific attributes are in their respective handler files.
 * 
 * Current version: OpenAPI 3.1.1 (fully supported by swagger-php 5.7.0)
 * 
 * TODO: Migrate to OpenAPI 3.2.0 when swagger-php adds support
 *       - OpenAPI 3.2.0 was released in September 2025
 *       - swagger-php 5.7.0 currently supports up to 3.1.1
 *       - Monitor: https://github.com/zircote/swagger-php for 3.2.0 support
 *       - Expected timeline: Q1-Q2 2026
 */

use OpenApi\Attributes as OA;

#[OA\OpenApi(
    openapi: "3.1.1"
)]
#[OA\Info(
    version: "1.0.0",
    title: "TaskManager API",
    description: "Lightweight PHP Task Queue with Data-Driven API for shared hosting environments. Provides REST API for managing task types and tasks with JSON schema validation, deduplication, and worker coordination.",
    contact: new OA\Contact(name: "PrismQ", url: "https://github.com/Nomoos/PrismQ.Client")
)]
#[OA\Server(
    url: "/api",
    description: "TaskManager API Server"
)]
#[OA\SecurityScheme(
    securityScheme: "apiKey",
    type: "apiKey",
    name: "X-API-Key",
    in: "header",
    description: "API key authentication. Include your API key in the X-API-Key header."
)]
#[OA\Tag(
    name: "Health",
    description: "Health check and system status"
)]
#[OA\Tag(
    name: "Task Types",
    description: "Task type registration and management"
)]
#[OA\Tag(
    name: "Tasks",
    description: "Task creation, claiming, and completion"
)]
class OpenApiConfig
{
    // This class only exists to hold OpenAPI base configuration
}
