// @ts-check

export default async (fastify) => {
  // Deliberate failure endpoint for QA students: placing an order always hits
  // this and gets HTTP 500 (the front-end still shows a success modal — the bug).
  fastify.get('/http/500/failed', async (_request, reply) => {
    return reply.code(500).send({
      message: 'Internal Server Error',
      statusCode: 500,
    });
  });
};
