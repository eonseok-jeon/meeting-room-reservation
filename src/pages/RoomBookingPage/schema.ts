import { z } from 'zod';
import { ALL_EQUIPMENT } from './constants';

export const roomBookingFiltersSchema = z
  .object({
    date: z.iso.date('날짜를 선택해주세요.'),
    startTime: z.iso.time({ precision: -1 }),
    endTime: z.iso.time({ precision: -1 }),
    equipment: z.array(z.enum(ALL_EQUIPMENT)),
    attendees: z.number().int().min(1, '참석 인원은 1명 이상이어야 합니다.'),
    preferredFloor: z.number().int().nullable(),
  })
  .superRefine((values, ctx) => {
    const hasStartTime = values.startTime !== '';
    const hasEndTime = values.endTime !== '';

    if (hasStartTime === false && hasEndTime === false) {
      return;
    }

    if (hasStartTime === false || hasEndTime === false) {
      ctx.addIssue({
        code: 'custom',
        message: '시작 시간과 종료 시간을 선택해주세요.',
        path: ['startTime'],
      });
      return;
    }

    if (values.endTime <= values.startTime) {
      ctx.addIssue({
        code: 'custom',
        message: '종료 시간은 시작 시간보다 늦어야 합니다.',
        path: ['endTime'],
      });
    }
  });

export type RoomBookingFilters = z.infer<typeof roomBookingFiltersSchema>;
