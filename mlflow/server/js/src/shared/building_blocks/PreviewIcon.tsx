import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ClassNames } from '@emotion/react';

type Props = {
  className?: string;
};

export const PreviewIcon = (props: Props) => (
  <ClassNames>
    {({ css, cx }) => (
      <span className={cx(css(previewStyles), props.className)}>
        <FormattedMessage
          defaultMessage='Preview'
          description='Preview badge shown for features which are under preview'
        />
      </span>
    )}
  </ClassNames>
);

const previewStyles = {
  display: 'inline-block',
  fontSize: 12,
  lineHeight: '16px',
  fontWeight: 500,
  color: '#2e3840', // Color needs alignment -- not part of any spectrum.
  backgroundColor: '#f3f5f6',
  borderRadius: 16,
  padding: '4px 12px',
};
