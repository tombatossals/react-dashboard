import React from 'react'

const Country = (props) => {
  console.log(props)
  return (
    <div>
      <h1>Countries</h1>
      {props.countries}
      {props.countries.data.map(country => (
        <li>{{ country }}</li>
      ))}
    </div>
  )
}

Country.propTypes = {
  countries: React.PropTypes.any
}

export default Country
