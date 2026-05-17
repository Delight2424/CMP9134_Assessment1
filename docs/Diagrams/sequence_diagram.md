sequenceDiagram
    actor Commander
    participant Client as React Client
    participant Auth as Auth Utils
    participant Backend as Express Backend
    participant Middleware as JWT / Role Middleware
    participant Robot as Robot Simulator API
    participant Audit as Audit Log Service
    participant DB as MongoDB
    participant WS as WebSocket Telemetry

    Commander->>Client: Enter target X and Y
    Commander->>Client: Click Move Robot

    Client->>Auth: Read JWT token
    Auth-->>Client: Return token

    Client->>Backend: POST /api/robot/move
    Backend->>Middleware: Validate token and role

    alt User is not Commander
        Middleware-->>Backend: Reject request
        Backend-->>Client: 403 Forbidden
        Client-->>Commander: Show permission error
    else User is Commander
        Middleware-->>Backend: Allow request

        Backend->>Robot: GET /api/status
        Robot-->>Backend: Return status before move

        Backend->>Robot: POST /api/move
        Robot-->>Backend: Return move result

        Backend->>Robot: GET /api/status
        Robot-->>Backend: Return status after move

        Backend->>Audit: Create MOVE audit entry
        Audit->>DB: Save audit log
        DB-->>Audit: Log saved

        Backend-->>Client: Move success response

        Robot-->>WS: Publish telemetry update
        WS-->>Client: Updated robot status and position
        Client-->>Commander: Update dashboard and map
    end