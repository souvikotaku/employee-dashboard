import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://employee-backend-0ifd.onrender.com/graphql',
});

// Middleware to add the token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || '';
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Combine the links
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// Function to set the token after login
export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
  // No need to set headers directly; authLink will handle it on the next request
};

// Example query and mutation functions remain the same
export const fetchEmployees = async (
  page = 1,
  limit = 10,
  filter = '',
  sortBy = '',
  sortOrder = 'asc'
) => {
  const response = await client.query({
    query: gql`
      query Employees(
        $page: Int
        $limit: Int
        $filter: String
        $sortBy: String
        $sortOrder: String
      ) {
        employees(
          page: $page
          limit: $limit
          filter: $filter
          sortBy: $sortBy
          sortOrder: $sortOrder
        ) {
          id
          name {
            first
            last
          }
          age
          class
          subjects
          attendance
          email
          phone
          role
        }
      }
    `,
    variables: { page, limit, filter, sortBy, sortOrder },
  });
  return response.data.employees;
};

export const fetchEmployee = async (id) => {
  const response = await client.query({
    query: gql`
      query Employee($id: ID!) {
        employee(id: $id) {
          id
          name {
            first
            last
          }
          age
          class
          subjects
          attendance
          email
          phone
          role
        }
      }
    `,
    variables: { id },
  });
  return response.data.employee;
};

export const addEmployee = async (input) => {
  const response = await client.mutate({
    mutation: gql`
      mutation AddEmployee($input: EmployeeInput!) {
        addEmployee(input: $input) {
          id
          name {
            first
            last
          }
          age
          class
          subjects
          attendance
          email
          phone
          role
        }
      }
    `,
    variables: { input },
  });
  return response.data.addEmployee;
};

export const updateEmployee = async (id, input) => {
  const response = await client.mutate({
    mutation: gql`
      mutation UpdateEmployee($id: ID!, $input: EmployeeInput!) {
        updateEmployee(id: $id, input: $input) {
          id
          name {
            first
            last
          }
          age
          class
          subjects
          attendance
          email
          phone
          role
        }
      }
    `,
    variables: { id, input },
  });
  return response.data.updateEmployee;
};

export const deleteEmployee = async (id) => {
  const response = await client.mutate({
    mutation: gql`
      mutation DeleteEmployee($id: ID!) {
        deleteEmployee(id: $id)
      }
    `,
    variables: { id },
  });
  return response.data.deleteEmployee;
};

export const login = async (email, password) => {
  const response = await client.mutate({
    mutation: gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `,
    variables: { email, password },
  });
  const token = response.data.login;
  setAuthToken(token); // Store the token
  return token;
};
