import { cn } from '@/lib/utils';
import { Platform, TextInput, type TextInputProps } from 'react-native';

function Input({
  className,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'flex h-10 w-full min-w-0 flex-row items-center rounded-md border border-neutral-200 bg-white px-3 py-1 text-base leading-5 text-neutral-950 shadow-sm shadow-black/5 dark:border-neutral-800 dark:bg-neutral-200/30 dark:dark:bg-neutral-800/30 dark:text-neutral-50 sm:h-9',
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
            'aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900',
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

export { Input };
