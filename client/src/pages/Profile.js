import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import FriendList from '../components/FriendList';
import { QueryManager } from '@apollo/client/core/QueryManager';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // navigate to peronal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile"></Navigate>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!user?.username){
    return(
      <h4>
        You need to be logged in to see this page. Use the navigatin links above to signup or login
      </h4>
    )
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          ></ThoughtList>
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          ></FriendList>
        </div>
      </div>
    </div>
  );
};

export default Profile;
