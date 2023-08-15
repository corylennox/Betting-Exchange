export default function PromptButton(props) {
    const buttonClassName = `h-full w-full bg-gradient-to-b ${props.onClick ? "cursor-pointer" : "cursor-default"} ${props.gradientColorStart} ${props.gradientColorEnd} ${props.gradientColorPressedStart} ${props.gradientColorPressedEnd} rounded`

    return (
    <button onClick={props.onClick} className={buttonClassName} >
        <span className={`block ${props.textSize} text-skin-header`}>{props.text}</span>
        {props.subtext ? <span className={`block ${props.subtextSize} text-skin-header`}>{props.subtext}</span> : <span />} {/* optional subtext */ }
    </button>
    )
}
