import React from 'react';
import { Layout } from '../components';
import { gql, useQuery } from "@apollo/client";

import TrackCard from '../containers/track-card'

// TRACKS query to retrieve ALL tracks
const TRACKS = gql`
query GetTracks {
  tracksForHome {
    id
    title
    author {
      id
      name
      photo
    }
    thumbnail
    length
    modulesCount
  }
}
`

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  // make a TRACKS query, return loading, error, data
  const { loading, error, data } = useQuery(TRACKS);

  // display a message while data is loading
  if (loading) return 'Loading...';
  // return an error message if there is an error
  if (error) return `ERROR ${error.message}`;

  // display data
  return (
    // map data from TRACKS query to track card containers
    <Layout grid>
      {data.tracksForHome?.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </Layout>
  );
};

export default Tracks;
