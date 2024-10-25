import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';

type Props = ViewProps & {
  value?: number;
  horizontal?: boolean;
};

export const Spacer = memo(({ value, horizontal, style, ...props }: Props) => {
  return (
    <View
      style={[
        {
          height: horizontal ? undefined : value,
          width: horizontal ? value : undefined
        },
        style
      ]}
      {...props}
    />
  );
});
