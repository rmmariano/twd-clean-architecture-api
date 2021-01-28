import { UserData } from './user-data'
import { Either, left, right } from '../shared/either'
import { InvalidEmailError } from './errors/invalid-email-error'
import { InvalidNameError } from './errors/invalid-name-error'
import { Email } from './email'
import { Name } from './name'

export class User {
    public readonly name: Name
    public readonly email: Email

    private constructor (name: Name, email: Email) {
        this.name = name
        this.email = email
    }

    static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
        const nameOrError = Name.create(userData.name)
        // if error (left)
        if (nameOrError.isLeft()) {
            return left(nameOrError.value)
        }

        const emailOrError = Email.create(userData.email)
        // if error (left)
        if (emailOrError.isLeft()) {
            return left(emailOrError.value)
        }

        const name: Name = nameOrError.value as Name
        const email: Email = emailOrError.value as Email

        return right(new User(name, email))
    }
}
