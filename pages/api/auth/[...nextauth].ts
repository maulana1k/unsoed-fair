import NextAuth from 'next-auth'
import CredentialProviders from 'next-auth/providers/credentials'
import prisma from '../../../lib/prisma'

export default NextAuth({
  providers: [
    CredentialProviders({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })
        if (!user) {
          throw new Error('No user found')
        }
        if (user.password !== credentials?.password) {
          throw new Error('Wrong password')
        }
        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    // async signIn(data) {
    //   const session = data.user
    //   return Promise.resolve(session)
    // },
    // async jwt(token, user) {
    //   if (user) {
    //     token.id = user.id
    //   }
    //   return token
    // },
    // async session(session, token) {
    //   session.user.id = token.id
    //   return session
    // },
  },
})
