const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it('GET /cafes debe devolver un código de estado 200 y un arreglo con al menos 1 objeto', async () => {
        const response = await request(app).get('/cafes');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('DELETE /cafes/:id debe devolver un código de estado 404 para un café que no existe', async () => {
        const response = await request(app).delete('/cafes/cafe_que_no_existe');
        expect(response.status).toBe(404);
    });

    it('POST /cafes debe agregar un nuevo café y devolver un código 201', async () => {
        const newCafe = { id: 'cafe_nuevo', name: 'Café Nuevo' };
        const response = await request(app).post('/cafes').send(newCafe);
        expect(response.status).toBe(201);
    });

    it('PUT /cafes/:id debe devolver un código 400 si el id no coincide entre parámetros y el payload', async () => {
        const cafeToUpdate = { id: 'cafe_existente', name: 'Café Actualizado' };
        const response = await request(app).put('/cafes/otro_id').send(cafeToUpdate);
        expect(response.status).toBe(400);
    });
});
