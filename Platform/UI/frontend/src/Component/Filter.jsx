import { useState } from "react";

function Filter({setFilter,drop}) {
  const handleFilterChange = (category, value, checked) => {
    if (checked) {
      setFilter(prevFilter => ({
        ...prevFilter,
        [category]: [...prevFilter[category], value]
      }));
    } else {
      setFilter(prevFilter => ({
        ...prevFilter,
        [category]: prevFilter[category].filter(item => item !== value)
      }));
    }
  };

  const list_of_domains = ["GL", "WEB", "Archi", "MIV", "LLM", "Cloud", "Sec", "AI", "IoT", "VR", "Blockchain", "DS", "SE", "ML", "CN"];
  const list_of_outils = ["Python", "JavaScript", "Java", "C", "C++", "C#", "PHP", "Ruby", "Swift", "Go", "Kotlin", "R", "SQL", "Assembly Language", "HTML", "CSS", "Django", "Spring", "React", "Express", "Laravel", "Angular", "Vue", "Node", ".NET", "Flask", "Rails", "SwiftUI", "TensorFlow", "NumPy", "Pandas", "Scikit-learn", "React Bootstrap", "Lodash", "Axios", "jQuery", "Bootstrap"];
  
  return (
    <div className={`drop_filter ${drop ? 'open_filter' : ''}`}>
        <div className="filter-options">
        <h3>Domain:</h3>
        {list_of_domains.map(domain => (
          <label key={domain}>
            <input 
              type="checkbox" 
              value={domain} 
              onChange={e => handleFilterChange('domain', e.target.value, e.target.checked)}
            />
            {domain}
          </label>
        ))}
      </div>
      <div className="filter-options">
        <h3>Outils:</h3>
        {list_of_outils.map(outil => (
          <label key={outil}>
            <input 
              type="checkbox" 
              value={outil} 
              onChange={e => handleFilterChange('outils', e.target.value, e.target.checked)}
            />
            {outil}
          </label>
        ))}
      </div>
    </div>
  )
}

export default Filter