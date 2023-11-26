import Alert from "@/Components/Alert";

export default function Messages(props) {

    return (
        <div className="w-full">
            {typeof props.errors !== 'undefined' && typeof props.errors.msg_error === 'string' && (
                <div className="pt-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Alert type="danger" title="Ops..." message={props.errors.msg_error}/>
                </div>
            )}

            {typeof props.message !== 'undefined' && props.message !== null && (
                <div className="pt-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Alert type={props.message.type} title={props.message.title} message={props.message.text}/>
                </div>
            )}
        </div>
    )
}
