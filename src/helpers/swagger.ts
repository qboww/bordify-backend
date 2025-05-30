import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks-pro API',
      version: '1.0.0',
      description: 'A detailed description to be used with Tasks-pro API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
    components: {
      schemas: {
        Register: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'John Johnson' },
            email: {
              type: 'string',
              format: 'email',
              example: 'example@exnpl.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 16,
              example: 'examplePasswrd',
            },
          },
          required: ['username', 'email', 'password'],
        },
        Login: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'example@exnpl.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 16,
              example: 'examplePasswrd',
            },
          },
          required: ['email', 'password'],
        },

        PatchUser: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'John Johnson' },
            email: {
              type: 'string',
              format: 'email',
              example: 'example@exnpl.com',
            },
            password: {
              type: 'string',
              minLength: 8,
              maxLength: 16,
              example: 'examplePasswrd',
            },
            theme: {
              type: 'string',
              enum: ['light', 'dark', 'cyan'],
              example: 'dark',
              default: 'light',
            },
            avatar: {
              type: 'string',
              format: 'binary',
            },
          },
        },
        ResendVerifyMessage: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'example@exnpl.com',
            },
          },
          required: ['email'],
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: 'sadw32rc123312d3124' },
            email: {
              type: 'string',
              format: 'email',
              example: 'example@exnpl.com',
            },
            username: { type: 'string', example: 'John Johnson' },
            theme: {
              type: 'string',
              example: 'dark',
            },
            avatarUrl: {
              type: 'string',
              example: 'myavatar.com/me.jpg',
            },
          },
        },
        Board: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: 'board123' },
            title: { type: 'string', example: 'My Board' },
            icon: {
              type: 'string',
              example: 'icon_1',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'object',
              nullable: true,
              example: {
                mobile: 'http://example.com/new-background.jpg',
                tablet: 'http://example.com/new-background.jpg',
                desktop: 'http://example.com/new-background.jpg',
              },
            },
            columns: {
              type: 'array',
              items: {
                type: 'object',
              },
              example: [],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
          required: ['_id', 'title', 'icon'],
        },
        SideBoard: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: 'board123' },
            title: { type: 'string', example: 'My Board' },
            icon: {
              type: 'string',
              example: 'icon_1',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
          required: ['_id', 'title', 'icon'],
        },
        BoardCreation: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'New Board' },
            icon: {
              type: 'string',
              example: 'icon_2',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'string',
              nullable: true,
              example: 'image_1',
            },
          },
          required: ['title'],
        },
        BoardUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Updated Board Title' },
            icon: {
              type: 'string',
              example: 'icon_3',
              enum: ['icon_1', 'icon_2', 'icon_3'],
            },
            backgroundImg: {
              type: 'string',
              nullable: true,
              example: 'image_1',
            },
            columns: {
              type: 'array',
              items: {
                type: 'object',
              },
              example: [],
            },
          },
        },
        Column: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'To Do',
            },
            tasks: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: [],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
        },
        CreateColumnRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'New Column',
            },
          },
          required: ['title'],
        },
        CreateColumnResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 201,
            },
            message: {
              type: 'string',
              example: 'Column successfully created',
            },
            data: {
              $ref: '#/components/schemas/Column',
            },
          },
        },
        UpdateColumnRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Updated Column Title',
            },
          },
          required: ['title'],
        },
        UpdateColumnResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Column successfully updated',
            },
            data: {
              $ref: '#/components/schemas/Column',
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'Task title',
            },
            description: {
              type: 'string',
              example: 'Task description',
            },
            priority: {
              type: 'string',
              enum: ['none', 'low', 'medium', 'high'],
              default: 'none',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date',
              example: '2024-08-05',
              default: null,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-08-05T12:00:00Z',
            },
          },
        },
        CreateTaskRequest: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'New title',
            },
            description: {
              type: 'string',
              example: 'New description',
            },
            priority: {
              type: 'string',
              enum: ['none', 'low', 'medium', 'high'],
              default: 'none',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date',
              example: '2024-08-05',
            },
          },
          required: ['title', 'description'],
        },
        CreateTaskResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 201,
            },
            message: {
              type: 'string',
              example: 'Task successfully created',
            },
            data: {
              $ref: '#/components/schemas/Task',
            },
          },
        },
        UpdateTaskRequest: {
          type: 'object',
          properties: {
            columnId: {
              type: 'string',
              example: '64d5f7d1c2d1e8d4d8c9b5a2',
            },
            title: {
              type: 'string',
              example: 'New title',
            },
            description: {
              type: 'string',
              example: 'New description',
            },
            priority: {
              type: 'string',
              enum: ['none', 'low', 'medium', 'high'],
              default: 'none',
              example: 'low',
            },
            deadline: {
              type: 'string',
              format: 'date',
              example: '2024-08-05',
            },
          },
        },
        UpdateTaskResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Task successfully updated',
            },
            data: {
              $ref: '#/components/schemas/Task',
            },
          },
        },
        sendSupportEmailRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'user@mail.com',
            },
            message: {
              type: 'string',
              example: 'Comment message',
            },
          },
          required: ['email', 'message'],
        },
        sendSupportEmailResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 200,
            },
            message: {
              type: 'string',
              example: 'Email send successfully',
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./dist/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
