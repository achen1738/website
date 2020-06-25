import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MatchContainer.scss';
import { connect } from 'react-redux';
import { getUserMatch, getDisplayMatches } from '../../../user/selectors.js';
import Match from '../Match/Match';

import Info from '../Info';
import Champ from '../Champ';
import Stats from '../Stats';
import Items from '../Items';
import Players from '../Players';
import Expand from '../../containers/Expand';
// import Expansion from '../../../expansion/containers/Expansion';

const MatchContainer = props => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const win = props.userMatch.win;

  let matchStyle = 'match';
  if (win) matchStyle += ' match_win';
  else matchStyle += ' match_lose';

  let matchSummaryStyle = 'match__summary';
  if (win) matchSummaryStyle += ' match__summary_win';
  else matchSummaryStyle += ' match__summary_lose';

  return (
    <div className="match-container">
      <div className={matchStyle}>
        <div className={matchSummaryStyle}>
          <Match userMatch={props.userMatch}>
            <Info game={props.game} />
            <Champ />
            <Stats game={props.game} />
            <Items />
            <Players displayMatches={props.displayMatches} />
            <Expand handleExpand={handleExpand} />
          </Match>
        </div>
      </div>
    </div>
  );
};

MatchContainer.propTypes = {
  game: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.game.gameId;
  return {
    userMatch: getUserMatch(state, gameId),
    displayMatches: getDisplayMatches(state, gameId)
  };
};

export default connect(mapStateToProps, {})(MatchContainer);
