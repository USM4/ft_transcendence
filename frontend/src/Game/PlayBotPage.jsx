import react from 'react';
import Game from './Game';

const Playbotpage = () => {
    return (
        <div>
        <h1>Play vs bot</h1>
        <Game isAIEnabled={true} />
        </div>
    );
};

export default Playbotpage;
