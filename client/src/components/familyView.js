import React from 'react';

const FamilyView = props => (
    <div>
        <h5>{props.familyname}</h5>
        {props.members.map(member => (
            <div key={member._id}>
                <p>{member.name}     Doodle Bucks:     {member.doddlebugBucks}</p>
            </div>
        )
        )}
    </div>
);

export default FamilyView;