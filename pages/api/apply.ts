import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  try {
    const { jobId, userId, email, cv } = req.body
    const apply = await prisma.jobListing.create({
      data: {
        userId,
        jobId,
        email,
        cv,
      },
    })
    res.status(200).json(apply)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' })
  }
}
