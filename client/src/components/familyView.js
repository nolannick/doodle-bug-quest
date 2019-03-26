import React from 'react';

const FamilyView = props => (
    <div>
        
        {props.members.map(member => (
            <div key={member._id}>
                <p><a href='#'>{member.name}{' '}</a>Doodle Bucks:   {member.doddlebugBucks}</p>
            </div>
        )
        )}
    </div>
);

export default FamilyView;