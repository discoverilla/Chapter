import { gql } from '@apollo/client';

export const MINIMAL_DATA_EVENTS_QUERY = gql`
  query minEvents {
    events {
      id
      name
      description
      start_at
      invite_only
      canceled
      image_url
      tags {
        tag {
          id
          name
        }
      }
      chapter {
        id
        name
        category
      }
    }
  }
`;
