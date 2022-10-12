import Joi from 'joi';

const hourPattern = /^[2][0-3]:[0-5][0-9]|[0-1][0-9]:[0-5][0-9]/;
const name = Joi.string().min(5);
const shortname = Joi.string().min(1);
const teacher = Joi.string().min(2);
const hour = Joi.object({
  weekday: Joi.number().required(),
  starts: Joi.string().pattern(hourPattern).required(),
  ends: Joi.string().pattern(hourPattern).required(),
});

const hours = Joi.array().items(hour);

export const SubjectSchema = Joi.object({
  name: name.required(),
  shortname: shortname.required(),
  teacher: teacher.required(),
  hours: hours.required(),
});

export const DelSubjectSchema = Joi.object({
  name: name.required(),
});

export const ScheduleSchema = Joi.object({
  schedule: Joi.array().items(SubjectSchema).default([]),
});

export interface Hour {
  weekday: number;
  starts: string;
  ends: string;
}

export interface Subject {
  name: string;
  shortname: string;
  teacher: string;
  hours: Hour[];
}

export interface Schedule {
  subjects: Subject[];
}
