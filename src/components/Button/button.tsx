import React from "react";
import classNames from "classnames";
import './button.scss'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

type ButtonSize = 'lg' | 'sm'

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
    'disabled': btnType === 'link' && disabled
  })
  if(btnType === 'link' && href) {
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
  btnType: 'default',
  disabled: false
}

export default Button