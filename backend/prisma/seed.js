import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const futureDate = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

async function main() {
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('Riya@123', 12);
  const demoPassword = await bcrypt.hash('Demo@1234', 12);
  const testPassword = await bcrypt.hash('Test@1234', 12);

  const admin = await prisma.user.create({
    data: { name: 'Admin', email: 'riya11@gmail.com', password, role: 'Admin' }
  });

  const demo = await prisma.user.create({
    data: { name: 'Demo Member', email: 'demomember@gmail.com', password: demoPassword, role: 'Member' }
  });

  const test = await prisma.user.create({
    data: { name: 'test Member', email: 'test1@gmail.com', password: testPassword, role: 'Member' }
  });

  const launch = await prisma.project.create({
    data: {
      title: 'Product Launch',
      description: 'Coordinate release tasks for the new team workspace.',
      createdBy: admin.id
    }
  });

  const ops = await prisma.project.create({
    data: {
      title: 'Operations Upgrade',
      description: 'Improve internal reporting and weekly team routines.',
      createdBy: admin.id
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Finalize onboarding checklist',
        description: 'Review the onboarding flow and publish the checklist.',
        status: 'InProgress',
        priority: 'High',
        dueDate: futureDate(3),
        assignedTo: demo.id,
        projectId: launch.id,
        createdBy: admin.id
      },
      {
        title: 'Create launch analytics view',
        description: 'Build initial dashboard charts for launch metrics.',
        status: 'Pending',
        priority: 'Medium',
        dueDate: futureDate(7),
        assignedTo: test.id,
        projectId: launch.id,
        createdBy: admin.id
      },
      {
        title: 'Archive stale operations tasks',
        description: 'Clean up stale work items and document the process.',
        status: 'Completed',
        priority: 'Low',
        dueDate: futureDate(-2),
        assignedTo: demo.id,
        projectId: ops.id,
        createdBy: admin.id
      },
      {
        title: 'Update weekly reporting template',
        description: 'Refresh the reporting template with owner and status fields.',
        status: 'Overdue',
        priority: 'High',
        dueDate: futureDate(-1),
        assignedTo: test.id,
        projectId: ops.id,
        createdBy: admin.id
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed data created');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
