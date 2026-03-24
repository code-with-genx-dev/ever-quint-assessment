import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  assignee: z.string().min(1, "Assignee is required"),
  tags: z.string().min(1, "Tags are required"),
});