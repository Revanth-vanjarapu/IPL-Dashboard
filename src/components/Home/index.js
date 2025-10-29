import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    if (!data.teams || !Array.isArray(data.teams)) {
      console.error('Expected an array but received:', data)
      return
    }

    const newData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      imageUrl: eachItem.team_image_url,
    }))

    this.setState({teamData: newData, isLoading: false})
  }

  render() {
    const {isLoading, teamData} = this.state
    return isLoading ? (
      <div data-testid="loader">
        <Loader type="Oval" color="#f7db00" height={50} width={50} />
      </div>
    ) : (
      <div className="ipl-dashboard">
        <header className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="title">IPL Dashboard</h1>
        </header>
        <TeamCard cardsData={teamData} />
      </div>
    )
  }
}

export default Home
