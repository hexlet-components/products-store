// @ts-check

export default async (fastify) => {
  // Order placement endpoint. Deliberately broken for QA students: it accepts
  // the order payload but always fails with HTTP 500, while the front-end still
  // shows a success modal — that mismatch is the bug to find.
  fastify.post('/orders', async (_request, reply) => {
    return reply.code(500).send({
      message: 'Failed to create order',
      statusCode: 500,
    });
  });
};
