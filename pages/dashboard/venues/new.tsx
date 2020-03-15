import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { locationActions, venueActions } from 'client/store/actions';
import { AppStoreState } from 'client/store/reducers';
import VenueForm from 'client/components/VenueForm';
import sanitizeFormData from 'client/helpers/sanitizeFormData';
import useThunkDispatch from 'client/hooks/useThunkDispatch';

const useStyles = makeStyles(() => ({
  responseDiv: {
    margin: '15px 0',
  },
}));

const NewVenue: React.FC = () => {
  const router = useRouter();
  const styles = useStyles();

  const { error, state, locations, locationsLoading } = useSelector(
    (state: AppStoreState) => ({
      error: state.venues.create.error,
      state: state.venues.create.state,
      locations: state.locations.locations,
      locationsLoading: state.locations.loading,
    }),
  );

  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(locationActions.fetchLocations());
  }, []);

  const onSubmit = async data => {
    const success = await dispatch(venueActions.create(sanitizeFormData(data)));
    if (success) {
      router.replace('/dashboard/venues');
    }
  };

  return (
    <>
      <Link href="/dashboard/venues">
        <a>Venues</a>
      </Link>
      {error && <div className={styles.responseDiv}>{error}</div>}
      <VenueForm
        loading={state === 'loading'}
        locations={locations}
        locationsLoading={locationsLoading}
        onSubmit={onSubmit}
        submitText={'Add venue'}
      />
    </>
  );
};

export default NewVenue;
