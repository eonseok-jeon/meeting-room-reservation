import { css } from '@emotion/react';
import { useController } from 'react-hook-form';
import { Spacing } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipmentLabels';
import { ALL_EQUIPMENT, Equipment } from './constants';
import { RoomBookingField } from './RoomBookingField';
import { RoomBookingFormValues } from './schema';

export function RoomBookingEquipmentField() {
  const { field } = useController<RoomBookingFormValues, 'equipment'>({ name: 'equipment' });

  const toggleEquipment = (item: Equipment) => {
    const isSelected = field.value.includes(item);
    const nextValue = isSelected
      ? field.value.filter(current => current !== item)
      : [...field.value, item];
    field.onChange(nextValue);
  };

  return (
    <RoomBookingField label="필요 장비" gap={0}>
      <Spacing size={8} />
      <div
        css={css`
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        `}
      >
        {ALL_EQUIPMENT.map(item => {
          const selected = field.value.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => toggleEquipment(item)}
              aria-label={EQUIPMENT_LABELS[item]}
              aria-pressed={selected}
              css={css`
                padding: 8px 16px;
                border-radius: 20px;
                border: 1px solid ${selected ? colors.blue500 : colors.grey200};
                background: ${selected ? colors.blue50 : colors.grey50};
                color: ${selected ? colors.blue600 : colors.grey700};
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s;

                &:hover {
                  border-color: ${selected ? colors.blue500 : colors.grey400};
                }
              `}
            >
              {EQUIPMENT_LABELS[item]}
            </button>
          );
        })}
      </div>
    </RoomBookingField>
  );
}
