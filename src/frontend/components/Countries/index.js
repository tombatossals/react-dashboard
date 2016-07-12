import React from 'react'

const Country = ({countries}) => (
  <div>
    <h1>Countries</h1>
    {countries.data.map(country => (
      <li key={country.id}>{country.id}</li>
    ))}
  </div>
)

Country.propTypes = {
  countries: React.PropTypes.any
}

export default Country
