import React from 'react';
import QuestDetails from './questDetails';

const QuestView = props => (
    <div className="container">
        {props.quests ? (
            <div>
                {props.quests.map(quest => (
                    <div key={quest._id}>
                        <QuestDetails 
                            questKey={quest._id}
                            title={quest.title}
                            description={quest.description}
                            questbucks={quest.value}
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