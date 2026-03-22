import { z } from 'zod';
import { ALL_EQUIPMENT } from './constants';

export const roomBookingFiltersSchema = z.object({
  date: z.iso.date('날짜를 선택해주세요.'),
  startTime: z.string(),
  endTime: z.string(),
  equipment: z.array(z.enum(ALL_EQUIPMENT)),
  attendees: z.number().int().min(1, '참석 인원은 1명 이상이어야 합니다.'),
  preferredFloor: z.number().int().nullable(),
});

export type RoomBookingFilters = z.infer<typeof roomBookingFiltersSchema>;

export const roomBookingFormSchema = roomBookingFiltersSchema.extend({
  selectedRoomId: z.string().min(1, '회의실을 선택해주세요.'),
});

export type RoomBookingFormValues = z.infer<typeof roomBookingFormSchema>;
