import { compareSync , hashSync } from "bcrypt";
import User from "../../../DB/Models/user.model.js";
import { assymetricDecryption, assymetricEncryption, encrypt, decrypt } from "../../../Utils/encryption.utils.js";
import { v4 as uuidv4 } from "uuid"
import { generateToken , verifyToken } from "../../../Utils/tokens.utils.js";


 
export const signUpService = async (req, res) => {
  const {name ,email,password,phoneNumber,age} = req.body;
  const isUserExist = await User.findOne({ email })
  
  if(isUserExist) return res.status(404).json({message: "user already exists"});

  const encryptPN = assymetricEncryption(phoneNumber)
  const hashPassword = hashSync(password, +process.env.SALT_ROUNDS)

  const user = await User.create({
            name,
            email,
            password: hashPassword,
            age,
            phoneNumber: encryptPN,
        })

   return res.status(201).json({ message: "User created succesfully", user })
}


export const signinService = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = compareSync(password, user.password)

    if (!isPasswordMatch) {
        return res.status(404).json({ message: "Invalid email or password" });
    }

    const accesstoken = generateToken(
        { _id: user._id, email: user.email },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
            jwtid: uuidv4()
        }
    )
    return res.status(200).json({ message: "User signed in successfully", accesstoken })
}


export const updateAccountService = async (req, res) => {

    const { _id } = req.loggedInUser
    const { name, email, age, phoneNumber } = req.body

    const user = await User.findByIdAndUpdate(
        _id,
        { name, email, age, phoneNumber },
        { new: true }
    )
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User updated successfully" })
}


export const deleteAccountService = async (req, res) => {

    const {_id} = req.loggedInUser
    const deletedResult = await User.deleteOne({ _id })

    if (!deletedResult.deletedCount) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" })
}


export const listUsersService = async (req, res) => {

    const { _id } = req.loggedInUser;

     let user = await User.findById(_id).select("-password");

    if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user = {
    ...user._doc,
    phoneNumber: assymetricDecryption(user.phoneNumber),
  };
    return res.status(200).json({ message: "Users listed successfully", user })
}