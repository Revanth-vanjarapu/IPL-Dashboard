import {Link} from 'react-router-dom'

const TeamCard = ({cardsData}) => (
  <ul className="card-list">
    {cardsData.map(eachItem => (
      <Card
        key={eachItem.id}
        id={eachItem.id}
        imageUrl={eachItem.imageUrl}
        title={eachItem.name}
      />
    ))}
  </ul>
)

const Card = ({imageUrl, title, id}) => (
  <li className="card">
    <Link to={`/team-matches/${id}`} className="card-link">
      <img src={imageUrl} alt={title} className="card-image" />
      <p className="card-title" data-testid="team-name">
        {title}
      </p>
    </Link>
  </li>
)

export default TeamCard
