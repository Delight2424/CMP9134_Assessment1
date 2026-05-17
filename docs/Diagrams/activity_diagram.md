
flowchart TD
    A([Start]) --> B[User opens GCS frontend]
    B --> C{Authenticated?}

    C -- No --> D[Show Sign In / Sign Up]
    D --> E[Submit credentials]
    E --> F[Backend validates user]
    F --> G{Valid?}

    G -- No --> H[Show error message]
    H --> D

    G -- Yes --> I[Store JWT and user details]
    I --> J[Redirect to Dashboard]

    C -- Yes --> J

    J --> K[Fetch robot status]
    K --> L[Fetch map data]
    L --> M[Connect to telemetry WebSocket]
    M --> N[Display dashboard]

    N --> O{User action}

    O -- View Sensors --> P[Fetch sensor and LiDAR data]
    P --> Q[Display LiDAR summary]
    Q --> N

    O -- Move Robot --> R{User is Commander?}
    R -- No --> S[Show permission error]
    S --> N

    R -- Yes --> T[Send move command]
    T --> U[Backend forwards command to Robot API]
    U --> V[Create audit log]
    V --> W[Dashboard updates robot position]
    W --> N

    O -- Reset Robot --> X{User is Commander?}
    X -- No --> Y[Show permission error]
    Y --> N

    X -- Yes --> Z[Send reset command]
    Z --> AA[Backend forwards reset to Robot API]
    AA --> AB[Create audit log]
    AB --> AC[Refresh dashboard]
    AC --> N

    O -- View Logs --> AD[Fetch paginated audit logs]
    AD --> AE[Display logs table]
    AE --> N

    O -- Manage Users --> AF[Fetch users]
    AF --> AG[Update selected user role]
    AG --> AH[Create role update audit log]
    AH --> N

    O -- Sign Out --> AI[Clear local auth data]
    AI --> D