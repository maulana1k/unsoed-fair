import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'

import prisma from '@/lib/prisma'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { fullname, email, password } = req.body

  try {
    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res.status(400).send('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        role: 'user',
        profile: {
          create: {
            education: '',
            social: '',
            contact: '',
            cv: '',
          },
        },
      },
    })

    return res.status(201).json({ user: newUser })
  } catch (error) {
    return res.status(500).send('Internal server error')
  }
}
