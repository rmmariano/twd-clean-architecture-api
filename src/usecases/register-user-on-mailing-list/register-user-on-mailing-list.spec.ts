import { UserData } from './user-data'

describe('Register user on mailing list - use case', () => {
    test('should add user with complete data to mailing list', async () => {
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMainlingList(repo)
        const name = 'any_name'
        const email = 'any@email.com'
        const response = await usercase.registerUserOnMainlingList({name, email})
        const user = repo.findUserByEmail(email)
        expect((await user).name).toBe(name)
    })
})
