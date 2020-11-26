const { mostLocationsCompany, oldestActiveCompany } = require('./companies')

const run = async () => {
  const mostLocations = await mostLocationsCompany()
  const oldestCompany = await oldestActiveCompany()

  console.log(`Company with most locations is ${mostLocations.name} in ${mostLocations.quantity} locations`)
  console.log(`Oldest company is ${oldestCompany.business_name}, started at ${new Date(oldestCompany.location_start_date).toLocaleDateString()}`)
}

run()