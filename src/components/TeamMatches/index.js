import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {latestMatchData: {}, banner: '', recentMatches: [], isLoading: true}

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    const {match} = this.props
    const teamId = match.params.id

    const response = await fetch(`https://apis.ccbp.in/ipl/${teamId}`)
    const data = await response.json()

    if (!data || !data.team_banner_url) {
      console.error('Unexpected API response:', data)
      return
    }

    this.setState({
      latestMatchData: data.latest_match_details,
      banner: data.team_banner_url,
      recentMatches: data.recent_matches,
      isLoading: false,
    })
  }

  render() {
    const {latestMatchData, banner, recentMatches, isLoading} = this.state
    console.log(latestMatchData, banner, recentMatches)
    return isLoading ? (
      <div testid="loader">
        <Loader type="Oval" color="#f7db00" height={50} width={50} />
      </div>
    ) : (
      <div className="team-matches">
        {/* Team Banner */}
        <img
          src={banner}
          alt="team banner"
          className="team-banner"
          data-testid="team-banner"
        />

        {/* Latest Match Card */}
        <h2 className="section-title">Latest Match</h2>
        <div className="latest-match-card">
          <div className="match-info">
            <p className="match-title">{latestMatchData.competing_team}</p>
            <p data-testid="match-date">{latestMatchData.date}</p>
            <p data-testid="match-venue">{latestMatchData.venue}</p>
            <p>result</p>
            <p>{latestMatchData.result}</p>
            <p>{latestMatchData.first_innings}</p>
            <p>{latestMatchData.second_innings}</p>
            <p>{latestMatchData.man_of_the_match}</p>
            <img
              src={latestMatchData.competing_team_logo}
              alt={`latest match ${latestMatchData.competing_team}`}
              className="match-logo"
            />
            <p></p>
            <p data-testid="match-umpires">{latestMatchData.umpires}</p>
          </div>
        </div>

        {/* Recent Matches Section */}
        <h2 className="section-title">Recent Matches</h2>
        <ul className="matches-container">
          {recentMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
