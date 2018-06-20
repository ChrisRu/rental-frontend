import gql from 'graphql-tag';

export default {
  boats: {
    get: () => gql`
      {
        boats {
          id
          name
          type
          crew
          rented {
            date
            to
            from
            by
          }
          repairs {
            info
          }
        }
      }
    `
  },
  columns: {
    get: () => gql`
      {
        columns {
          type
          name
          extend
        }
      }
    `
  }
};
