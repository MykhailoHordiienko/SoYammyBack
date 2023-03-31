module.exports = {
  User: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      _id: {
        type: 'string',
        description: 'Backend-generated unique identifier.',
        example: '63fa1eb8ed1b46fa6fd8e857',
      },
      name: {
        type: 'string',
        description: "User's name",
        example: 'John Smith',
      },
      email: {
        type: 'string',
        description: "User's email",
        example: 'smith@mail.com',
      },
      password: {
        type: 'string',
        description: "Hashed user's password",
        example: 'hjdf5sx76ggsx',
      },
      avatarURL: {
        type: 'string',
        description: "User's avatar URL",
        example:
          'https://s.gravatar.com/avatar/068de491621f7014bb5f8b3d473f50a3?s=250',
      },
      token: {
        type: 'string',
        description: 'Backend-generated unique json web token',
        example: 'adsjkasnxz.csdcdfgdvgfhgfdcs.saxsa',
      },
      isVerify: {
        type: 'Boolean',
        description: 'Flag is user confirmed registration by email',
        example: true,
      },
      verificationToken: {
        type: 'String',
        description: 'Backend-generated token for email confirmation',
        example: 'fger74r4r43dw8',
      },
      receipts: {
        type: 'array',
        description: "User's collection of saved receipts (array of ObjectId)",
        items: { type: 'string' },
      },
      favorites: {
        type: 'array',
        description:
          "User's collection of favorite receipts (array of ObjectId)",
        items: { type: 'string' },
      },
      shoppingList: {
        type: 'array',
        description: 'User collection of products to shop',
        items: {
          type: 'array',
          items: {
            _id: {
              type: 'string',
            },
            quantity: {
              type: 'number',
            },
            unit: {
              type: 'string',
            },
          },
        },
      },
    },
  },
}
