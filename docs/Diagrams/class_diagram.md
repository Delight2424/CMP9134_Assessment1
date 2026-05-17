classDiagram
    class User {
        +String id
        +String forename
        +String email
        +String password
        +String role
        +Date createdAt
        +Date updatedAt
    }

    class AuditEntry {
        +String id
        +String user
        +String action
        +Object payload
        +Boolean success
        +String errorMessage
        +Date createdAt
    }

    class AuthController {
        +registerUser(req, res)
        +loginUser(req, res)
        +logoutUser(req, res)
    }

    class RobotController {
        +getStatus(req, res)
        +moveRobot(req, res)
        +resetRobot(req, res)
        +getMap(req, res)
        +getSensor(req, res)
    }

    class UserController {
        +getUsers(req, res)
        +updateUserRole(req, res)
    }

    class AuditController {
        +getAuditEntries(req, res)
    }

    class AuthMiddleware {
        +verifyToken(req, res, next)
        +requireCommander(req, res, next)
    }

    class RobotService {
        +getStatus()
        +moveRobot(x, y)
        +resetRobot()
        +getMap()
        +getSensor()
        -handleRobotResponse()
    }

    class AuditService {
        +createAuditEntry(data)
    }

    class ApiService {
        +signup()
        +signin()
        +signout()
        +getRobotStatus()
        +moveRobot()
        +resetRobot()
        +getRobotMap()
        +getSensors()
        +getAuditEntries()
        +getUsers()
        +updateUserRole()
    }

    class AuthUtils {
        +saveAuth()
        +getToken()
        +getUser()
        +clearAuth()
        +isAuthenticated()
    }

    class UseTelemetry {
        +connectWebSocket()
        +setTelemetry()
        +setConnected()
        +handleReconnect()
    }

    AuthController --> User
    UserController --> User
    AuditController --> AuditEntry
    RobotController --> RobotService
    RobotController --> AuditService
    AuditService --> AuditEntry
    AuthMiddleware --> User

    ApiService --> AuthUtils
    ApiService --> AuthController
    ApiService --> RobotController
    ApiService --> UserController
    ApiService --> AuditController

    UseTelemetry --> RobotService