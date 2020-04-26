import React from 'react'
import { Link } from 'gatsby';

function AdvertisePage() {
  return (
    <div>
      <form action="/" method="get">
        <div>
          <label htmlFor="age">Idade:</label>
          <input id="age" type="number"/>
          <fieldset>
            <legend>Biotipo</legend>
            <label htmlFor="ectomorph">Ectomorfo</label>
            <input type="radio" name="biotype" id="ectomorph" />
            <hr/>
            <label htmlFor="mesomorph">Mesomorfo</label>
            <input type="radio" name="biotype" id="mesomorph" />
            <hr/>
            <label htmlFor="endomorph">Endomorfo</label>
            <input type="radio" name="biotype" id="endomorph" />
          </fieldset>

        </div>
      </form>

      <Link to="/advertise">Prosseguir</Link>
    </div>
  )
}

export default AdvertisePage;