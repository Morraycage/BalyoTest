import React from 'react';
import {Button, Card} from "react-bootstrap";

const ProductContainer = ({ product }) => {
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={product?.thumbnail.url} />
            <Card.Body>
                <Card.Title>{product?.name}</Card.Title>
                <Card.Text>
                    {product?.description.substr(0, 50)}
                </Card.Text>
                <Button onClick={()=> openInNewTab(product?.website)} variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductContainer;
