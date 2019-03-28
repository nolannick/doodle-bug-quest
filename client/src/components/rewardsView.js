import React from 'react';
// import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import RewardClaimPage from './rewardsClaimPage';

const QuestView = props => (
    <div className="container">
        {props.rewards ? (
            <div>
                {props.rewards.map(reward => (
                    <div key={reward._id}>
                        {/* <Route
                            path='/reward/claim/{reward._id}'
                            render={(props) => <RewardClaimPage {...props} isAuthed={true} />}
                        />
                        <Link to={'reward/claim/{reqard._id'}>{reward.title}{' '}{reward.description}{' '}{reward.price}</Link> */}
                        <RewardClaimPage 
                            rewardKey={reward._id}
                            title={reward.title}
                            description={reward.description}
                            rewardbucks={reward.price}
                        />
                    </div>
                )
                )}
            </div>
        ) : (
                <div></div>
            )}
    </div>
);

export default QuestView;