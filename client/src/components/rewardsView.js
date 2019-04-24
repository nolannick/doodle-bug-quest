import React from 'react';
// import { Link } from "react-router-dom";
// import { Route } from "react-router-dom";
import RewardClaimPage from './rewardsClaimPage';

const QuestView = props => (
    <div className="container rowView">
        {props.rewards ? (
            <div>
                {props.rewards.map(reward => (
                    <div key={reward._id}>
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