import React from 'react';
import QuestDetails from './questDetails';

const QuestView = props => (
    <div>
        {props.quests ? (
            <div>
                {props.quests.map(quest => (
                
                    <div key={quest._id}>
                        {/* <p><Link to={'/quest/2'} >{quest.title}</Link>{': '}{quest.description}{', doodle bucks:'}{quest.value}</p> */}
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