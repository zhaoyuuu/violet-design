import React from "react";
import classNames from "classnames";
import './button.scss'

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm',
}

interface BaseButtonProps {
  btnType?: ButtonType;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  href?: string;
  children: React.ReactNode
}
// 实际button元素还有很多其他原生属性，故使用联合类型结合起来
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
  // 取出 props
  const {
    btnType,
    size,
    disabled,
    href,
    children,
    className,
    ...restProps
  } = props
  
  // 拼接 class
  // classNames 里的对象，值为true，则拼接
  const classes = classNames('btn', className, {
    [`btn--${btnType}`]: btnType,
    [`btn--${size}`]: size,
    // 对于链接类型，没有disabled属性，因此把disabled加到class里 
    'disabled': btnType === ButtonType.Link && disabled
  })
  if(btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

// props的默认值
Button.defaultProps = {
  btnType: ButtonType.Default,
  disabled: false
}

export default Button