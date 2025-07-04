import React, { ForwardedRef } from "react";
import { Link } from "react-router";

interface DA_BasicLinkProps {
    href: string;
    target?: "_blank" | "_self";
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    title?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onMouseEnter?: () => void;
    id?: string;
    nativeUrl?: boolean;
}

const BasicLink = React.forwardRef(
    (
        {
            href,
            target,
            children,
            className,
            ariaLabel,
            title,
            onClick,
            onMouseEnter,
            id,
            nativeUrl,
        }: DA_BasicLinkProps,
        ref: ForwardedRef<HTMLAnchorElement>
    ): React.JSX.Element => {

        const linkProp = {
            target: target,
            rel: nativeUrl ? "noopener noreferrer" : "alternate",
            className: className,
            "aria-label": ariaLabel,
            title: title,
            onClick: onClick,
            onMouseEnter: onMouseEnter,
            id: id,
        };

        return nativeUrl ? (
            <a href={href} {...linkProp} ref={ref}>
                {children}
            </a>
        ) : (
            <Link to={href} {...linkProp} ref={ref}>
                {children}
            </Link>
        );
    }
);

export default BasicLink;
