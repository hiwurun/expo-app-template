import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';
import { Input, type InputProps } from './input';

interface FormInputProps<T extends FieldValues> extends Omit<
  InputProps,
  'value' | 'onChangeText'
> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: string;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  className,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <View className="gap-2">
      {label && (
        <Text className="text-sm font-medium text-foreground dark:text-neutral-50">
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className={cn(error && 'border-destructive', className)}
            {...inputProps}
          />
        )}
      />
      {error && (
        <Text className="text-xs text-destructive dark:text-red-400">
          {error}
        </Text>
      )}
    </View>
  );
}
