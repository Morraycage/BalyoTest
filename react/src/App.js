import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from "./index";
import ProductPie from "./components/ProductPie";
import ProductContainer from "./components/ProductContainer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

function useFetchProduct(date, cursor) {
    const {apiKey} = useContext(GlobalContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (date !== '' && cursor !== undefined) {
            (async () => {
                const res = await fetch(`http://localhost:8008/productByDay?date=${date}&cursor=${cursor}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`
                    }
                });
                const json = await res.json();
                setProducts(json.edges);
            })();
        }
    }, [apiKey, date, cursor]);

    return products;
}

function App() {
    const [date, setDate] = useState('');
    const [chartData, setChartData] = useState();
    const [cursor, setCursor] = useState('')
    const products = useFetchProduct(date, cursor);

    useEffect(() => {
        const topicsNames = products?.flatMap(product => {
            return product.node?.topics.edges.map(topic => topic.node.name);
        });

        const topics = new Map();
        topicsNames?.map((topicName) => {
            return topics.set(topicName, (topics.get(topicName) ?? 0) + 1);
        });

        setChartData(topics);
    }, [products]);

    useEffect(() => {
        const cursor = products[products?.length - 1]?.cursor;
        setCursor(products?.length > 0 ? cursor : '');
    }, [cursor, products])

    return (
        <div className="app bg-light">
            {products === undefined && products.length === 0 && <h3 className="text-center">Pick a Date</h3>}
            <div className="row justify-content-center">
                <input
                    type="date"
                    className="my-5"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12">
                            {chartData && (
                                <ProductPie className="app__chart" chartData={chartData}/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        {products?.map((product, i) => <div className="col-6 mb-5" key={i}><ProductContainer
                            product={product.node}/></div>)}
                    </div>
                    <div className="row justify-content-center">
                        {products?.length > 0 && <Button variant="danger" onClick={() => setCursor()}>Load More</Button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
