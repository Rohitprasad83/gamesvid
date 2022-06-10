import React from 'react'
import { Navbar, Footer } from 'components'
import { useTitle } from 'utils/useTitle'

export function NotFound() {
  useTitle('| 404')

  return (
    <div className="home__container">
      <Navbar />
      <div className="main__container">
        <div className="videos-container">
          <h2>Error 404, We Couldn't Found what you are Looking For!</h2>
        </div>
      </div>
      <Footer />
    </div>
  )
}
