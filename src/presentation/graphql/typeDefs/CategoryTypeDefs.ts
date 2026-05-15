export const categoryTypeDefs = `
  type Category {
    _id: ID!
    name: String!
    parentId: ID
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  type CategorySearchResult {
    _id: ID!
    name: String!
    parentId: ID
    isActive: Boolean!
    createdAt: String
    updatedAt: String
    parents: [Category!]!
  }

  input CreateCategoryInput {
    name: String!
    parentId: ID
  }

  input UpdateCategoryInput {
    name: String
    parentId: ID
    isActive: Boolean
  }

  type Query {
    category(_id: ID!): Category
    searchCategories(name: String!): [CategorySearchResult!]!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
    updateCategory(_id: ID!, input: UpdateCategoryInput!): Category
    deactivateCategory(_id: ID!): Int!
    deleteCategory(_id: ID!): Boolean!
  }
`;
