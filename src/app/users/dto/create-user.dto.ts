import { IsNotEmpty, IsEmail, Matches, Validate } from "class-validator"
import { IsEmailAlreadyExistConstraint } from "../validations/isEmailAlreadyExist.decorator"
import { MessagesHelper} from "src/helpers/messages.helper"
import { RegExHelper } from "src/helpers/regex.helper"

export class CreateUserDto{
    @IsNotEmpty()
    firstName: string
    @IsNotEmpty()
    lastName: string
    @IsNotEmpty()

    @IsEmail()
    @Validate(IsEmailAlreadyExistConstraint)
    email: string
    @IsNotEmpty()
    @Matches(RegExHelper.password, {message: MessagesHelper.PASSWORD_VALID})
    password: string
}