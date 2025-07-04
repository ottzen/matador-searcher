import { cn } from "../../../helpers/classNames.helper";
import S from "./Spinner.module.scss";

export interface DA_SpinnerProps {
    className?: string;
}

export const Spinner = ({ className }: DA_SpinnerProps) => (
    <span className={cn(S.wrapper, className)}>
        <span className={S.spinner} />
    </span>
);
