import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(400).send('User not registered')
    }
    if (user.password !== password) {
      return res.status(400).send('Wrong password')
    }
    return res.status(201).json({ user })
  } catch (error) {
    return res.status(500).send('Internal server error')
  }
}
