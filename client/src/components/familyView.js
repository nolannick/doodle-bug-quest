import React from 'react';
import { Button, Badge } from 'reactstrap';

const FamilyView = props => (
    <div>
        <h5>{props.familyname}</h5>
        {props.members.map(member => (
            <div key={member._id}>
                <p><Button color='link'>{member.name}{' '}</Button>
                Doodle Bucks:{' '}<Badge color="info" size='lg'>{member.doodlebugBucks}</Badge></p>
            </div>
        )
        )}
    </div>
);

export default FamilyView;