import React from 'react'

function Home() {
  return (
    <div className='HomePage'>
        <div className='left'>
            <div className="logo logo2">
               <div className="logo-icon logo-icon2 ">PL</div> {/* Logo icon */}
                  ProjectLink
            </div>
           <div className='welcome-message'>
               <h1>Bienvenue sur <span className='site_name'>ProjectLink</span></h1><br/>
            <span>
            ProjectLink est une plateforme web qui met en relation les
            étudiants algériens å la recherche d'un projet de fin d'études et
            les encadreurs disposant de projets å proposer. Elle facilite le
            processus de recherche en permettant aux étudiants de filtrer
            les projets par centres d'intérét et aux encadreurs de diffuser
            leurs offres. Avec sa fonctionnalité d'attribution automatique et
            son systéme de recommandation basé sur les préférences des
            étudiants, elle Offre une solution innovante et efficace pour faciliter la recherche
            </span>
           </div>
        </div>
        <div className='right'>
           <div className='background-image'></div>
        </div>
    </div>
  )
}

export default Home