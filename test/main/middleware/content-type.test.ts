import request from 'supertest'
import app from '@/main/config/app'

describe('Content type middleware', () => {
    test('should return default content type as JSON', async () => {
        app.get('/test_content_type', (req, res) => {
            res.send('')
        })

        await request(app)
            .get('/test_content_type')
            .expect('content-type', /json/)
    })
    test('should return XML content type when forced', async () => {
        app.get('/test_content_type_xml', (req, res) => {
            res.type('xml')
            res.send('')
        })

        await request(app)
            .get('/test_content_type_xml')
            .expect('content-type', /xml/)
    })
})
