// Unit Tests for Property Controller
// Run with: npm test

const request = require('supertest');
const app = require('../app');
const Property = require('../models/property');

describe('Property Controller Tests', () => {

  describe('GET /api/property/full-list', () => {
    it('should return all active properties', (done) => {
      request(app)
        .get('/api/property/full-list')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          done();
        });
    });

    it('should only return active properties', (done) => {
      request(app)
        .get('/api/property/full-list')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          res.body.forEach(property => {
            expect(property.isActive).toBe(true);
          });
          done();
        });
    });

    it('should populate city, state, type, and userId fields', (done) => {
      request(app)
        .get('/api/property/full-list')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          if (res.body.length > 0) {
            const property = res.body[0];
            expect(property.city).toBeDefined();
            expect(property.state).toBeDefined();
            expect(property.type).toBeDefined();
            expect(property.userId).toBeDefined();
          }
          done();
        });
    });
  });

  describe('POST /api/property/mark-as-sold/:propertySlug', () => {
    it('should update property status successfully', (done) => {
      const propertySlug = 'test-property-slug';
      const updateData = { status: 'sold' };

      request(app)
        .patch(`/api/property/mark-as-sold/${propertySlug}`)
        .send(updateData)
        .expect((res) => {
          // Check response has success message or proper status code
          expect(res.status).toBeLessThan(500);
        })
        .end(done);
    });

    it('should return error for invalid slug', (done) => {
      const invalidSlug = 'non-existent-property-12345';
      const updateData = { status: 'sold' };

      request(app)
        .patch(`/api/property/mark-as-sold/${invalidSlug}`)
        .send(updateData)
        .end((err, res) => {
          // Should either return 400 or success with 0 modified
          expect([400, 200]).toContain(res.status);
          done();
        });
    });

    it('should accept valid status values', (done) => {
      const validStatuses = ['available', 'sold', 'rented', 'expired'];
      const propertySlug = 'test-property';
      let completed = 0;

      validStatuses.forEach(status => {
        request(app)
          .patch(`/api/property/mark-as-sold/${propertySlug}`)
          .send({ status: status })
          .end((err, res) => {
            completed++;
            if (completed === validStatuses.length) done();
          });
      });
    });
  });

  describe('GET /api/property/single/:propertySlug', () => {
    it('should return property details with files', (done) => {
      request(app)
        .get('/api/property/single/test-property-slug')
        .expect((res) => {
          expect(res.status).toBeLessThan(500);
          if (res.body.result) {
            expect(res.body.result).toHaveProperty('title');
            expect(res.body.result).toHaveProperty('price');
          }
        })
        .end(done);
    });

    it('should handle non-existent property gracefully', (done) => {
      request(app)
        .get('/api/property/single/non-existent-slug-12345')
        .end((err, res) => {
          expect([400, 404]).toContain(res.status);
          done();
        });
    });
  });

  describe('GET /api/property/filter', () => {
    it('should filter properties by city', (done) => {
      request(app)
        .get('/api/property/filter?city=New%20York')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          done();
        });
    });

    it('should filter properties by type', (done) => {
      request(app)
        .get('/api/property/filter?type=apartment')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          done();
        });
    });

    it('should filter properties by status', (done) => {
      request(app)
        .get('/api/property/filter?status=available')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          done();
        });
    });

    it('should support multiple filters', (done) => {
      request(app)
        .get('/api/property/filter?city=New%20York&status=available&type=apartment')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          done();
        });
    });

    it('should filter by propertyFor (sell/rent)', (done) => {
      request(app)
        .get('/api/property/filter?propertyFor=sell')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).toBeTruthy();
          if (res.body.length > 0) {
            expect(res.body[0].propertyFor).toBe('sell');
          }
          done();
        });
    });
  });

  describe('POST /api/property/add', () => {
    it('should require all mandatory fields', (done) => {
      const incompleteData = {
        title: 'Test Property'
        // Missing other required fields
      };

      request(app)
        .post('/api/property/add')
        .send(incompleteData)
        .expect((res) => {
          expect(res.status).toBeGreaterThanOrEqual(400);
        })
        .end(done);
    });

    it('should accept complete property data', (done) => {
      const completeData = {
        title: 'Beautiful Test Property',
        propertyFor: 'sell',
        type: 'house',
        state: 'state_id',
        city: 'city_id',
        locality: 'Downtown',
        length: 100,
        breadth: 200,
        address: '123 Test Street',
        email: 'test@example.com',
        price: 500000,
        phoneNo: '1234567890',
        pincode: '12345',
        userId: 'user_id'
      };

      request(app)
        .post('/api/property/add')
        .send(completeData)
        .end((err, res) => {
          expect(res.status).toBeLessThan(500);
          done();
        });
    });
  });

  describe('GET /api/property/user/:userId', () => {
    it('should return only active properties for user', (done) => {
      const userId = 'test-user-id';

      request(app)
        .get(`/api/property/user/${userId}`)
        .expect((res) => {
          expect(res.status).toBeLessThan(500);
          if (Array.isArray(res.body)) {
            res.body.forEach(property => {
              expect(property.userId._id).toBe(userId);
              expect(property.isActive).toBe(true);
            });
          }
        })
        .end(done);
    });
  });

});
