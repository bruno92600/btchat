import { Request, Response } from "express"
import prisma from "../db/prisma.js"
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup = async (req: Request, res: Response) => {
    try {
        const {fullname, username, password, confirmPassword, gender} = req.body

        if(!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({error: "Veuillez remplir tous les champs"})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Les mots de passe ne sont pas identiques"})
        }

        const user = await prisma.user.findUnique({
            where: {
                username
            }
        })

        if (user) {
            return res.status(400).json({error: "L'utilisateur existe déjà"})
        }

        // haché le mdp
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // https://avatar-placeholder.iran.liara.run

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await prisma.user.create({
            data: {
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male"? boyProfilePic : girlProfilePic,
            },
        })

        if (newUser) {
            // generate token 

            generateToken(newUser.id, res)

            res.status(200).json({
                id: newUser.id,
                fullName: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({error: "Erreur lors de l'inscription"})
        }

    } catch (error:any) {
        console.log("Erreur lors de l'enregistrement", error.message);
        res.status(500).json({ error : "Erreur serveur interne"})
        
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        const user = await prisma.user.findUnique({ where: { username } })

        if (!user) {
            return res.status(400).json({ error: "L'utilisateur n'existe pas" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Le mot de passe est incorrect" })
        }

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            fullName: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error: any) {
        console.log("Erreur lors de la connexion", error.message);
        res.status(500).json({ error: "Erreur serveur interne" })
        
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Vous êtes déconnecté" })
    } catch (error: any) {
        console.log("erreur lors de la deconnexion", error.message);
        res.status(500).json({ error: "Erreur serveur interne" })
        
    }
}

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({ where: { id:req.user.id }})

        if(!user) {
            return res.status(404).json({error: "Aucun utilisateur trouvé"})
        }

        res.status(200).json({
            id: user.id,
            fullName: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error: any) {
        console.log("Erreur dans getMe", error.message);
        res.status(500).json({ error: "Erreur serveur interne" })
    }
}