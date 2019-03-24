import React from 'react';
import { Button } from 'reactstrap';

const QuestView = props => (
    <div>
        {props.quests ? (
            <div>
                {props.quests.map(quest => (
                    <div key={quest._id}>
                        <p>{quest.title}{': '}{quest.description}{', doodle bucks:'}{quest.value}</p>
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