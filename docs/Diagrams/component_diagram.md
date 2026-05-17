flowchart LR
    User[User / Operator]

    subgraph Client[Client - React + TypeScript]
        Pages[Pages<br/>SignIn, SignUp, Dashboard, Sensors, Logs, Users]
        Components[Components<br/>Navbar, Tables, Map, Buttons, LiDAR Summary]
        Hooks[Hooks<br/>useTelemetry]
        Services[Axios API Services]
        AuthStore[LocalStorage Auth Utils]
    end

    subgraph Backend[Backend - Node.js + Express]
        ExpressApp[Express App]
        AuthModule[Auth Module]
        RobotModule[Robot Module]
        UserModule[User Module]
        AuditModule[Audit Module]
        Middleware[JWT and Role Middleware]
    end

    subgraph Database[MongoDB Atlas]
        UsersDB[(Users Collection)]
        AuditDB[(Audit Logs Collection)]
    end

    subgraph Robot[Virtual Robot Simulator - Docker]
        REST[Robot REST API<br/>status, move, reset, map, sensor]
        WS[WebSocket Telemetry<br/>/ws/telemetry]
    end

    User --> Pages
    Pages --> Components
    Pages --> Services
    Pages --> Hooks
    Services --> AuthStore

    Services -->|HTTP /api requests| ExpressApp
    Hooks -->|WebSocket| WS

    ExpressApp --> AuthModule
    ExpressApp --> RobotModule
    ExpressApp --> UserModule
    ExpressApp --> AuditModule
    ExpressApp --> Middleware

    AuthModule --> UsersDB
    UserModule --> UsersDB
    AuditModule --> AuditDB

    RobotModule -->|HTTP requests| REST
    RobotModule --> AuditModule