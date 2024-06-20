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

//for the ping
router.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});


// saving the the submission to db.json
router.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  
  
  const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };
  const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  submissions.push(newSubmission);
  console.log(newSubmission);
  fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));

  res.status(201).json({ success: true, submission: newSubmission });
});

//reading the submission
router.get('/read', (req: Request, res: Response) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  if (index >= 0 && index < submissions.length) {
    res.json({ success: true, submission: submissions[index] });
  } else {
    res.status(404).json({ success: false, message: 'Submission not found' });
  }
});

//for deleting the submission
router.delete('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  if (index >= 0 && index < submissions.length) {
    submissions.splice(index, 1);
    fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
    res.json({ success: true });
  } else {
    res.status(404).json({ success: false });
  }
});

//for editing the submission
// router.put('/submit/:index', (req, res) => {
//   const index = parseInt(req.params.index, 10);
//   const { name, email, phone, github_link, stopwatch_time } = req.body;
//   const submissions = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

//   if (index >= 0 && index < submissions.length) {
//     submissions[index] = { name, email, phone, github_link, stopwatch_time };
//     fs.writeFileSync(dbPath, JSON.stringify(submissions, null, 2));
//     res.json({ success: true });
//   } else {
//     res.status(404).json({ success: false, message: 'Submission not found' });
//   }
// });

//for searching the specific user submission
router.get('/search', (req: Request, res: Response) => {
  const email = req.query.email as string;
  const submissions: Submission[] = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const result = submissions.filter(submission => submission.email === email);

  if (result.length > 0) {
    res.json({ success: true, submissions: result });
  } else {
    res.status(404).json({ success: false, message: 'No submissions found for the given email' });
  }
});

export default router;