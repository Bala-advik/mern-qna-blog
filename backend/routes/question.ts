import { Router, Request, Response, NextFunction } from "express";
import QnA from "../models/QnA";

const router = Router();

const validateQnA = (req: Request) => {
  const errors: string[] = [];
  if (!req.body.answer) {
    errors.push("Answer is required");
  }
  if (!req.body.question) {
    errors.push("Question is required");
  }
  if (!req.body.category) {
    errors.push("Category is required");
  }
  if (!req.body.subcategory) {
    errors.push("Sub Category is required");
  }
  return errors;
};

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryString = req.query.category as string;

    if (queryString) {
      const categoryQnas = await QnA.find({ category: queryString });
      res.status(200).json(categoryQnas);
    } else {
      res.status(400).json({ message: 'Category query parameter is required' });
    }
  } catch (err: any) {
    next(err);  // Pass the error to the next middleware for proper error handling
  }
});


router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  await QnA.find({ _id: req.params.id })
    .then((certainQna) => res.status(201).json(certainQna))
    .catch((err) => next(err));
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validateQnA(req);
  if (errors.length > 0) {
    const error = new Error(errors.join(", "));
    (error as any).status = 400;
    return next(error);
  }
  const newQnA = new QnA(req.body);
  await newQnA
    .save()
    .then((qna) => res.status(201).json(qna))
    .catch((err) => next(err));
});

// Update an existing question
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const errors = validateQnA(req);
  if (errors.length > 0) {
    const error = new Error(errors.join(", "));
    (error as any).status = 400;
    return next(error);
  }
  await QnA.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((qna) => res.status(201).json(qna))
    .catch((err) => next(err));
});

// Delete a question
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    await QnA.findByIdAndDelete(req.params.id)
      .then((qna) => res.status(201).json({ message: "User deleted" }))
      .catch((err) => next(err));
  }
);

export default router;
