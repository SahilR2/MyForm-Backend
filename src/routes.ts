import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.resolve(__dirname, 'db.json');

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

router.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
  const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  submissions.push(newSubmission);
  fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));

  res.status(201).json({ success: true, submission: newSubmission });
});

router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  if (index >= 0 && index < submissions.length) {
    res.json({ success: true, submission: submissions[index] });
  } else {
    res.status(404).json({ success: false, message: 'Submission not found' });
  }
});

export default router;