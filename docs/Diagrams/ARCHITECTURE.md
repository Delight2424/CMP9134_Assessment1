Task 1: Mapping the Architectural Pattern
**Technology Stack**

The system uses the following technologies:

Backend: Node.js
Frontend: React with Vite
Database: MongoDB
API Communication: REST API
These technologies follow the Model-View-Controller (MVC) architectural pattern, which separates the application into three main components: the View, Controller, and Model. 
This pattern improves maintainability, scalability, and separation of concerns.

In this system, the View layer is responsible for rendering the user interface and handling user interaction through React components. The Controller layer, implemented in Node.js, processes HTTP requests, applies application logic, and communicates with the database. The Model layer represents the application data and business logic stored and managed in MongoDB. This structure allows each component to evolve independently while maintaining a clean system architecture.

**MVC Component Mapping**
MVC Component	Implementation	Responsibility
View        |	React + Vite  |	Handles UI rendering and user interaction
Controller  |	Node.js	      | Processes HTTP requests and system logic
Model	      | MongoDB	      | Stores data and handles database operations

### Architecture Diagram
```mermaid
graph TD
    A[React UI - View] --> B[Node.js Controller]
    B --> C[Model Layer]
    C --> D[(MongoDB Database)]
    B --> A
