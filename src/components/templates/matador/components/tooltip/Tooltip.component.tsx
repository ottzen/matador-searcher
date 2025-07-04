import React from 'react';
import S from './Tooltip.module.scss'; // This will contain the styling for the tooltip

interface TooltipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
    return (
        <div className={S.tooltipContainer}>
            {children}
            <div className={S.tooltip}>{content}</div>
        </div>
    );
};

export default Tooltip;