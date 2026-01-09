import { BottomSheetTextInput } from '@/components/BottomSheetTextInput';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  Platform,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

interface BottomSheetInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  containerStyle?: ViewStyle;
}

function BottomSheetInput({
  className,
  leftIcon,
  rightIcon,
  containerClassName,
  containerStyle,
  ...props
}: BottomSheetInputProps) {
  const hasIcons = leftIcon || rightIcon;

  if (!hasIcons) {
    return (
      <BottomSheetTextInput
        className={cn(
          'flex h-10 w-full min-w-0 flex-row items-center rounded-md border border-neutral-200 bg-white px-3 py-1 text-base leading-5 text-neutral-950 shadow-sm shadow-black/5 dark:border-neutral-800 dark:bg-neutral-800/30 dark:text-neutral-50 sm:h-9',
          props.editable === false &&
            cn(
              'opacity-50',
              Platform.select({
                web: 'disabled:pointer-events-none disabled:cursor-not-allowed',
              }),
            ),
          Platform.select({
            web: cn(
              'outline-none transition-[color,box-shadow] selection:bg-neutral-900 selection:text-neutral-50 dark:selection:bg-neutral-50 dark:selection:text-neutral-900 md:text-sm',
              'focus-visible:border-neutral-950 focus-visible:ring-[3px] focus-visible:ring-neutral-950/50 dark:focus-visible:border-neutral-300 dark:focus-visible:ring-neutral-300/50',
              'aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:aria-invalid:border-red-900',
            ),
            native:
              'placeholder:text-neutral-500/50 dark:placeholder:text-neutral-400/50',
          }),
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <View
      className={cn(
        'flex h-12 w-full flex-row items-center gap-3 rounded-xl border border-input bg-background px-4 shadow-sm shadow-black/5 dark:border-neutral-800 dark:bg-neutral-800/30',
        props.editable === false && 'opacity-50',
        containerClassName,
      )}
      style={containerStyle}
    >
      {leftIcon && (
        <View className="text-muted-foreground dark:text-neutral-400">
          {leftIcon}
        </View>
      )}
      <BottomSheetTextInput
        className={cn(
          'flex-1 text-base leading-5 text-foreground dark:text-neutral-50',
          Platform.select({
            web: cn(
              'outline-none transition-colors selection:bg-neutral-900 selection:text-neutral-50 dark:selection:bg-neutral-50 dark:selection:text-neutral-900 md:text-sm',
            ),
            native:
              'placeholder:text-neutral-500/50 dark:placeholder:text-neutral-400/50',
          }),
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <View className="text-muted-foreground dark:text-neutral-400">
          {rightIcon}
        </View>
      )}
    </View>
  );
}

interface BottomSheetFormInputProps<T extends FieldValues> extends Omit<
  BottomSheetInputProps,
  'value' | 'onChangeText'
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
}

export function BottomSheetFormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  className,
  ...inputProps
}: BottomSheetFormInputProps<T>) {
  return (
    <View className="gap-2">
      {label && <Text className="text-sm font-medium text-white">{label}</Text>}
      <View className="relative pb-4">
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <BottomSheetInput
              value={value == null ? '' : String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              className={cn(error && 'border-destructive', className)}
              {...inputProps}
            />
          )}
        />
        {error && (
          <Text className="absolute bottom-0 left-0 text-xs text-red-400">
            {error}
          </Text>
        )}
      </View>
    </View>
  );
}
