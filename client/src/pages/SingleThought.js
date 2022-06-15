import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_THOUGHT } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import ReactionList from '../components/ReactionList/index';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';


const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  const loggedIn = Auth.loggedIn();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText} </p>
        </div>
      </div>
      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {Auth.loggedIn && <ReactionForm thoughtId={thought._id}></ReactionForm>}
    </div>
  );
};

export default SingleThought;
