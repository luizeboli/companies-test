const fetch = require('node-fetch');
const { mostLocationsCompany, oldestActiveCompany } = require('../src/companies')

jest.mock('node-fetch')

const fakeCompanies = [
  {
    business_name: 'Company One',
    location_start_date: '2005-02-01T00:00:00.000',
    location_account: '123'
  },
  {
    business_name: 'Company Three',
    location_start_date: '2020-02-01T00:00:00.000',
    location_account: '123'
  },
  {
    business_name: 'Company Two',
    location_start_date: '1999-02-01T00:00:00.000',
    location_account: '123'
  },
  {
    business_name: 'Company Three',
    location_start_date: '2020-02-01T00:00:00.000',
    location_account: '123'
  }
]

describe('Companies', () => {
  it('should return the oldest active company', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeCompanies)
    });

    const company = await oldestActiveCompany()

    expect(company.business_name).toBe('Company Two')
    expect(company.location_start_date).toBe('1999-02-01T00:00:00.000')
  }),

  it('should throw if error occurs when retrieving oldest company', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockRejectedValue('Error')
    });

    async function shouldThrow() {
      await oldestActiveCompany()
    }

    expect(shouldThrow).rejects.toThrow()
  }),

  it('should return the company in most locations', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fakeCompanies)
    });

    const company = await mostLocationsCompany()

    expect(company.name).toBe('Company Three')  
    expect(company.quantity).toBe(2)  
  }),

  it('should throw if error occurs when retrieving most locations company', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockRejectedValue('Error')
    });

    async function shouldThrow() {
      await mostLocationsCompany()
    }

    expect(shouldThrow).rejects.toThrow()
  }),

  it('should return false if no results', async () => {
    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });

    const oldestActive = await oldestActiveCompany()
    const mostLocations = await mostLocationsCompany()

    expect(oldestActive).toBe(false)
    expect(mostLocations).toBe(false)
  })
})