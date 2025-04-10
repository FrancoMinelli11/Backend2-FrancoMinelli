import bcrypt from "bcrypt"

export const passwordHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const validateHash = (password, hash) => bcrypt.compareSync(password,hash)