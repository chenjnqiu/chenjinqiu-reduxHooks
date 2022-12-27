import React from "react"
import classNames from "classnames"
import styles from "./index.less"
import '@asset/svgIcons'

const Icon = ( props ) => {
    const { name, className, otherProps } = props
    return ( 
        <svg className={classNames(styles.SvgIcon, className)} {...otherProps}>
        <use xlinkHref={`#${ name }`}/>
        </svg> 
    )
}

export default Icon