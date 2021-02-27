import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

describe('Mongodb User repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })
    beforeEach(async () => {
        MongoHelper.clearCollection('users')
    })
    test('when user is added, it should exist', async () => {
        const userRepository = new MongodbUserRepository()
        const user = {
            name: 'Any Name',
            email: 'any@mail.com'
        }
        await userRepository.add(user)
        expect(await userRepository.exists(user)).toBeTruthy()
    })
    test('find all users should return all added users', async () => {
        const userRepository = new MongodbUserRepository()
        const user1 = {
            name: 'Any Name 1',
            email: 'any1@mail.com'
        }
        await userRepository.add(user1)
        const user2 = {
            name: 'Any Name 2',
            email: 'any2@mail.com'
        }
        await userRepository.add(user2)

        const users = await userRepository.findAllUsers()
        expect(users[0].name).toEqual(user1.name)
        expect(users[1].name).toEqual(user2.name)
    })
})
