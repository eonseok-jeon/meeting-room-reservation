import { css } from '@emotion/react';
import { Top } from '_tosslib/components';

export function PageHeader({ title, topAddOn }: { title: string; topAddOn?: React.ReactNode }) {
  return (
    <div>
      {topAddOn ? topAddOn : null}
      <Top.Top03
        css={css`
          padding-left: 24px;
          padding-right: 24px;
        `}
      >
        {title}
      </Top.Top03>
    </div>
  );
}
