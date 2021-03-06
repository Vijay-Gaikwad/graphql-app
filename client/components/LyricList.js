import React, { Component } from "react";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { optimistic } from "apollo-client/optimistic-data/store";

class LyricList extends Component {

    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                LikeLyric: {
                    id,
                    __typename: 'LyricLike',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyriccs() {
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i className="material-icons" onClick={(event) => this.onLike(id, likes)}>thumb_up</i>
                        {likes}
                    </div>
                </li>
            )
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyriccs()}
            </ul>
        )
    }
}

const mutation = gql`
mutation LikeLyric($id:ID){
    likeLyric(id:$id){
      id
      likes
    }
  }
  `;

export default graphql(mutation)(LyricList);