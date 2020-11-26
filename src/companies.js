const fetch = require('node-fetch')
const { sortCompaniesByDate, sortCompaniesByQuantity } = require('./helpers')

/**
 * Gets the oldest company
 * 
 * @returns {object} Company object
 */
const oldestActiveCompany = async () => {
  try {
    const response = await fetch('https://data.lacity.org/resource/6rrh-rzua.json')
    const data = await response.json()
  
    if (!data.length) return false

    const sortedData = data.sort(sortCompaniesByDate)  

    return sortedData[0]
  } catch(error) {
    throw new Error(`Error while processing companies: ${error}`)
  }
}

/**
 * Gets company with most locations
 * 
 * @returns {object} Company object
 */
const mostLocationsCompany = async () => {
  try {
    const response = await fetch('https://data.lacity.org/resource/6rrh-rzua.json')
    const data = await response.json()
  
    const companiesRankByLocation = data.reduce((acc, curr) => {
      if (!acc[curr.business_name]) {
        acc[curr.business_name] = 0
      }

      acc[curr.business_name] += 1
      return acc
    }, {})

    
    if(!Object.values(companiesRankByLocation).length) return false
    
    const sortedCompanies = sortCompaniesByQuantity(companiesRankByLocation)

    return sortedCompanies[0]
  } catch(error) {
    throw new Error(`Error while processing companies: ${error}`)
  }
}

module.exports = {
  mostLocationsCompany,
  oldestActiveCompany,
}