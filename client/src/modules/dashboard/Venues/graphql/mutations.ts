import { gql } from '@apollo/client';

export const createVenue = gql`
  mutation createVenue($data: CreateVenueInputs!) {
    createVenue(data: $data) {
      id
      name
      street_address
      city
      postal_code
      region
      country
      latitude
      longitude
    }
  }
`;

export const updateVenue = gql`
  mutation updateVenue($id: Int!, $data: UpdateVenueInputs!) {
    updateVenue(id: $id, data: $data) {
      id
      name
      street_address
      city
      postal_code
      region
      country
      latitude
      longitude
    }
  }
`;
