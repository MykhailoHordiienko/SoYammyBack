module.exports = {
  get: {
    tags: ['ShoppingList'],
    summary: 'Get the shopping list products',
    description: 'This route returns the shopping list products',
    operationId: 'shopping-list-items',
    security: [
      {
        BearerAuth: [],
      },
    ],
    parameters: [
      {
        $ref: '#/components/parameters/authorizationParam',
      },
    ],
    responses: {
      200: {
        description: 'Information found',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Shopping list products',
              items: {
                type: 'object',
                required: ['id', 'amount', 'measure'],
                properties: {
                  recipeId: {
                    type: 'string',
                    description: "Recipe's ID",
                    example: '640c2dd963a319ea671e372c',
                  },
                  id: {
                    type: 'string',
                    description: "Ingredient's item ID",
                    example: '640c2dd963a319ea671e372c',
                  },
                  amount: {
                    type: 'string',
                    description: "Ingredient's item amount (quantity)",
                    example: '1',
                  },
                  measure: {
                    type: 'string',
                    description: "Ingredient's item measurement units",
                    example: 'tbsp',
                  },
                },
              },
              example: [
                {
                  recipeId: '319eaa36d79632c71e640c2d',
                  id: '640c2dd963a319ea671e372c',
                  amount: '1',
                  measure: 'tbsp',
                },
              ],
            },
          },
        },
      },
      401: {
        description: 'Missing header with authorization token',
      },
      500: {
        description: 'Server error',
      },
    },
  },
}
