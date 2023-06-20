import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Add your logic to fetch the data from the database or any other source
      const userId = req.query.userId as string
      let jobs
      if (userId) {
        jobs = await prisma.job.findMany({
          where: { userId },
          include: {
            user: {
              include: {
                company: {
                  select: {
                    companyName: true,
                    logo: true,
                  },
                },
              },
            },
          },
        })
      } else {
        jobs = await prisma.job.findMany({
          include: {
            user: {
              include: {
                company: {
                  select: {
                    companyName: true,
                    logo: true,
                  },
                },
              },
            },
          },
        })
      }
      return res.status(200).json(jobs)
    } catch (error) {
      console.error('Error fetching jobs', error)
      return res.status(500).json({ error: 'Error fetching jobs' })
    }
  }
  if (req.method === 'POST') {
    try {
      const { title, location, experience, type, userId, detail } = req.body
      const job = await prisma.job.create({
        data: {
          title,
          location,
          experience,
          type,
          detail,
          userId,
        },
      })

      return res.status(200).json(job)
    } catch (error) {
      console.error('Error creating job', error)
      return res.status(500).json({ error: 'Error creating job' })
    }
  }
}
