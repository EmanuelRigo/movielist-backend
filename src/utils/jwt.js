import jwt from 'jsonwebtoken'
import envsUtils from './envs.utils.js'

export const createToken=(user)=>{
    const {_id, email} = user
    const token = jwt.sign({_id, email}, envsUtils.JWT_SECRET, {expiresIn: '2m'})
    return token
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, envsUtils.JWT_SECRET, )
    } catch (error) {
        console.log(error)
        return null
    }
} 