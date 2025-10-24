import './index.css'

const MatchCard = ({match}) => (
  <li className="match-card">
    <img
      src={match.competing_team_logo}
      alt={`competing team ${match.competing_team}`}
      className="match-logo"
    />
    <p data-testid="competing-team">{match.competing_team}</p>
    <p>{match.result}</p>
    <p data-testid="match-status">{match.match_status}</p>
  </li>
)

export default MatchCard
