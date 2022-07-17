import "./Card.css";
interface CardProps {
    image: string,
    category: string
}

function Card(props: CardProps) {
    const { image, category } = props;
    return (<div className='card row'>
        <div className="image">
            <img src={image} alt="product" />
        </div>
        <div className="product">
            <span>{category}</span>
        </div>
    </div>)
}

export default Card;
