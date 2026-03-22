import { css } from '@emotion/react';
import { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Border, Spacing, Text } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { PageHeader } from 'components/PageHeader';
import { SectionHeader } from 'components/SectionHeader';
import { getRoomsQueryOptions } from 'pages/queryOptions';
import { createReservation } from 'pages/remotes';
import axios from 'axios';
import { RoomBookingAvailableRoomsSection } from './RoomBookingAvailableRoomsSection';
import { RoomBookingConditionsSection } from './RoomBookingConditionsSection';
import { useRoomBookingSearchParams } from './useRoomBookingSearchParams';

export function RoomBookingPageContent() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: rooms } = useSuspenseQuery(getRoomsQueryOptions());

  const { attendees, date, endTime, equipment, isFilterComplete, preferredFloor, startTime } =
    useRoomBookingSearchParams();

  useEffect(() => {
    setSelectedRoomId(null);
    setErrorMessage(null);
  }, [attendees, date, endTime, equipment, preferredFloor, startTime]);

  const createMutation = useMutation(
    (data: { roomId: string; date: string; start: string; end: string; attendees: number; equipment: string[] }) =>
      createReservation(data),
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(['reservations', variables.date]);
        queryClient.invalidateQueries(['myReservations']);
      },
    }
  );

  const handleBook = async () => {
    if (!selectedRoomId) {
      setErrorMessage('회의실을 선택해주세요.');
      return;
    }

    if (!startTime || !endTime) {
      setErrorMessage('시작 시간과 종료 시간을 선택해주세요.');
      return;
    }

    try {
      const result = await createMutation.mutateAsync({
        roomId: selectedRoomId,
        date,
        start: startTime,
        end: endTime,
        attendees,
        equipment,
      });

      if ('ok' in result && result.ok) {
        navigate('/', { state: { message: '예약이 완료되었습니다!' } });
        return;
      }

      const errorResult = result as { message?: string };
      setErrorMessage(errorResult.message ?? '예약에 실패했습니다.');
      setSelectedRoomId(null);
    } catch (error: unknown) {
      let serverMessage = '예약에 실패했습니다.';

      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string } | undefined;
        serverMessage = data?.message ?? serverMessage;
      }

      setErrorMessage(serverMessage);
      setSelectedRoomId(null);
    }
  };

  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <PageHeader
        title="예약하기"
        topAddOn={
          <Link
            to="/"
            css={css`
              display: block;
              width: fit-content;
              margin: 0 24px;
              padding: 12px 0 0;
              border-radius: 18px;
            `}
          >
            <button
              aria-label="뒤로가기"
              css={css`
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
                font-size: 14px;
                color: ${colors.grey600};

                &:hover {
                  color: ${colors.grey900};
                }
              `}
            >
              ← 예약 현황으로
            </button>
          </Link>
        }
      />

      {errorMessage ? (
        <div
          css={css`
            padding: 0 24px;
          `}
        >
          <Spacing size={12} />
          <div
            css={css`
              padding: 10px 14px;
              border-radius: 10px;
              background: ${colors.red50};
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <Text typography="t7" fontWeight="medium" color={colors.red500}>
              {errorMessage}
            </Text>
          </div>
        </div>
      ) : null}

      <Spacing size={24} />

      <RoomBookingConditionsSection rooms={rooms} />

      <Spacing size={24} />
      <Border size={8} />
      <Spacing size={24} />

      {isFilterComplete ? (
        <Suspense fallback={<RoomBookingAvailableRoomsSection.Skeleton />}>
          <RoomBookingAvailableRoomsSection
            rooms={rooms}
            isBooking={createMutation.isLoading}
            onBook={handleBook}
            onSelectRoom={setSelectedRoomId}
            selectedRoomId={selectedRoomId}
          />
        </Suspense>
      ) : null}

      <Spacing size={24} />
    </div>
  );
}

export function RoomBookingPageContentSkeleton() {
  return (
    <div
      css={css`
        background: ${colors.white};
        padding-bottom: 40px;
      `}
    >
      <PageHeader title="예약하기" />

      <Spacing size={24} />

      <div
        css={css`
          padding: 0 24px;
        `}
      >
        <SectionHeader title="예약 조건" />
        <div
          css={css`
            height: 220px;
            border-radius: 14px;
            background: ${colors.grey50};
          `}
        />
      </div>
    </div>
  );
}

RoomBookingPageContent.Error = () => {
  return <></>;
};
