
/**
 * Method to be used in Array.prototype.sort to sort companies by start date
 * 
 * @param {object} a First object to be compared
 * @param {object} b Second object to be compared
 */
const sortCompaniesByDate = (a, b) => {
  const dateOne = new Date(a.location_start_date)
  const dateTwo = new Date(b.location_start_date)

  if (dateOne < dateTwo) {
    return -1
  }

  if (dateOne > dateTwo) {
    return 1
  }

  return 0 
}

/**
 * Receives an array of companies with name as key and quantity of locations as value
 * Then returns the company with most locations
 * 
 * @param {object} companies Transformed companies to sort
 */
const sortCompaniesByQuantity = (companies) => Object.entries(companies).sort((a, b) => b[1] - a[1]).map(el => ({name: el[0], quantity: el[1]}))

module.exports = {
  sortCompaniesByDate,
  sortCompaniesByQuantity
}