import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jobId = req.query.jobId as string

  if (req.method === 'GET') {
    try {
      // Fetch the job detail based on the jobId
      const jobDetail = await prisma.job.findFirst({
        where: { id: jobId },
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
      if (jobDetail) {
        return res.status(200).json(jobDetail)
      } else {
        return res.status(404).json({ error: 'Job not found' })
      }
    } catch (error) {
      console.error('Error fetching job detail', error)
      return res.status(500).json({ error: 'Error fetching job detail' })
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
}
