import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Users} from '../models';
import {UsersRepository} from '../repositories';

export class UsersController {
  constructor(
    @repository(UsersRepository)
    public usersRepository : UsersRepository,
  ) {}

  @post('/api/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: {'x-ts-type': Users}}},
      },
    },
  })
  async create(@requestBody() users: Users): Promise<Users> {
    return await this.usersRepository.create(users);
  }

  @get('/api/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return await this.usersRepository.count(where);
  }

  @get('/api/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Users}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Users)) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return await this.usersRepository.find(filter);
  }

  @patch('/api/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() users: Users,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return await this.usersRepository.updateAll(users, where);
  }

  @get('/api/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: {'x-ts-type': Users}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Users> {
    return await this.usersRepository.findById(id);
  }

  @patch('/api/users/{id}', {
    responses: {
      '204': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/api/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/api/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
