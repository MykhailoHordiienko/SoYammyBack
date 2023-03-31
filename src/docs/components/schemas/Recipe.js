module.exports = {
  Recipe: {
    type: 'object',
    required: [
      'title',
      'category',
      'instructions',
      'description',
      'time',
      'ingredients',
    ],
    properties: {
      _id: {
        type: 'string',
        description: 'Backend-generated unique identifier',
        example: '63fa1eb8ed1b46fa6fd8e857',
      },
      title: {
        type: 'string',
        description: "Recipe's title",
        example: 'Banana Pancakes',
      },
      description: {
        type: 'string',
        description: "Recipe's description (about) text",
        example:
          'In a bowl, mash the banana with a fork until it resembles a thick purée...',
      },
      time: {
        type: 'string',
        description: "Recipe's cooking time value",
        example: '10 min',
      },
      instructions: {
        type: 'string',
        description: "Recipe's preparation steps describe text",
        example: '',
      },
      category: {
        type: 'string',
        description: "Recipe's category name",
        example: 'Breakfast',
      },
      ingredients: {
        type: 'array',
        description: "Recipe's ingredients list",
        items: {
          type: 'object',
          required: ['id', 'amount', 'measure'],
          properties: {
            id: {
              type: 'string',
              description: "Ingredient's item ID",
              example: '640c2dd963a319ea671e372c',
            },
            amount: {
              type: 'number',
              description: "Ingredient's item amount (quantity)",
              example: 1.5,
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
            id: '640c2dd963a319ea671e372c',
            amount: 1,
            measure: 'tbsp',
          },
        ],
      },
      thumb: {
        type: 'string',
        description: "Recipe's image URL",
        example:
          'https://s.gravatar.com/avatar/068de491621f7014bb5f8b3d473f50a3?s=250',
        default: 'https://placehold.co/300x323?text=Recipe+name',
      },
      youtube: {
        type: 'string',
        description: "Recipe's youtube video link",
        example: 'https://www.youtube.com/watch?v=-gF8d-fitkU',
        default: null,
      },
      isPublic: {
        type: 'boolean',
        description: "Recipe's publicity status",
        example: true,
        default: false,
      },
      owner: {
        type: 'string',
        description: "Backend-generated recipe's author ID",
        example: '6404685147b1474033766547',
      },
      popularity: {
        type: 'integer',
        description: "Backend-generated recipe's popularity value",
        example: 100,
        default: 0,
      },
      createdAt: {
        type: 'string',
        description: "Backend-generated recipe's creation timestamp",
        example: '2023-03-05T11:59:52.259+00:00',
      },
      updatedAt: {
        type: 'string',
        description: "Backend-generated recipe's updating timestamp",
        example: '2023-03-05T12:04:23.982+00:00',
      },
    },
  },
}