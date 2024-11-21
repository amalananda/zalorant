import bcrypt from "bcryptjs"

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const comparePassword = (
  inputPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compareSync(inputPassword, hashedPassword)
}
