const propertyController = require('./property.controller');
const { getPropertyDetailsService } = require('../services/property.service'); // Import the actual service

// Mock the service
jest.mock('../services/property.service', () => ({
  getPropertyDetailsService: jest.fn(),
}));

describe('getPropertyDetail controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should return property details', async () => {
    const mockPropertyDetails = { id: '1', name: 'Property 1' };
    getPropertyDetailsService.mockResolvedValueOnce(mockPropertyDetails);

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await propertyController.getPropertyDetail(req, res);

    expect(getPropertyDetailsService).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockPropertyDetails,
    });
  });

  it('should handle error when property details are not found', async () => {
    getPropertyDetailsService.mockResolvedValueOnce(null); // Simulate property details not found

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await propertyController.getPropertyDetail(req, res);

    expect(getPropertyDetailsService).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: "can't get property detail",
      error: 'Property details not found',
    });
  });

  it('should handle error when service throws an error', async () => {
    const errorMessage = 'Internal server error';
    getPropertyDetailsService.mockRejectedValueOnce(new Error(errorMessage));

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await propertyController.getPropertyDetail(req, res);

    expect(getPropertyDetailsService).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: "can't get property detail",
      error: errorMessage,
    });
  });
});
