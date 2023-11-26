export default function Avatar({
                                   src,
                                   width,
                                   height,
                                   radius = 100,
                                   className = "",
                                   style = {},
                                   ...props
                               }) {
    return (
        <div className={`border border-neutral-200 ${className}`} {...props}
             style={{borderRadius: `${radius}%`, width: `${width}px`, height: `${height}px`, ...style}}>
            <img src={src} className="rounded-full w-full h-full object-cover object-center" style={{
                borderRadius: `${radius}%`,
            }}/>
        </div>
    );
}
