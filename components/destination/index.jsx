//This is how every destination will look.
export default function Destination({destination}) {
    return(
        <div>
            <img src={destination.image} width = "500px"/>
            <h3>{destination.title}</h3>
            <div>{destination.summary}</div>
        </div>
    )
}