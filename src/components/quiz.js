import React from 'react'

function Quiz() {
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
    </div>
  )
}

export default Quiz;