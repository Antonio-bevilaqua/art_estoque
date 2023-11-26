import Avatar from "@/Components/Avatar";

export default function ProductCard({product, className = ""}) {
    return (
        <div className="flex items-center">
            <Avatar src={product.picture_link} width={30} height={30} radius={20}/>
            <span className={"text-neutral-100 pl-2 " + className}>{product.name}</span>
        </div>
    );
}
