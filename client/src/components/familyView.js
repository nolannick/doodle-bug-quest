import React from 'react';
import { Button, Badge } from 'reactstrap';

const FamilyView = props => (
    <div className="container rowView">
        <h4 className="famNameHeader">Welcome {props.familyname} Family!</h4>
        {props.members.map(member => (
            <div className="famRow" key={member._id}>
                <div><Button color='link'>{member.name}{' '}</Button>
                <div className="doodleBucksText">Doodle Bucks:{' '}<Badge color="info" size='lg' className="bucksBadge">{member.doodlebugBucks}</Badge></div></div>
            </div>
        )
        )}
    </div>
);

export default FamilyView;