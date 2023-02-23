import NextAuth from "next-auth"
import AuthentikProvider from "next-auth/providers/authentik"
import GithubProvider from "next-auth/providers/github"
const fs = require('fs')
import path from 'path'

// const privateKey = fs.readFileSync(path.join(__dirname, 'private_key.pem'))
// const publicKey = fs.readFileSync(path.join(__dirname, 'public_key.pem'))

// const privateKey = fs.readFileSync(path.join(__dirname, 'private_key.pem'))

export const authOptions = {
    // Configure one or more authentication providers
    // providers: [
    //     AuthentikProvider({
    //         clientId: process.env.AUTHENTIK_ID,
    //         clientSecret: process.env.AUTHENTIK_SECRET,
    //         issuer: process.env.AUTHENTIK_ISSUER,
    //     })
    // ],

    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            scope: 'user',
        }),
        AuthentikProvider({
            clientId: process.env.AUTHENTIK_ID,
            clientSecret: process.env.AUTHENTIK_SECRET,
            issuer: process.env.AUTHENTIK_ISSUER,
        })
    ],
    // secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session, token, user }) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            return session
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }
            return token
        },
    },
}
export default NextAuth(authOptions)