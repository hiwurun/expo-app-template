import { BottomSheetTextInput as OriginalBottomSheetTextInput } from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';

export const BottomSheetTextInput = cssInterop(OriginalBottomSheetTextInput, {
  className: {
    target: 'style',
  },
});
