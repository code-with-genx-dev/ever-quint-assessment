import clsx from "clsx";

interface buttonProps {
    name?: string;
    customClass?: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    disabled?: boolean;
    onClick?: () => void;
}
const Button = (props: buttonProps) => {
    const { name, customClass, loading, onClick, variant = "primary", disabled } = props;

    const variantMap: any = {
        primary: 'bg-violet-500! text-white!',
        secondary: 'bg-yellow-500! text-white!',
        danger: 'bg-red-500! text-white! ',
    }

    return (
        <button className={clsx(`px-3 py-1 text-[14px] cursor-pointer rounded-md`, variantMap[variant], customClass, (disabled || loading) && "cursor-not-allowed opacity-50")}
            disabled={disabled}
            onClick={onClick}>
            {loading ? "Loading..." : name}
        </button>
    )
}

export default Button