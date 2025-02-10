import jwt from 'jsonwebtoken'

export const createToken=(user)=>{
    const {_id, email} = user
    const token = jwt.sign({_id, email}, "CODIGOSECRETO", {expiresIn: '2m'})
    return token
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, "CODIGOSECRETO", )
    } catch (error) {
        console.log(error)
        return null
    }
} 