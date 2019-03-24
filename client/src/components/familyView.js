import React from 'react';
import {Button} from 'reactstrap';

const FamilyView = props => (
    <div>
        {props.isAuthenticated ? (
            <h5>{props.familyname}</h5>
        ) : (
            <h6>Login to add family members</h6>
        )}
        {props.members.map(member => (
            <div key={member._id}>
                <p><Button color='link' size='lg'>{member.name}</Button>
                      Doodle Bucks:   {member.doddlebugBucks}</p>
            </div>
        )
        )}
    </div>
);

export default FamilyView;