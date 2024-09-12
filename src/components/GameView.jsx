import React from 'react';
import PropTypes from 'prop-types';

class GameView extends React.Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    playerName: PropTypes.string.isRequired,
    opponentCount: PropTypes.number.isRequired,
    game: PropTypes.object,
  };

  render() {
    const { game } = this.props;
    const players = game ? game.players() : [];

    return (
      <div>
        <h1>Game View</h1>
        <h2>Players:</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player && typeof player.name === 'function' ? player.name() : 'Unknown Player'}
            </li>
          ))}
        </ul>
        {/* Add other rendering code here */}
      </div>
    );
  }
}

export default GameView;
