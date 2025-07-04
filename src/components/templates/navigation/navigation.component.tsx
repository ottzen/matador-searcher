import { NavLink } from "react-router";
import S from "./navigation.module.scss";

const navigation = [
    {
        name: "F",
        path: "/"
    },
    {
        name: "M",
        path: "/matador"
    },
    {
        name: "T",
        path: "/todos"
    }
]

const NavigationComponent = () => {
    return (
        <ul className={S.container}>
            {navigation.map((item, index) => {
                return (
                    <li key={index}>
                        <NavLink
                            className={({ isActive }: { isActive: boolean }) => (isActive ? S.active : "")}
                            to={item.path}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                )
            })}
        </ul>
    );
};

export default NavigationComponent;
