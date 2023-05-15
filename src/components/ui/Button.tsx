import React from 'react';
import { ButtonHTMLAttributes } from 'react';

type ButtonStyleType =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'tertiary'
  | 'urgent'
  | 'alert';
type ButtonSizeType = 'small' | 'medium' | 'large';

type ButtonClassName = {
  [key in ButtonStyleType]: string;
};

type ButtonRef = HTMLButtonElement | HTMLAnchorElement | HTMLDivElement;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonStyleType;
  size?: ButtonSizeType;
  icon?: React.ReactNode;
  iconSide?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: (
    e: React.MouseEvent<
      HTMLButtonElement | HTMLInputElement | HTMLAnchorElement | HTMLDivElement
    >
  ) => void;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button = React.forwardRef(
  (
    {
      children,
      buttonType = 'primary',
      size = 'small',
      disabled,
      fullWidth,
      icon,
      iconSide,
      onClick,
      ...additionalProps
    }: ButtonProps,
    ref: React.ForwardedRef<ButtonRef>
  ): JSX.Element => {
    const buttonSize = {
      small: 'h-8',
      medium: 'h-10',
      large: 'h-12',
    };
    const buttonFoundation = `flex ${buttonSize[size]} focus:ring-primary-500 focus:ring-4 text-lg font font-bold px-6 rounded-md border items-center justify-center`;

    const buttonClass: ButtonClassName = {
      primary:
        'bg-primary-500 text-white border-primary-500 hover:bg-primary-400 focus:border-primary-700',
      secondary:
        'bg-white border-gray-400 text-gray-800 hover:bg-gray-100 focus:ring-gray-400',
      accent:
        'bg-white border-primary-500 text-primary-500 hover:border-primary-600 hover:text-primary-600 focus:border-primary-600',
      tertiary:
        'bg-white text-prim-700 border-white hover:bg-prim-200 hover:border-prim-200',
      urgent: 'bg-white text-red-500 border-red-500 hover:bg-red-100',
      alert: 'bg-red-500 text-white border-red-500 hover:bg-red-300',
    };

    const disabledStyle: ButtonClassName = {
      primary:
        'disabled:border-primary-300 disabled:bg-primary-300 text-white opacity-90 cursor-not-allowed',
      secondary:
        'disabled:border-gray-100 disabled:bg-white text-gray-300 cursor-not-allowed',
      accent:
        'disabled:border-primary-300 disabled:bg-white text-primary-300 cursor-not-allowed',
      tertiary:
        'disabled:border-primary-300 disabled:bg-primary-300 text-white cursor-not-allowed',
      urgent:
        'disabled:border-red-300 disabled:bg-red-100 text-red-400 cursor-not-allowed',
      alert:
        'disabled:border-red-100 disabled:bg-red-100 text-red-400 cursor-not-allowed',
    };

    //* if there is an icon without a side picked it will default to right side
    const showLeftSideIcon = icon && iconSide === 'left';
    const showRightSideIcon = icon && iconSide !== 'left';
    const chooseStyle = disabled
      ? disabledStyle[buttonType]
      : buttonClass[buttonType];
    const showFullWidth = fullWidth ? 'w-full' : 'min-w-fit';
    const renderIcon = (side: 'l' | 'r') => (
      <div className={side === 'l' ? 'pr-2' : 'pl-2'}>{icon}</div>
    );

    return (
      <button
        className={`${buttonFoundation} ${chooseStyle} ${showFullWidth} `}
        disabled={disabled}
        ref={ref as React.Ref<any>}
        onClick={onClick}
        {...additionalProps}
      >
        {showLeftSideIcon && renderIcon('l')}
        {children}
        {showRightSideIcon && renderIcon('r')}
      </button>
    );
  }
);

Button.displayName = 'Button';
