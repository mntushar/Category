# Category Service API

A scalable and modular Category Management API built with **Node.js**, **TypeScript**, **GraphQL**, **MongoDB**, and **Redis** following a clean architecture pattern. It supports unlimited levels of nested child categories.

</br>
</br>

# Features

- GraphQL API with Apollo Server
- Category CRUD operations
- Nested category support using `parentId`
- Search categories by name
- Redis cache integration
- MongoDB database integration with Mongoose
- Clean Architecture structure
- TypeScript support
- Environment configuration using dotenv
- Health check endpoint

</br>
</br>

# Tech Stack

| Technology        | Purpose             |
| ----------------- | ------------------- |
| Node.js 24        | Runtime Environment |
| TypeScript        | Type Safety         |
| Express.js        | Web Framework       |
| Apollo Server     | GraphQL Server      |
| GraphQL           | API Query Language  |
| MongoDB           | Database            |
| Mongoose          | ODM                 |
| Redis             | Caching             |
| Docker (Optional) | Containerization    |

</br>
</br>

# Project Structure

```bash
src/
├── application/
│   ├── dtos/
│   └── services/
│
├── domain/
│   ├── entities/
│   └── interface/
│
├── infrastructure/
│   ├── cache/
│   └── database/
│
├── presentation/
│   └── graphql/
│
├── utility/
│   ├── config/
│   └── dependencies/
│
└── server.ts
```

</br>
</br>

# Prerequisites

Make sure you have the following installed:

- Node.js v24.x
- npm
- MongoDB
- Redis

</br>
</br>

# Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd category
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/category
REDIS_URL=redis://localhost:6379
```

</br>
</br>

# Running the Project

### Development Mode

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Production Mode

```bash
npm start
```

</br>
</br>

# API Endpoints

**GraphQL Endpoint**

```bash
http://localhost:5000/graphql
```

**Health Check**

```bash
GET /health
```

Response:

```json
{
  "status": "ok"
}
```
</br>
</br>

# GraphQL Schema

**Category Type**

```graphql
type Category {
  _id: ID!
  name: String!
  parentId: ID
  isActive: Boolean!
  createdAt: String
  updatedAt: String
}
```


### Queries

**Get Category By ID**

```{
  "query": "query GetCategory($id: ID!) { category(_id: $id) { _id name parentId isActive createdAt updatedAt } }",
  "variables": {
    "id": "6a03d2cf6ffdfe76d0dae5be"
  }
}
```

**Search Categories**

```{
  "query": "mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) { updateCategory(_id: $id, input: $input) { _id name isActive } }",
  "variables": {
    "id": "6a04069b3561acd78a923896",
    "input": {
      "name": "Electronics",
      "isActive": true
    }
  }
}
```


### Mutations

**Create Category**

```{
  "query": "mutation CreateCategory($input: CreateCategoryInput!) { createCategory(input: $input) { _id name parentId isActive createdAt updatedAt } }",
  "variables": {
    "input": {
      "name": "Electronics",
      "parentId": ""
    }
  }
}
```


**Create Sub Category**

```{
  "query": "mutation CreateCategory($input: CreateCategoryInput!) { createCategory(input: $input) { _id name parentId isActive createdAt updatedAt } }",
  "variables": {
    "input": {
      "name": "Accessories",
      "parentId": "6a0406853561acd78a923893"
    }
  }
}
```


**Update Category**

```{
  "query": "mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) { updateCategory(_id: $id, input: $input) { _id name isActive } }",
  "variables": {
    "id": "6a0406853561acd78a923893",
    "input": {
      "name": "Accessories",
      "isActive": true
    }
  }
}
```


**Deactivate Category**

```{
  "query": "mutation DeactivateCategory($id: ID!) { deactivateCategory(_id: $id) }",
  "variables": {
    "id": "6a03d2cf6ffdfe76d0dae5be"
  }
}
```


**Delete Category**

```{
  "query": "mutation DeleteCategory($id: ID!) { deleteCategory(_id: $id) }",
  "variables": {
    "id": "6a040fcce3e6708b7b751378"
  }
}
```

<br>
<br>

# Redis Cache

The application attempts to connect with Redis during startup.

If Redis is unavailable, the application continues running without caching.

```bash
Redis connected
```

or

```bash
Redis unavailable. API will continue without cache.
```

<br>
<br>

# Architecture Overview

This project follows **Clean Architecture** principles.

### Layers

**Domain Layer**

Contains business entities and interfaces.

**Application Layer**

Contains business logic and service implementations.

**Infrastructure Layer**

Handles database, cache, and external services.

**Presentation Layer**

Contains GraphQL resolvers and API definitions.

<br>
<br>

# Example Workflow

1. Create a parent category
2. Create child categories using `parentId`
3. Search categories by name
4. Retrieve category details
5. Update, delete or deactivate categories

<br>
<br>

# Future Improvements

- Authentication & Authorization
- Pagination support
- Advanced filtering
- Unit & integration testing
- Docker support
- CI/CD pipeline
- Logging & monitoring
- Rate limiting
