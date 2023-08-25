import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import { useParams } from "react-router-dom";

// import track detail component
import TrackDetail from "../components/track-detail"

// Query to get single track
const GET_TRACK = gql`
query getTrack($trackId: ID!) {
  track(id: $trackId) {
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
    numberOfViews
    modules {
      id
      title
      length
    }
    description
  }
}
`

const Track = () => {
    // trackId will arrive as parameter from route or browser URL
    const { trackId = "" } = useParams();
    // pass the GET_TRACK query to use query with trackId as a variables option
    const { loading, error, data } = useQuery(GET_TRACK, { variables: { trackId }, })
    return (
        <Layout>
            <QueryResult error={error} loading={loading} data={data}>
                <TrackDetail track={data?.track} />
            </QueryResult>

        </Layout>
    )
}

export default Track;