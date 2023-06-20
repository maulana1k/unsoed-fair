import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string
  if (req.method === 'GET') {
    // Handle GET request to fetch user profile
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })
      let profile
      if (user?.role === 'user') {
        profile = await prisma.userProfile.findUnique({
          where: { userId: user.id },
        })
      } else if (user?.role === 'employer') {
        profile = await prisma.company.findUnique({
          where: { employerId: user.id },
        })
      }
      res.status(200).json(profile)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile' })
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create user profile
    try {
      let profile
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })
      if (user?.role === 'user') {
        const { education, social, contact, cv } = req.body
        profile = await prisma.userProfile.update({
          where: { userId },
          data: {
            education,
            social,
            contact,
            cv,
          },
        })
      } else if (user?.role === 'employer') {
        const { companyName, logo, about } = req.body
        profile = await prisma.company.update({
          where: { employerId: userId },
          data: {
            companyName,
            logo,
            about,
          },
        })
      }

      res.status(200).json(profile)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user profile' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
