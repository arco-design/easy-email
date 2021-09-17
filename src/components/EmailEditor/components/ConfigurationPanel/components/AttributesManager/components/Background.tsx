import React, { useContext, useMemo } from 'react';
import {
  ImageUploaderField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BackgroundColor } from './BackgroundColor';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { useFocusIdx } from '@/hooks/useFocusIdx';

const backgroundRepeatOptions = [
  {
    value: 'no-repeat',
    label: 'No repeat',
  },
  {
    value: 'repeat',
    label: 'Repeat',
  },
  {
    value: 'repeat-x',
    label: 'Repeat X',
  },
  {
    value: 'repeat-y',
    label: 'Repeat Y',
  },
];

export function Background() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useContext(EditorPropsContext);
  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle>Background</TextStyle>
        <BackgroundColor />
        <Stack vertical spacing='none'>
          <ImageUploaderField
            label='Background image'
            name={`${focusIdx}.attributes.background-url`}
            helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
            uploadHandler={onUploadImage}
          />
          <TextField
            label='Background size'
            inline
            name={`${focusIdx}.attributes.background-size`}
          />
        </Stack>
        <SelectField
          label='Background repeat'
          name={`${focusIdx}.attributes.background-repeat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx, onUploadImage]);
}
