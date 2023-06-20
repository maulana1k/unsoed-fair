import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request to fetch user profile
    try {
      const userId = req.query.userId as string
      const userProfile = await prisma.userProfile.findUnique({
        where: { userId },
      })
      res.status(200).json(userProfile)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile' })
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create user profile
    try {
      const { userId, education, social, contact, cv } = req.body
      const userProfile = await prisma.userProfile.update({
        where: { userId },
        data: {
          education,
          social,
          contact,
          cv,
        },
      })

      res.status(200).json(userProfile)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user profile' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
