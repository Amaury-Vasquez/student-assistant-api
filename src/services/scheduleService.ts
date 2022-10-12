import Randex from 'randexp';
import { faker } from '@faker-js/faker';
import boom from '@hapi/boom';

import { Subject, Schedule } from '../schemas/scheduleSchema';

export class ScheduleService {
  private schedule: Schedule;

  constructor() {
    this.schedule = {
      subjects: this.generate(),
    };
  }

  private generate() {
    const arr: Subject[] = Array.from({ length: 10 }, () => {
      const regex = new Randex(/^[2][0-3]:[0-5][0-9]|[0-1][0-9]:[0-5][0-9]/);
      const tmp = {
        name: faker.name.jobArea(),
        shortname: faker.name.suffix(),
        teacher: faker.name.fullName(),
        hours: [
          {
            weekday: faker.datatype.number({ min: 1, max: 7 }),
            starts: regex.gen(),
            ends: regex.gen(),
          },
          {
            weekday: faker.datatype.number({ min: 1, max: 7 }),
            starts: regex.gen(),
            ends: regex.gen(),
          },
          {
            weekday: faker.datatype.number({ min: 1, max: 7 }),
            starts: regex.gen(),
            ends: regex.gen(),
          },
          {
            weekday: faker.datatype.number({ min: 1, max: 7 }),
            starts: regex.gen(),
            ends: regex.gen(),
          },
        ],
      };
      return tmp;
    });
    return arr;
  }

  async getSchedule() {
    return this.schedule;
  }

  async addSubject(subject: Subject) {
    this.schedule.subjects.push(subject);
    return this.schedule.subjects;
  }

  async delSubject(name: string) {
    const arr = this.schedule.subjects;
    const deleted: Subject[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === name) {
        deleted.push(arr[i]);
        arr.splice(i, 1);
        i--;
      }
    }

    return deleted;
  }
}
